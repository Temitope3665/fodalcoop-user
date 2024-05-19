'use client';
import { Button } from '@/components/ui/button';
import { wait } from '@/lib/utils';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MARKET_URL } from '@/config/paths';
import { AppContext } from '@/context/app-context';
import UserCarts from '@/components/market-place.tsx/user-carts';
import PaymentMethodSelection from '@/components/market-place.tsx/payment-method-selection';

const Carts = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { setCarts, carts } = useContext(AppContext);

  useEffect(() => {
    const selectedProducts =
      typeof window !== 'undefined' && localStorage.getItem('cart');
    const products = selectedProducts ? JSON.parse(selectedProducts) : null;
    setCarts(products);
  }, []);

  const handleMinus = (id: number) => {
    const cartsCopy = [...carts];
    if (cartsCopy[id].count > 1) {
      cartsCopy[id] = { ...cartsCopy[id], count: cartsCopy[id].count - 1 };
      localStorage.setItem('cart', JSON.stringify(cartsCopy));
      setCarts(cartsCopy);
    }
  };

  const handlePlus = (id: number) => {
    const cartsCopy = [...carts];
    cartsCopy[id] = { ...cartsCopy[id], count: cartsCopy[id].count + 1 };
    localStorage.setItem('cart', JSON.stringify(cartsCopy));
    setCarts(cartsCopy);
  };

  const handleDelete = (id: number) => {
    const updatedCart = carts.filter((cart: any) => cart.product.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCarts(updatedCart);
  };

  const handleContinueShopping = () => {
    setIsPending(true);
    wait().then(() => {
      router.push(MARKET_URL);
      setIsPending(false);
    });
  };

  const totalCart: number = carts.reduce(
    (sum: number, item: { count: number; product: { price: number } }) =>
      sum + item.product.price * item.count,
    0
  );

  console.log(totalCart, '->');

  return (
    <div className="grid lg:grid-cols-12 gap-8 px-4 lg:px-12 py-6">
      <div className="col-span-6 border rounded-lg p-4 bg-white space-y-4 h-fit max-h-[82vh]">
        <h1 role="heading" className="text-default font-bold text-sm">
          Checkout
        </h1>
        <div className="w-full space-y-6">
          <UserCarts
            carts={carts}
            handleDelete={handleDelete}
            handleMinus={handleMinus}
            handlePlus={handlePlus}
            totalCart={totalCart}
          />
        </div>
        <Button
          className="text-xs font-light w-full"
          onClick={handleContinueShopping}
          pending={isPending}
          pendingText="Please wait ..."
        >
          Continue shopping
        </Button>
      </div>
      <PaymentMethodSelection totalCart={totalCart} />
    </div>
  );
};

export default Carts;
