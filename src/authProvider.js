import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const users = {
    Natasha: { 
        tabs: ['Natasha ACTIVE', 'Natasha INACTIVE']
    },
    NazariiK: { 
        tabs: ['NazariiK Active!', 'NazariiK INACTIVE']
    },
    NikitaSh: { 
        tabs: ['NikitaSh Active!', 'NikitaSh INACTIVE']
    },
    RuslanD: { 
        tabs: ['RuslanD ACTIVE', 'RuslanD Active!', 'RuslanD INACTIVE']
    },
    AlexM: { 
        tabs: ['AlexM Active!', 'AlexM INACTIVE']
    },
    Nebojsa: { 
        tabs: ['Nebojsa ACTIVE', 'Nebojsa INACTIVE', 'Nebojsa Active!']
    },
    MarkT: { 
        tabs: ['MarkT Active!', 'MarkT INACTIVE']
    },
    AntonZh: { 
        tabs: ['AntonZh ACTIVE', 'AntonZh Active!', 'AntonZh INACTIVE']
    },
    Julia: { 
        tabs: ['Julia ACTIVE', 'Julia Active!', 'Julia INACTIVE']
    },
    Arkadiy: { 
        tabs: ['Arkadiy Active!', 'Arkadiy INACTIVE']
    },
    Olga: { 
        tabs: ['Olga ACTIVE', 'Olga Active!', 'Olga INACTIVE']
    },
    KolyaS: { 
        tabs: ['KolyaS Active!', 'KolyaS INACTIVE']
    },
    NataliiaD: { 
        tabs: ['NataliiaD Active', 'NataliiaD INACTIVE']
    },
    NataliiaG: { 
        tabs: ['NataliiaG Active', 'NataliiaG INACTIVE']
    },
    Alina: { 
        tabs: ['Alina Active!', 'Alina InActive']
    },
    MarynaU: { 
        tabs: ['MarynaU ACTIVE', 'MarynaU INACTIVE']
    },
    DmytroCh: { 
        tabs: ['DmytroCh ACTIVE', 'DmytroCh INACTIVE']
    },
    NikitaY: { 
        tabs: ['NikitaY ACTIVE', 'NikitaY INACTIVE']
    },
    AlexandraB: { 
        tabs: ['AlexandraB ACTIVE', 'AlexandraB INACTIVE']
    },
    DianaR: { 
        tabs: ['DianaR ACTIVE', 'DianaR INACTIVE']
    }
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allowedSheets, setAllowedSheets] = useState([]);

    const login = ({ username }) => {
        if (users[username]) {
            setUser(username);
            setAllowedSheets(users[username].tabs);
        } else {
            throw new Error('Пользователь не найден');
        }
    };

    const logout = () => {
        setUser(null);
        setAllowedSheets([]);
    };

    return (
        <AuthContext.Provider value={{ user, allowedSheets, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
