import React, { createContext, useContext, useState,type ReactNode } from 'react';

export interface User {
    id: number;
    numeComplet: string;
    email: string;
    rol: 'user' | 'admin';
    adresa: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('zeedo_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('zeedo_user', JSON.stringify(userData)); // Save for page reloads
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('zeedo_user');
    };

    const isAdmin = user?.rol === 'admin';

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};