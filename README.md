# Publishing Tools

This repository contains automation tools and utilities for managing and publishing content across multiple platforms.

## Repository Structure

# publishing-tools/ Repository Structure

```plaintext
publishing-tools/
├── src/
│   ├── automation/                    # Core automation logic
│   │   ├── platformAutomation.js     # Main platform automation class
│   │   ├── LinkedInHandler.js        # LinkedIn-specific automation
│   │   ├── YouTubeHandler.js         # YouTube-specific automation
│   │   └── BlogHandler.js            # Blog publishing automation
│   │
│   ├── config/                       # Configuration files
│   │   ├── default.js               # Default configuration
│   │   ├── production.js            # Production overrides
│   │   ├── local.js                # Local development settings
│   │   └── index.js                # Configuration loader
│   │
│   ├── services/                    # Core services
│   │   ├── imageProcessor.js        # Image optimization and conversion
│   │   ├── contentValidator.js      # Content validation logic
│   │   └── metricsCollector.js      # Analytics and metrics
│   │
│   ├── utils/                       # Utility functions
│   │   ├── markdown.js             # Markdown processing utilities
│   │   ├── frontmatter.js         # Frontmatter handling
│   │   └── logger.js              # Logging utility
│   │
│   └── index.js                    # Main entry point
│
├── scripts/                         # CLI and automation scripts
│   ├── publish-content.js          # Content publishing script
│   ├── optimize-images.js          # Image optimization script
│   └── generate-metrics.js         # Metrics generation script
│
├── workflows/                       # GitHub Actions workflows
│   ├── content-publish.yml         # Content publishing workflow
│   ├── image-optimize.yml          # Image optimization workflow
│   └── metrics-collect.yml         # Metrics collection workflow
│
├── tests/                          # Test files
│   ├── automation/
│   ├── services/
│   └── utils/
│
├── config/                         # Environment configuration
│   ├── default.js                 # Default settings
│   ├── production.js              # Production settings
│   └── local.js                  # Local development settings
│
├── docs/                          # Documentation
│   ├── automation/
│   ├── configuration/
│   └── workflows/
│
├── .github/                       # GitHub specific files
│   └── workflows/                # GitHub Actions configurations
│
├── package.json                   # Node.js package file
├── tsconfig.json                 # TypeScript configuration
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── README.md                     # Repository documentation
└── docker-compose.yml            # Docker compose configuration
```

## Key Components Explanation

### 1. Automation Core (`src/automation/`)
Contains all the platform-specific automation logic we created:
```javascript
// src/automation/platformAutomation.js
import { LinkedInHandler } from './LinkedInHandler';
import { YouTubeHandler } from './YouTubeHandler';
import { BlogHandler } from './BlogHandler';

export class PlatformAutomation {
    // Our previously created automation code goes here
}
```

### 2. Configuration (`src/config/`)
All configuration files we created earlier:
```javascript
// src/config/index.js
import defaultConfig from './default';
import productionConfig from './production';
import localConfig from './local';

const env = process.env.NODE_ENV || 'development';

const configs = {
    development: localConfig,
    production: productionConfig
};

export default {
    ...defaultConfig,
    ...(configs[env] || {})
};
```

### 3. GitHub Workflows (`.github/workflows/`)
```yaml
# .github/workflows/content-publish.yml
name: Content Publishing Pipeline
# Our previously created workflow configurations go here
```

### 4. Service Integration Example
```javascript
// src/services/imageProcessor.js
import sharp from 'sharp';
import config from '../config';

export class ImageProcessor {
    constructor(config) {
        this.config = config.images;
    }

    async optimize(imagePath, options = {}) {
        // Image optimization logic
    }
}
```

### 5. CLI Scripts Example
```javascript
// scripts/publish-content.js
#!/usr/bin/env node
import { PlatformAutomation } from '../src/automation/platformAutomation';
import config from '../src/config';

async function main() {
    const automation = new PlatformAutomation(config);
    // Publishing logic
}

main().catch(console.error);
```

## Usage

1. Run automations:
```bash
# Start the automation service
npm start

# Run specific scripts
npm run publish
npm run optimize
```

2. Development:
```bash
# Start in development mode
npm run dev

# Run tests
npm test
```

3. Configuration:
```bash
# Copy environment template
cp .env.example .env

# Edit configuration
nano src/config/local.js
```

The separation of concerns is:
- Core automation logic in `src/automation/`
- Configuration in `src/config/`
- Utility functions in `src/utils/`
- CLI scripts in `scripts/`
- GitHub workflows in `.github/workflows/`

This structure keeps the automation code organized and maintainable while providing clear separation between different components of the system.

## Features

### Current Tools
1. Image Optimization
   - Automatic image resizing
   - Platform-specific optimization
   - WebP conversion

2. Content Formatting
   - LinkedIn post splitter
   - Markdown to HTML conversion
   - Frontmatter processor

### Planned Features
- Automated publishing to multiple platforms
- Analytics collection and reporting
- SEO optimization tools
- Content calendar management
- Automated link checking
- Cross-reference validation

## Setup and Configuration

### Prerequisites
- Node.js 18+
- Python 3.8+
- Required API keys (see `config/example.env`)

### Installation
```bash
npm install
python -m pip install -r requirements.txt
```

### Configuration
1. Copy `config/example.env` to `.env`
2. Add required API keys and credentials
3. Customize platform settings in `config/platforms/`

## Usage

### Basic Commands
```bash
# Optimize images
npm run optimize-images

# Split post for LinkedIn
npm run split-post <filename>

# Publish to platform
npm run publish <platform> <filename>
```

### Workflows
1. Content Preparation
   ```bash
   npm run prepare-content <filename>
   ```

2. Publishing
   ```bash
   npm run publish-all <filename>
   ```

## Development

### Adding New Tools
1. Create new script in appropriate directory
2. Update configuration as needed
3. Add documentation
4. Create tests
5. Submit PR

### Testing
```bash
npm test
```

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Submit PR

## License
MIT

---

This toolset will evolve based on content creation and publishing needs.
