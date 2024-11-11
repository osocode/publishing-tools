# Configuration System

This document explains how to configure and customize the content automation tools.

## Configuration Files

### Structure
```
config/
├── default.js       # Base configuration
├── local.js         # Local development overrides
├── production.js    # Production settings
├── test.js         # Test environment settings
└── custom/         # Custom environment configs
```

### Priority Order
1. Environment-specific config (production.js, local.js)
2. Custom configs (custom/*.js)
3. Default config (default.js)

## Environment Variables

Create a `.env` file in your root directory based on `.env.example`:

```bash
# Copy example environment file
cp .env.example .env

# Edit with your settings
nano .env
```

## Configuration Sections

### Site Configuration
Basic site information and global settings:
```javascript
site: {
  title: "Your Site Name",
  baseUrl: "https://yourdomain.com",
  description: "Your site description",
  author: "Your Name"
}
```

### Content Settings
Define content types and directory structure:
```javascript
content: {
  types: {
    technical: {
      template: "templates/technical-post.md",
      requiredFields: ["title", "date", "category"]
    }
  },
  directories: {
    posts: "content/posts",
    assets: "content/assets"
  }
}
```

### Platform Settings
Platform-specific configurations:
```javascript
platforms: {
  linkedin: {
    postTypes: {
      article: { maxLength: 125000 },
      post: { maxLength: 3000 }
    }
  },
  youtube: {
    defaults: {
      privacy: "public",
      category: "Education"
    }
  }
}
```

## Usage Examples

### Loading Configuration
```javascript
const config = require('./config');

// Access configuration
const siteTitle = config.site.title;
const postTemplate = config.content.types.technical.template;
```

### Environment-Specific Settings
```javascript
// Development
NODE_ENV=development npm start

// Production
NODE_ENV=production npm start
```

### Custom Environments
Create `config/custom/staging.js`:
```javascript
module.exports = {
  site: {
    baseUrl: "https://staging.yourdomain.com"
  },
  publishing: {
    workflow: {
      requireReview: true,
      autoPublish: false
    }
  }
};
```

## Best Practices

### Secrets Management
1. Never commit sensitive data to version control
2. Use environment variables for secrets
3. Keep `.env` file in `.gitignore`

### Configuration Updates
1. Document all changes
2. Update `.env.example` when adding new variables
3. Notify team of breaking changes

### Testing
1. Use `config/test.js` for test environment
2. Mock external services in tests
3. Validate configuration on startup

## Troubleshooting

### Common Issues
1. **Missing Environment Variables**
   - Check `.env` file exists
   - Verify variable names match `.env.example`

2. **Configuration Not Loading**
   - Verify NODE_ENV setting
   - Check file permissions
   - Validate JSON syntax

3. **Platform API Issues**
   - Verify API keys in `.env`
   - Check API rate limits
   - Validate endpoint URLs

### Debug Mode
Enable debug logging:
```javascript
development: {
  logLevel: "debug",
  enableDebug: true
}
```

## Maintenance

### Regular Tasks
1. Review and update API keys
2. Check for deprecated settings
3. Update platform-specific limits
4. Audit security settings

### Version Control
1. Track configuration changes
2. Document breaking changes
3. Maintain changelog

## Support

For issues or questions:
1. Check troubleshooting guide
2. Review GitHub issues
3. Contact support team

Remember to never share your actual configuration values when seeking support.
