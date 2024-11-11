// videoContentManager.js
import { readFileSync, writeFileSync } from 'fs';
import matter from 'gray-matter';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';

class VideoContentManager {
  constructor(config) {
    this.config = config;
  }

  // Generate video thumbnail from template
  async generateThumbnail(metadata, templatePath) {
    const { title, category } = metadata;
    
    // Load template image
    const template = sharp(templatePath);
    
    // Add text overlay
    const thumbnail = await template
      .composite([
        {
          input: Buffer.from(title),
          gravity: 'center',
          font: 'Arial',
          fontSize: 60
        }
      ])
      .resize(1280, 720) // YouTube thumbnail size
      .toBuffer();
    
    // Create variations for different platforms
    await Promise.all([
      sharp(thumbnail)
        .resize(1280, 720)
        .toFile(`assets/video/thumbnails/${category}/${title}-youtube.jpg`),
      sharp(thumbnail)
        .resize(1200, 628)
        .toFile(`assets/video/thumbnails/${category}/${title}-linkedin.jpg`)
    ]);
  }

  // Extract social media clips
  async extractClips(videoPath, metadata) {
    const { socialClips } = metadata;
    
    for (const clip of socialClips) {
      const { start, end, platform, title } = clip;
      
      await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
          .setStartTime(start)
          .setDuration(end - start)
          .output(`assets/video/clips/${platform}/${title}.mp4`)
          .on('end', resolve)
          .on('error', reject)
          .run();
      });
    }
  }

  // Generate platform-specific descriptions
  generateDescriptions(metadata) {
    const { title, description, chapters, relatedContent } = metadata;
    
    // YouTube description
    const youtubeDesc = `
${description}

CHAPTERS:
${chapters.map(c => `${c.timestamp} - ${c.title}`).join('\n')}

RESOURCES MENTIONED:
${relatedContent.map(r => `- ${this.getContentLink(r)}`).join('\n')}

CONNECT WITH ME:
${this.config.socialLinks.join('\n')}

#${metadata.tags.slice(0, 3).join(' #')}
    `.trim();

    // LinkedIn description
    const linkedinDesc = `
🎥 ${title}

${description.split('\n')[0]} // Just the hook

Key insights:
${chapters.map(c => `• ${c.title}`).join('\n')}

Follow for more content on ${metadata.tags.join(', ')}!

#${metadata.tags.slice(0, 3).join(' #')}
    `.trim();

    return {
      youtube: youtubeDesc,
      linkedin: linkedinDesc
    };
  }

  // Generate SRT captions from transcript
  generateCaptions(transcript) {
    // Implementation for converting transcript to SRT format
    // Would include timing and text formatting
  }

  // Create or update video playlists
  updatePlaylists(metadata) {
    const { youtube: { playlist } } = metadata;
    
    if (playlist) {
      const playlistPath = `metadata/youtube/playlists/${playlist}.json`;
      const existing = JSON.parse(readFileSync(playlistPath, 'utf8'));
      
      existing.videos.push({
        title: metadata.title,
        id: metadata.youtube.id,
        position: existing.videos.length + 1
      });
      
      writeFileSync(playlistPath, JSON.stringify(existing, null, 2));
    }
  }

  // Helper to get formatted content links
  getContentLink(contentPath) {
    const content = matter(readFileSync(contentPath, 'utf8'));
    return `${content.data.title}: ${this.config.baseUrl}/${contentPath}`;
  }
}

// Example usage:
const config = {
  baseUrl: 'https://yourdomain.com',
  socialLinks: [
    '🌐 Website: https://yourdomain.com',
    '💼 LinkedIn: https://linkedin.com/in/yourprofile',
    '🐦 Twitter: https://twitter.com/yourhandle'
  ],
  thumbnailTemplates: {
    technical: 'assets/templates/thumbnail-technical.psd',
    leadership: 'assets/templates/thumbnail-leadership.psd',
    career: 'assets/templates/thumbnail-career.psd'
  }
};

const videoManager = new VideoContentManager(config);

// Example workflow
async function prepareVideoContent(metadata) {
  // Generate thumbnails
  await videoManager.generateThumbnail(
    metadata, 
    config.thumbnailTemplates[metadata.category]
  );
  
  // Generate descriptions
  const descriptions = videoManager.generateDescriptions(metadata);
  
  // Extract social clips if video is ready
  if (metadata.videoPath) {
    await videoManager.extractClips(metadata.videoPath, metadata);
  }
  
  // Update playlists
  videoManager.updatePlaylists(metadata);
  
  return {
    thumbnails: {
      youtube: `assets/video/thumbnails/${metadata.category}/${metadata.title}-youtube.jpg`,
      linkedin: `assets/video/thumbnails/${metadata.category}/${metadata.title}-linkedin.jpg`
    },
    descriptions,
    clips: metadata.socialClips.map(clip => ({
      platform: clip.platform,
      path: `assets/video/clips/${clip.platform}/${clip.title}.mp4`
    }))
  };
}

export { VideoContentManager, prepareVideoContent };
