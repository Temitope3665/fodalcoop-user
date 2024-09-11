'use client';
import { getCompanyProfile } from '@/config/apis/profile';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const AppContext = createContext<any>({});

interface IAppProvider {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: IAppProvider) => {
  const [carts, setCarts] = useState<any[]>([]);

  const { data } = useQuery({
    queryFn: getCompanyProfile,
    queryKey: ['company_profile'],
  });

  useEffect(() => {
    const selectedProducts =
      typeof window !== 'undefined' && localStorage.getItem('cart');
    const products = selectedProducts ? JSON.parse(selectedProducts) : [];
    setCarts(products);
  }, []);

  const value: {
    carts: any[];
    setCarts: (arg: any[]) => void;
    data: { name: string; image_path: string } | undefined;
  } = {
    carts,
    setCarts,
    data,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
