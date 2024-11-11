// contentValidator.js - Validates content structure and metadata
export function validateContent(filePath) {
  const fileContent = readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  const errors = [];
  
  // Required metadata fields
  const requiredFields = ['title', 'date', 'category', 'tags'];
  for (const field of requiredFields) {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }
  
  // Content structure checks
  if (!content.includes('# ')) {
    errors.push('Missing main title (H1)');
  }
  
  if (content.split('# ').length > 2) {
    errors.push('Multiple H1 headers found');
  }
  
  // Image reference checks
  const imageRefs = content.match(/!\[.*?\]\(.*?\)/g) || [];
  for (const imageRef of imageRefs) {
    const imagePath = imageRef.match(/\((.*?)\)/)[1];
    if (!imagePath.startsWith('../assets/')) {
      errors.push(`Invalid image path: ${imagePath}`);
    }
  }
  
  return errors;
}
