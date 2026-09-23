// Simple OG image generator using canvas (if available) or fallback
// This creates a 1200x630 OG image for social sharing

const fs = require('fs');
const path = require('path');

// For now, we'll copy and inform the user
// In a real scenario, you'd use @vercel/og or canvas to generate
const sourcePath = path.join(__dirname, '../public/profile.jpg');
const targetPath = path.join(__dirname, '../public/og-image.jpg');

console.log('Note: For production, consider using @vercel/og for dynamic OG images');
console.log('For now, copying profile image as placeholder...');

try {
  fs.copyFileSync(sourcePath, targetPath);
  console.log('✅ OG image created at public/og-image.jpg');
  console.log('⚠️  Consider creating a custom 1200x630px image with:');
  console.log('   - Your name and title');
  console.log('   - Portfolio branding');
  console.log('   - Professional design matching your site');
} catch (error) {
  console.error('❌ Error creating OG image:', error.message);
  process.exit(1);
}
