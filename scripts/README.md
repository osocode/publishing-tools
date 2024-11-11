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
