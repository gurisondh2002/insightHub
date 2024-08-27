import React, { createContext, useState } from 'react';

const ActiveItemContext = createContext();

export const ActiveItemProvider = ({ children }) => {
    const [activeItem, setActiveItem] = useState('');

    return (
        <ActiveItemContext.Provider value={{ activeItem, setActiveItem }}>
            {children}
        </ActiveItemContext.Provider>
    );
};

export default ActiveItemContext;
