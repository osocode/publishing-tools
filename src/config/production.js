module.exports = {
  site: {
    baseUrl: "https://yourdomain.com"
  },
  publishing: {
    workflow: {
      requireReview: true,
      autoPublish: false
    }
  },
  development: {
    logLevel: "error",
    enableDebug: false,
    mockServices: false
  }
};
