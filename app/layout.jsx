import './globals.css';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react'; 
import CustomCursor from '../components/CustomCursor'; 
import GlobalPopups from '../components/GlobalPopups'; 
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', 
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
    <html lang="en" style={{ scrollBehavior: 'smooth' }} className={inter.className}>
      {/* THE FIX: Removed the dangerous inline styles that caused the React crash */}
      <body>
        
        <CustomCursor />
        <GlobalPopups />
        
        {children}
        
        <Analytics />
        <Script src="https://platform.linkedin.com/badges/js/profile.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}