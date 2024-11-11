# publishing automation scripts

Example github actions workflow

```
// Generate GitHub Actions workflow
export function generateGitHubWorkflow() {
  return `
name: Content Publishing Pipeline

on:
  push:
    paths:
      - 'posts/**/*.md'
      - 'assets/images/original/**'

jobs:
  prepare-content:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Validate content
        run: node scripts/validate-content.js
        
      - name: Optimize images
        run: node scripts/optimize-images.js
        
      - name: Generate platform versions
        run: node scripts/generate-versions.js
        
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add assets/images/
          git add snippets/
          git commit -m "Optimize content and generate platform versions" || exit 0
          
      - name: Push changes
        uses: ad-m/github-push-action@master
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
  `;
}
```

```
name: Content Publishing Pipeline

on:
  push:
    paths:
      - 'posts/**/*.md'
      - 'assets/images/original/**'
      - 'series/**/*.md'
  pull_request:
    paths:
      - 'posts/**/*.md'
      - 'assets/images/original/**'
      - 'series/**/*.md'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Validate markdown
        run: |
          npm run validate-content
          
      - name: Check links
        run: npm run check-links
        
      - name: Validate frontmatter
        run: npm run validate-frontmatter

  optimize:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Optimize images
        run: npm run optimize-images
        
      - name: Generate social previews
        run: npm run generate-previews
        
      - name: Commit optimized assets
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "chore: optimize assets"
          file_pattern: assets/**/*

  prepare-content:
    needs: optimize
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Generate platform versions
        run: npm run generate-versions
        
      - name: Prepare SEO metadata
        run: npm run prepare-seo
        
      - name: Generate social snippets
        run: npm run generate-snippets
        
      - name: Commit prepared content
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "chore: prepare content for publishing"
          file_pattern: |
            snippets/**/*
            metadata/**/*

  publish:
    needs: prepare-content
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Publish blog content
        if: contains(github.event.head_commit.modified, 'posts/')
        env:
          BLOG_API_TOKEN: ${{ secrets.BLOG_API_TOKEN }}
        run: npm run publish-blog
        
      - name: Schedule social media
        if: contains(github.event.head_commit.modified, 'posts/')
        env:
          LINKEDIN_TOKEN: ${{ secrets.LINKEDIN_TOKEN }}
          TWITTER_TOKEN: ${{ secrets.TWITTER_TOKEN }}
        run: npm run schedule-social
        
      - name: Update internal documentation
        if: contains(github.event.head_commit.modified, 'posts/')
        env:
          CONFLUENCE_TOKEN: ${{ secrets.CONFLUENCE_TOKEN }}
        run: npm run update-internal-docs

  monitor:
    needs: publish
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Setup monitoring
        env:
          ANALYTICS_TOKEN: ${{ secrets.ANALYTICS_TOKEN }}
        run: npm run setup-monitoring
        
      - name: Generate initial report
        run: npm run generate-report
        
      - name: Send notification
        env:
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
        run: npm run send-notification
```
