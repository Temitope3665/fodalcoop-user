'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const AppContext = createContext<any>({});

interface IAppProvider {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: IAppProvider) => {
  const [carts, setCarts] = useState<any[]>([]);

  useEffect(() => {
    const selectedProducts =
      typeof window !== 'undefined' && localStorage.getItem('cart');
    const products = selectedProducts ? JSON.parse(selectedProducts) : null;
    setCarts(products);
  }, []);

  const value = {
    carts,
    setCarts,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
