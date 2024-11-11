// config/default.js - Base configuration file
module.exports = {
  // Site Configuration
  site: {
    title: "Your Site Name",
    baseUrl: "https://yourdomain.com",
    description: "Your site description",
    author: "Your Name",
    language: "en",
    timezone: "UTC"
  },

  // Content Settings
  content: {
    // Post Types and Their Templates
    types: {
      technical: {
        template: "templates/technical-post.md",
        requiredFields: ["title", "date", "category", "tags"],
        defaultCategory: "engineering",
        defaultTags: ["software", "engineering"]
      },
      leadership: {
        template: "templates/leadership-post.md",
        requiredFields: ["title", "date", "category", "tags"],
        defaultCategory: "leadership",
        defaultTags: ["leadership", "management"]
      },
      career: {
        template: "templates/career-post.md",
        requiredFields: ["title", "date", "category", "tags"],
        defaultCategory: "career",
        defaultTags: ["career-growth", "professional-development"]
      }
    },

    // Directory Structure
    directories: {
      posts: "content/posts",
      assets: "content/assets",
      images: "content/assets/images",
      templates: "content/templates",
      output: "dist"
    }
  },

  // Platform-Specific Settings
  platforms: {
    // Blog Settings
    blog: {
      postsPerPage: 10,
      excerptLength: 280,
      featuredImageSize: {
        width: 1200,
        height: 630
      },
      seo: {
        titleTemplate: "%s | Your Site Name",
        defaultImage: "default-social.jpg",
        twitterHandle: "@yourhandle"
      }
    },

    // LinkedIn Settings
    linkedin: {
      postTypes: {
        article: {
          maxLength: 125000,
          imageCount: 9
        },
        post: {
          maxLength: 3000,
          imageCount: 9
        }
      },
      hashtagLimit: 3,
      defaultHashtags: ["technology", "leadership", "engineering"],
      posting: {
        bestTimes: ["9:00", "12:00", "17:00"],
        timezone: "America/New_York",
        intervalBetweenPosts: 3600000 // 1 hour in milliseconds
      }
    },

    // YouTube Settings
    youtube: {
      defaults: {
        privacy: "public",
        category: "Education",
        language: "en"
      },
      thumbnails: {
        size: {
          width: 1280,
          height: 720
        },
        templates: {
          technical: "templates/thumbnail-technical.psd",
          leadership: "templates/thumbnail-leadership.psd",
          tutorial: "templates/thumbnail-tutorial.psd"
        }
      },
      endScreen: {
        duration: 20,
        type: "default"
      }
    },

    // Internal Documentation Settings
    internal: {
      confluence: {
        spaceKey: "TEAM",
        parentPageId: "123456",
        templateId: "789012"
      },
      slack: {
        defaultChannel: "team-announcements",
        mentionGroups: ["@engineering", "@leadership"]
      }
    }
  },

  // Image Processing
  images: {
    formats: {
      web: {
        width: 1200,
        quality: 80,
        format: "webp"
      },
      social: {
        width: 1080,
        quality: 85,
        format: "jpg"
      },
      thumbnail: {
        width: 400,
        quality: 70,
        format: "webp"
      }
    },
    optimization: {
      jpegQuality: 80,
      pngQuality: 80,
      webpQuality: 75,
      svgoPlugins: [
        { removeViewBox: false },
        { cleanupIDs: false }
      ]
    }
  },

  // Analytics and Tracking
  analytics: {
    google: {
      trackingId: "UA-XXXXXXXX-X"
    },
    custom: {
      metricsEndpoint: "https://api.yourdomain.com/metrics",
      updateInterval: 3600000 // 1 hour
    }
  },

  // Publishing Settings
  publishing: {
    schedule: {
      timezone: "UTC",
      defaultTime: "09:00",
      bufferDays: 2,
      maximumScheduledPosts: 10
    },
    workflow: {
      requireReview: false,
      autoPublish: true,
      notifyOn: ["success", "failure"],
      retryAttempts: 3
    }
  },

  // Notification Settings
  notifications: {
    slack: {
      webhook: "https://hooks.slack.com/services/XXXXXX",
      channel: "#content-updates",
      mentionUsers: ["@contentmanager"]
    },
    email: {
      from: "content-system@yourdomain.com",
      to: ["team@yourdomain.com"],
      templates: {
        success: "templates/email/publish-success.html",
        failure: "templates/email/publish-failure.html"
      }
    }
  },

  // Development Settings
  development: {
    logLevel: "info",
    enableDebug: false,
    mockServices: false
  }
};

// config/local.js - Local development overrides
module.exports = {
  site: {
    baseUrl: "http://localhost:3000"
  },
  development: {
    logLevel: "debug",
    enableDebug: true,
    mockServices: true
  }
};
