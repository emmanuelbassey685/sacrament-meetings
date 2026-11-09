import type { Metadata } from 'next';
import { Lora } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' });
export const metadata: Metadata = { title: 'Maple Ridge Ward | Sacrament Meeting Planner', description: 'View current and past Maple Ridge Ward sacrament meeting programs.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${lora.variable} antialiased`}><Header />{children}<Footer /></body></html>; }
