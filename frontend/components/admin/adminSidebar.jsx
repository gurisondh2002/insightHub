import React, { useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Link from 'next/link';
import ActiveItemContext from '../../components/admin/context/adminContext';
import { AiOutlineDashboard } from "react-icons/ai";
import styles from '../styles.module.css'

const sidebarItems = [
    {
        name: 'Dashboard Overview',
        icon: <AiOutlineDashboard />,
        subItems: [
            { name: 'Overview', path: '/admin' }
        ]
    },
];

export default function Sidebar({ isOpen }) {
    const { activeItem, setActiveItem } = useContext(ActiveItemContext);
    const [openDropdown, setOpenDropdown] = useState({});

    const pathname = usePathname();

    useEffect(() => {
        const currentItem = pathname.split('/').pop();
        setActiveItem(currentItem);
    }, [pathname]);

    const handleItemClick = (itemName) => {
        setActiveItem(itemName.toLowerCase().replace(/\s+/g, ''));
    };
    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 w-[300px] py-4 mt-20 overflow-y-auto transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 md:translate-x-0 sm:translate-x-0'}`}
            style={{ background: 'white' }}
        >
            <ul className={`space-y-2 font-medium ${styles.customScrollbar}`}>
                {sidebarItems.map(section => (
                    <li className='px-5' key={section.name}>
                        <div className="text-[#19358B] text-[13px] font-bold mt-4 flex gap-3">
                            {section.name}
                        </div>
                        {section.subItems && section.subItems.map(subItem => (
                            <div key={subItem.name}>
                                {subItem.subItems ? (
                                    <>
                                        <button
                                            type="button"
                                            className={`flex items-center w-full p-1 text-[17px] hover:scale-105 transition duration-75 rounded-lg group ${openDropdown[subItem.name] ? 'text-[#19358B] font-semibold' : 'text-[#19358B] font-medium'}`}
                                        >
                                            <div>{subItem.icon}</div>
                                            <span className="flex-1 ml-2 text-left rtl:text-right whitespace-nowrap">{subItem.name}</span>
                                            {openDropdown[subItem.name] ? <FaMinus size={12} /> : <FaPlus size={12} />}
                                        </button>
                                        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openDropdown[subItem.name] ? 'max-h-[1000px] bg-[#FAFAFA] rounded-xl' : 'max-h-0'}`} style={{ padding: openDropdown[subItem.name] ? '10px' : '0', marginTop: '5px' }}>
                                            <ul className="space-y-2" style={{ listStyle: "none", paddingLeft: 0 }}>
                                                {subItem.subItems.map(subSubItem => (
                                                    <li key={subSubItem.name} className="relative pl-5 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-[#18BADD]">
                                                        <Link
                                                            href={subSubItem.path || '#'}
                                                            className={`flex items-center w-full transition duration-75 pl-6 rounded-lg hover:text-[#18BADD] group ${subSubItem.path && activeItem === subSubItem.path.split('/').pop() ? 'text-[#18BADD] font-semibold text-[16px]' : 'text-[#4d5052] text-[15px]'}`}
                                                            onClick={() => handleItemClick(subSubItem.name)}
                                                        >
                                                            <span className={`absolute left-0 top-1/2 transform -translate-y-1/2 pl-5 hover:text-[#18BADD] ${subSubItem.path && activeItem === subSubItem.path.split('/').pop() ? 'text-[#18BADD]' : 'text-gray-400'}`}>
                                                                {subSubItem.path && activeItem === subSubItem.path.split('/').pop() ? <>&#8594;</> : <>&#8594;</>}
                                                            </span>
                                                            {subSubItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={subItem.path || '#'}
                                        className={`flex items-center w-full p-1 text-[17px] transition hover:scale-105 duration-75 rounded-lg group ${subItem.path && activeItem === subItem.path.split('/').pop() ? 'text-[#18BADD] font-semibold text-[15px]' : 'text-[#19358B] text-[15px]'}`}
                                        onClick={() => handleItemClick(subItem.name)}
                                    >
                                        <div>{subItem.icon}</div>
                                        <span className="flex-1 ml-2 text-left rtl:text-right whitespace-nowrap">{subItem.name}</span>
                                        {subItem.path && activeItem === subItem.path.split('/').pop() && <span>&#8594;</span>}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </aside>
    );
}
