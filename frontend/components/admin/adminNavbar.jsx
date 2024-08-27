import React, { useContext, useState, useEffect } from 'react';
import { BsPersonFill } from "react-icons/bs";
import ActiveItemContext from '../../components/admin/context/adminContext';
import insightHub from '../../public/insightHub.png'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
    const { activeItem } = useContext(ActiveItemContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);

    const router = useRouter();

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminName")
        localStorage.removeItem("adminEmail")
        localStorage.removeItem("adminGender")
        router.push("/")
    };

    const formatActiveItem = (item) => {
        if (!item) return 'HRMS';
        const formattedItem = item.replace(/([A-Z])/g, ' $1').trim();
        return formattedItem.charAt(0).toUpperCase() + formattedItem.slice(1);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed h-20 flex justify-between items-center w-full px-6 border-b border-white p-10 z-[999] transition-colors duration-300 ${scrolled ? 'bg-white' : 'bg-[#edeff3]'}`}>
            <div className="xl:pr-5 xl:px-0 lg:px-10 md:px-10 sm:px-1 px-1 flex justify-between w-full items-center flex-wrap">
                <div className='flex xl:gap-5 justify-center items-center'>
                    <div className='flex gap-3 items-center m-2 xl:mx-6 lg:mx-6 mdLmx-6 sm:mx-2 mx-2'>
                        <Image src={insightHub} alt="Logo" className='w-16 h-16 mb-2' />
                        <p className='flex justify-center text-[30px] text-[#19358B]'>InsightHub</p>
                    </div>
                    <div className='xl:pl-[10px] lg:pl-[10px] md:pl-[10px] text-[#18BADD] text-[22px] xl:block lg:block md:hidden sm:hidden hidden font-900'>{formatActiveItem(activeItem)}</div>
                </div>
                <div className="flex gap-2 items-center text-white">
                    <div className='relative'>
                        <div className='p-2 shadow-md rounded-md cursor-pointer' onClick={toggleDropdown}>
                            <BsPersonFill size={20} color='#202121' />
                        </div>

                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                                <ul>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button
                className="lg:hidden md:hidden flex justify-center items-center w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </nav>
    );
}
