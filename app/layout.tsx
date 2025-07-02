import { Metadata } from 'next';
import './globals.css';
import './highlight.css'
import { Press_Start_2P } from 'next/font/google';
import Head from './head';

const retroFont = Press_Start_2P({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Vinayak Maheshwari',
  description: 'Hi I am Vinayak Maheshwari, a fresher at the Indian Institute of Information Technology Allahabad. I am passionate about software development, particularly in web and mobile applications. I enjoy learning new technologies and building projects that solve real-world problems.',
  icons: {
    icon: 'https://avatars.githubusercontent.com/u/96346957?v=4',
    shortcut: 'https://avatars.githubusercontent.com/u/96346957?v=4',
  },
  openGraph: {
    title: 'Vinayak Maheshwari',
    description: 'Hi I am Vinayak Maheshwari, a fresher at the Indian Institute of Information Technology Allahabad. I am passionate about software development, particularly in web and mobile applications. I enjoy learning new technologies and building projects that solve real-world problems.',
    url: 'https://pholio.online',
    siteName: 'Vinayak Maheshwari',

    images: [
      {
        url: '/openGraph.png',
        width: 1200,
        height: 630,

      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vinayak Maheshwari',
    description: 'Hi I am Vinayak Maheshwari, a fresher at the Indian Institute of Information Technology Allahabad. I am passionate about software development, particularly in web and mobile applications. I enjoy learning new technologies and building projects that solve real-world problems.',
    images: ['/openGraph.png'],
  },
  authors: [
    {
      name: 'Vinayak Maheshwari',
      url: 'https://pholio.online',
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head />
      <body className={` text-text ${retroFont.className} p-4 pb-10`}>

        {children}
      </body>
    </html>
  );
}
