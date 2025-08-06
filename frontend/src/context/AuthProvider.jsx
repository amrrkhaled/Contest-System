import { useState, useEffect } from "react";
import { AuthContext } from "./ContextCreation";

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
    };

    useEffect(() => {
        // Sync with storage if needed
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
