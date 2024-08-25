import { createContext, useState, useEffect } from "react";

export const bookingContext = createContext();

export const MyProvider = ({ children }) => {
    const [bookData, setbookData] = useState(null);

    // Load the initial state from local storage if it exists
    useEffect(() => {
        const storedBookData = localStorage.getItem('bookData');
        if (storedBookData != undefined && storedBookData) {
            setbookData(JSON.parse(storedBookData));
        }
    }, []);

    const updateValue = (newValue) => {
        setbookData(newValue);
        localStorage.setItem('bookData', JSON.stringify(newValue));
    };

    return (
        <bookingContext.Provider value={{ bookData, setbookData, updateValue }}>
            {children}
        </bookingContext.Provider>
    );
};
