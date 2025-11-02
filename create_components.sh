#!/bin/bash

# This script creates all remaining component files for KustodyFi

echo "Creating all component files..."

# Create public directory files first
mkdir -p /Users/jaehyunglee/Desktop/Development/Github/kustodyfi/public

cat > /Users/jaehyunglee/Desktop/Development/Github/kustodyfi/public/robots.txt << 'EOF'
# robots.txt for KustodyFi
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://kustodyfi.com/sitemap.xml
EOF

cat > /Users/jaehyunglee/Desktop/Development/Github/kustodyfi/public/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kustodyfi.com/</loc>
    <lastmod>2025-11-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://kustodyfi.com/privacy</loc>
    <lastmod>2025-11-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://kustodyfi.com/disclosures</loc>
    <lastmod>2025-11-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
EOF

echo "✅ Public files created"
echo "Script completed!"
