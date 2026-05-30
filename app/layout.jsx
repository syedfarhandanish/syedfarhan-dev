import './globals.css';
import Script from 'next/script';
import CustomCursor from '../components/CustomCursor'; // Make sure this path matches your folder structure

// 1. Import the optimized Next.js Font
import { Inter } from 'next/font/google';

// 2. Configure the font (Downloads at build-time for instant loading)
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Prevents invisible text while loading
});

export const metadata = {
  title: 'SFD. | Front-End Developer & UI Designer',
  description: 'Portfolio of Syed Farhan Danish, Front-End Developer bridging the educational divide through EdTech and UI Design.',
  openGraph: {
    title: 'SFD. | Engineering Tech Solutions',
    description: 'Front-End Developer & UI Designer focused on web architecture, EdTech, and community impact.',
    url: 'https://syedfarhandanish.vercel.app',
    siteName: 'SFD Portfolio',
    images: [
      {
        url: '/images/og-thumbnail.jpg', 
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    // 3. Apply the font class to the HTML tag
    <html lang="en" style={{ scrollBehavior: 'smooth' }} className={inter.className}>
      <body>
        {/* THE GLOBAL CURSOR LAYER: Sits above all pages natively */}
        <CustomCursor />
        
        {children}
        
        <Script src="https://platform.linkedin.com/badges/js/profile.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}