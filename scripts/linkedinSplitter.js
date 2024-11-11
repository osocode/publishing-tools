// linkedinSplitter.js - Splits long-form content into LinkedIn-friendly posts
import { readFileSync, writeFileSync } from 'fs';
import { parse as parseYAML } from 'yaml';
import matter from 'gray-matter';

const MAX_POST_LENGTH = 1300; // LinkedIn optimal length

export function splitForLinkedIn(filePath) {
  const fileContent = readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  // Split content into paragraphs
  const paragraphs = content.split('\n\n');
  const posts = [];
  let currentPost = '';
  
  for (const paragraph of paragraphs) {
    if ((currentPost + paragraph).length > MAX_POST_LENGTH) {
      posts.push(currentPost.trim());
      currentPost = paragraph;
    } else {
      currentPost += '\n\n' + paragraph;
    }
  }
  
  if (currentPost) {
    posts.push(currentPost.trim());
  }
  
  // Generate LinkedIn series files
  posts.forEach((post, index) => {
    const postContent = {
      ...data,
      part: index + 1,
      totalParts: posts.length,
      platform: 'linkedin',
      originalPost: filePath
    };
    
    const outputPath = filePath.replace(
      '/posts/',
      '/snippets/linkedin/'
    ).replace(
      '.md',
      `-part${index + 1}.md`
    );
    
    writeFileSync(
      outputPath,
      `---\n${parseYAML.stringify(postContent)}---\n\n${post}`
    );
  });
  
  return posts.length;
}
