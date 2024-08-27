'use client'
import React, { useState } from 'react';
import Navbar from '../../components/admin/adminNavbar';
import Sidebar from '../../components/admin/adminSidebar';
import { ActiveItemProvider } from '../../components/admin/context/adminContext';

import '../../app/globals.css';

export default function RootLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (                        
        <html lang="en">               
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            </head>
            <body className="bg-[#edeff3] dark:text-white font-montserrat">
                <ActiveItemProvider>
                    <div className="flex flex-col h-screen relative">
                        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        <div className="flex flex-1">
                            <Sidebar isOpen={sidebarOpen} />
                            <main className="xl:ml-[300px]  lg:ml-80 md:ml-80 xl:p-10 lg:p-10 md:p-10 sm:p-5 p-5 mt-20 flex-1">{children}</main>
                        </div>
                    </div>
                </ActiveItemProvider>
            </body>
        </html>
    );
}
