const fs = require('fs');
const path = require('path');

// Ensure directories exist
const dirs = [
  'src/app',
  'src/app/dashboard',
  'src/app/privacy',
  'src/app/disclosures',
  'src/components',
];
dirs.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

// Create minimal page.tsx
fs.writeFileSync('src/app/page.tsx', `import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <div className="py-24 text-center">
        <p className="text-gray-400">More components loading...</p>
      </div>
      <Footer />
    </main>
  )
}
`);

console.log('✅ Created page.tsx');
console.log('✅ Setup complete! Run: npm run dev');
