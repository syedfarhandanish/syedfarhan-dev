import './globals.css';
import Script from 'next/script';
import CustomCursor from '../components/CustomCursor'; // Make sure this path matches your folder structure

export const metadata = {
  title: 'Syed Farhan Danish | Front-End Developer & UI Designer',
  description: 'Portfolio of Syed Farhan Danish, Front-End Developer bridging the educational divide through EdTech and UI Design.',
  openGraph: {
    title: 'Syed Farhan Danish | Engineering Tech Solutions',
    description: 'Front-End Developer & UI Designer focused on web architecture, EdTech, and community impact.',
    url: 'https://syedfarhandanish.vercel.app',
    siteName: 'Syed Farhan Danish Portfolio',
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
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* THE GLOBAL CURSOR LAYER: Sits above all pages natively */}
        <CustomCursor />
        
        {children}
        
        <Script src="https://platform.linkedin.com/badges/js/profile.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}