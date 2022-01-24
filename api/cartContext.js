import React, {createContext, useState} from 'react';

const CartContext = createContext(undefined);
const { Provider } = CartContext;

const CartProvider = ({ children }) => {
    const [cartState, setCartState] = useState({
        products: null,
        newProduct: null
    });

    return (
        <Provider
            value={{
                setCartState,
                cartState
            }}>
            {children}
        </Provider>
    );
};

export {CartContext, CartProvider};
