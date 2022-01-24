import React, {createContext, useState} from 'react';

const ProductsContext = createContext(undefined);
const { Provider } = ProductsContext;

const ProductsProvider = ({ children }) => {
    const [productsState, setProductsState] = useState({
        products: null,
        newProduct: true
    });

    const reloadState = () => {
        return productsState.newProduct
            ? setProductsState({ ...productsState.products, newProduct: false })
            : setProductsState({ ...productsState.products, newProduct: true })
    };

    return (
        <Provider
            value={{
                setProductsState,
                productsState,
                reloadState
            }}>
            {children}
        </Provider>
    );
};

export {ProductsContext, ProductsProvider};
