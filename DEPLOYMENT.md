# Deployment Checklist

## Pre-Deployment Checklist

### ✅ Build Verification
- [x] Build completes successfully: `npm run build`
- [x] No TypeScript errors
- [x] No ESLint errors (or acceptable warnings)
- [x] All translations are complete (English & Arabic)

### ✅ Code Quality
- [x] Removed unused files (main.tsx, pages directory)
- [x] All components use translation keys
- [x] No hardcoded text in components
- [x] Environment variables documented (if any)

### ✅ Configuration
- [x] `.gitignore` includes `.next/` and build artifacts
- [x] `next.config.mjs` is properly configured
- [x] `next-intl.config.js` is set up correctly
- [x] Middleware is configured for locale routing

## Build Output

The build generates:
- Static pages in `.next/server/app/`
- Optimized assets in `.next/static/`
- Server components and API routes

## Deployment Steps

### 1. Environment Setup
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm start
```

### 2. Vercel Deployment (Recommended)

**Automatic Deployment:**
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Vercel auto-detects Next.js configuration
4. Deploy!

**Manual Deployment:**
```bash
npm i -g vercel
vercel
```

**Environment Variables (if needed):**
- Add any required environment variables in Vercel dashboard
- Currently no environment variables required

### 3. Other Platforms

**Requirements:**
- Node.js 18 or higher
- `npm install` to install dependencies
- `npm run build` to build
- `npm start` to run production server

**Build Command:** `npm run build`
**Start Command:** `npm start`
**Node Version:** 18.x or higher

## Post-Deployment

### ✅ Verification
- [ ] Site loads correctly at root URL
- [ ] English version works: `/en`
- [ ] Arabic version works: `/ar`
- [ ] Language switching works
- [ ] Dark/Light mode toggle works
- [ ] All images load correctly
- [ ] Contact form works (if applicable)
- [ ] All links are functional
- [ ] Mobile responsive design works
- [ ] SEO meta tags are present

### ✅ Performance
- [ ] Lighthouse score > 90
- [ ] Images are optimized
- [ ] Fonts load correctly
- [ ] No console errors

### ✅ Internationalization
- [ ] English content displays correctly
- [ ] Arabic content displays correctly (RTL)
- [ ] Language switcher works
- [ ] URLs include locale prefix (`/en`, `/ar`)

## Troubleshooting

### Build Errors
- Check for TypeScript errors: `npm run build`
- Verify all imports are correct
- Ensure all translation keys exist

### Runtime Errors
- Check browser console for errors
- Verify environment variables (if any)
- Check server logs

### Translation Issues
- Verify `messages/en.json` and `messages/ar.json` exist
- Check translation keys match component usage
- Ensure `next-intl.config.js` is correct

## Notes

- The project uses Next.js App Router
- Internationalization handled by `next-intl`
- All translations are in `messages/` directory
- Build output is in `.next/` directory (gitignored)
- Production server runs on port 3000 by default

