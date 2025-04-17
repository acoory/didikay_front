import React, {createContext, useContext, useState, ReactNode} from 'react';

interface UserTypes {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    updatedAt: Date | undefined;
}

interface UserContextType {
    user: UserTypes | null;
    setUser: React.Dispatch<React.SetStateAction<UserTypes | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<UserTypes | null>(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
