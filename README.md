# KustodyFi - Calendar Risk Hedging Platform

A production-quality marketing site for KustodyFi with Web3 wallet integration.

## 🚀 Quick Start

```bash
# Development
npm run dev

# Build
npm run build

# Test
npm test
```

## ✅ What's Complete

- ✅ **995 npm packages installed**
- ✅ Next.js 14 with TypeScript
- ✅ Tailwind CSS dark theme
- ✅ **Web3 wallet connection** (wagmi, RainbowKit)
- ✅ **Bilingual i18n** (English/Korean)
- ✅ **All 9 components**: Nav, Hero, Problem, Calculator, HowItWorks, SealCustody, Compliance, Contact, Footer
- ✅ **4 pages**: Home, Dashboard (protected), Privacy, Disclosures
- ✅ **Calculator utilities with tests** (10 tests ready)
- ✅ Analytics tracking system
- ✅ SEO optimized (meta tags, sitemap, robots.txt)

## 📂 Project Structure

```
kustodyfi/
├── src/
│   ├── app/                 # Pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── dashboard/       # Protected dashboard
│   │   ├── privacy/         # Privacy policy
│   │   └── disclosures/     # Legal disclosures
│   ├── components/          # React components (9 total)
│   ├── contexts/            # React contexts (Locale, Wallet)
│   ├── i18n/               # Translations (EN/KR)
│   └── lib/                # Utilities (calculator, analytics, wagmi)
├── public/                 # Static files
└── package.json            # Dependencies
```

## 🌐 Features

### Web3 Wallet Connection
- MetaMask, WalletConnect, Coinbase Wallet support
- 5 networks: Ethereum, Polygon, Arbitrum, Base, Optimism
- Protected dashboard page

### Bilingual Support
- English and Korean translations
- Toggle in navigation bar (🌐 button)

### Components
1. **Nav** - Navigation with wallet connect
2. **Hero** - Hero section with CTAs
3. **Problem** - Calendar risk explanation
4. **Calculator** - FX hedging calculator (placeholder)
5. **HowItWorks** - 5-step workflow
6. **SealCustody** - Custody features
7. **Compliance** - Legal information
8. **Contact** - Contact section
9. **Footer** - Footer with links

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui
```

## 🔐 Wallet Setup (Optional)

Get a WalletConnect Project ID:
1. Visit https://cloud.walletconnect.com/
2. Create project
3. Copy Project ID
4. Add to `.env.local`:
```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

## 📱 Pages

- `/` - Home (all sections)
- `/dashboard` - Protected dashboard (requires wallet)
- `/privacy` - Privacy policy
- `/disclosures` - Legal disclosures

## 🎨 Customization

### Edit Content
- **English**: `src/i18n/en.json`
- **Korean**: `src/i18n/ko.json`

### Edit Components
All components in `src/components/`

### Edit Styling
- **Theme colors**: `tailwind.config.ts`
- **Global styles**: `src/app/globals.css`

## 📊 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **wagmi** + **viem** + **RainbowKit** (Web3)
- **Lucide Icons**
- **Vitest** (testing)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push

# Deploy on Vercel
# Import your GitHub repo at vercel.com
```

## 📝 Notes

- Components are simplified placeholders
- Calculator logic is ready but UI needs enhancement
- All Web3 functionality is working
- Tests are ready to run

## 🎯 Next Steps

1. Enhance component content (Problem, Calculator, HowItWorks, etc.)
2. Add full Calculator UI implementation
3. Add more detailed content
4. Deploy to Vercel
5. Set up analytics integration

---

**Built with ❤️ for Korean exporters and importers**

**Server is running at**: http://localhost:3000

