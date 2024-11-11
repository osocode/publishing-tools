# Publishing Tools

A comprehensive set of tools for automating content publishing across multiple platforms. This repository works in conjunction with the content-hub repository to manage and publish technical, leadership, and educational content.

## Repository Structure

```plaintext
publishing-tools/
├── src/
│   ├── automation/                    # Core automation logic
│   │   ├── platformAutomation.js     # Main automation class
│   │   ├── LinkedInHandler.js        # LinkedIn publishing
│   │   ├── YouTubeHandler.js         # YouTube publishing
│   │   └── BlogHandler.js            # Blog publishing
│   │
│   ├── config/                       # Configuration files
│   │   ├── default.js               # Default settings
│   │   ├── production.js            # Production settings
│   │   ├── local.js                # Local development settings
│   │   └── index.js                # Configuration loader
│   │
│   ├── services/                    # Core services
│   │   ├── imageProcessor.js        # Image optimization
│   │   ├── contentValidator.js      # Content validation
│   │   └── metricsCollector.js      # Analytics collection
│   │
│   └── utils/                       # Utility functions
│       ├── markdown.js             # Markdown processing
│       └── frontmatter.js         # Frontmatter handling
│
├── scripts/                         # CLI scripts
│   ├── publish-content.js          # Content publishing
│   ├── optimize-images.js          # Image optimization
│   └── generate-metrics.js         # Metrics generation
│
├── .github/workflows/              # GitHub Actions
│   ├── content-publish.yml        # Publishing pipeline
│   ├── image-optimize.yml         # Image optimization
│   └── metrics-collect.yml        # Metrics collection
│
├── docs/                          # Documentation
├── tests/                         # Test files
└── [Configuration Files]          # See Configuration section
```

## Configuration Files

### Root Level
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore patterns
- `.eslintrc.js` - ESLint configuration
- `.dockerignore` - Docker ignore patterns
- `docker-compose.yml` - Docker compose configuration
- `Dockerfile` - Docker build instructions
- `jest.config.js` - Testing configuration
- `nodemon.json` - Development server settings
- `package.json` - NPM configuration
- `tsconfig.json` - TypeScript configuration

### VS Code Settings
- `.vscode/settings.json` - Editor settings
- `.vscode/extensions.json` - Recommended extensions

### Application Configuration
Located in `src/config/`:
- `default.js` - Base configuration
- `production.js` - Production overrides
- `local.js` - Local development settings
- `index.js` - Configuration loader

## Prerequisites

- Node.js 18+
- Access to content-hub repository
- API keys for publishing platforms
- Git LFS (for handling large media files)

## Installation

1. Clone the repository:
```bash
git clone git@github.com:username/publishing-tools.git
cd publishing-tools
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your settings
```

4. Link to content-hub:
```bash
# Update CONTENT_HUB_PATH in .env to point to your content-hub directory
CONTENT_HUB_PATH="../content-hub"
```

## Usage

### Development
```bash
# Start development server
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

### Content Publishing
```bash
# Validate content
npm run validate

# Publish content
npm run publish

# Optimize images
npm run optimize

# Collect metrics
npm run metrics
```

### Docker Support
```bash
# Build and run with Docker
docker-compose up --build
```

## Platform Support

Currently supports publishing to:
- Personal blog/website
- LinkedIn (articles and posts)
- YouTube
- Internal documentation systems

## Configuration Guide

### Environment Variables
Required environment variables:
```bash
# Content Hub Settings
CONTENT_HUB_PATH=       # Path to content-hub repository

# API Keys
LINKEDIN_API_KEY=       # LinkedIn API credentials
YOUTUBE_API_KEY=        # YouTube API credentials
BLOG_API_TOKEN=         # Blog publishing token

# Publishing Settings
REQUIRE_REVIEW=         # Enable/disable review requirement
AUTO_PUBLISH=           # Enable/disable auto publishing
```

### Platform Configuration
Configure platform-specific settings in `src/config/default.js`:
```javascript
module.exports = {
  platforms: {
    linkedin: {
      // LinkedIn-specific settings
    },
    youtube: {
      // YouTube-specific settings
    }
  }
}
```

## Adding New Platforms

1. Create a new handler in `src/automation/`:
```javascript
// NewPlatformHandler.js
export class NewPlatformHandler {
  // Implementation
}
```

2. Add platform configuration in `src/config/default.js`
3. Create platform-specific tests
4. Update documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Submit a pull request

## Testing

```bash
# Run all tests
npm test

# Run specific tests
npm test -- --grep "platform name"

# Run with coverage
npm run test:coverage
```

## Documentation

- `/docs/automation/` - Automation documentation
- `/docs/configuration/` - Configuration guide
- `/docs/workflows/` - GitHub Actions workflows

## Troubleshooting

Common issues and solutions are documented in `/docs/troubleshooting.md`

## License

[Your chosen license]

## Support

- Open an issue for bugs
- See documentation for guides
- Contact team for urgent issues

Remember to never commit sensitive information or API keys to the repository.

---

For more detailed information about specific components, check the documentation in the `/docs` directory.
