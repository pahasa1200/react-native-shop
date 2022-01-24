import React, {createContext, useState} from 'react';
import * as Keychain from 'react-native-keychain';

const AuthContext = createContext(undefined);
const { Provider } = AuthContext;

const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState({
        accessToken: null,
        refreshToken: null,
        authenticated: null,
        firstName: null,
        lastName: null,
        id: null,
        email: null,
    });

    const logout = async () => {
        await Keychain.resetGenericPassword();
        setAuthState({
            accessToken: null,
            refreshToken: null,
            authenticated: false,
            firstName: null,
            lastName: null,
            id: null,
            email: null,
        });
    };

    const getAccessToken = () => {
        return authState.accessToken;
    };

    return (
        <Provider
            value={{
                authState,
                getAccessToken,
                setAuthState,
                logout,
            }}>
            {children}
        </Provider>
    );
};

export {AuthContext, AuthProvider};
