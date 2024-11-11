# Publishing Tools

This repository contains automation tools and utilities for managing and publishing content across multiple platforms.

## Repository Structure

```
publishing-tools/
├── scripts/                  # Automation scripts
│   ├── publish/             # Publishing automation
│   ├── optimize/            # Asset optimization
│   └── analytics/           # Analytics collection
├── config/                  # Configuration files
│   ├── platforms/          # Platform-specific settings
│   └── templates/          # Template configurations
└── docs/                   # Documentation
```

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
