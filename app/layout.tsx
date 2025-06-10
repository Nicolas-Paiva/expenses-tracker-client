import type {Metadata} from 'next';
import {Roboto} from 'next/font/google';
import './globals.css';
import {Toaster} from 'react-hot-toast';
import Providers from '@/app/Providers/Providers';
import React from 'react';

const roboto = Roboto({
    variable: '--font-roboto',
    subsets: ['latin'],
    weight: ['400', '700'], // Optional: add other weights as needed
});

export const metadata: Metadata = {
    title: 'ExpenseMate',
    description: 'Manage all your expenses in one place',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${roboto.className} antialiased`}>
        <Providers>
            {children}
            <Toaster position="top-center"/>
        </Providers>
        </body>
        </html>
    );
}
