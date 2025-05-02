import { Metadata } from 'next';
import './globals.css';
import { Press_Start_2P } from 'next/font/google';

const retroFont = Press_Start_2P({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Vinayak Maheshwari',
  description: 'Hi I am Vinayak Maheshwari, a fresher at the Indian Institute of Information Technology Allahabad. I am passionate about software development, particularly in web and mobile applications. I enjoy learning new technologies and building projects that solve real-world problems.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-[#191e17] text-green-400 ${retroFont.className} p-4`}>{children}</body>
    </html>
  );
}