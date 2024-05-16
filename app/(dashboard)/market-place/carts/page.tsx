'use client';
import { Button } from '@/components/ui/button';
import { cn, formatStringWithCommas, wait } from '@/lib/utils';
import Image from 'next/image';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import Car from '@/assets/images/nissan-pathfinder.png';
import { Check, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MARKET_URL } from '@/config/paths';
import { AppContext } from '@/context/app-context';
import { Separator } from '@/components/ui/separator';
import { LoanIcon, PayWithLoanIcon, SavingsIcon } from '@/assets/svgs';

const Carts = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<string>(
    paymentMethod[0].title
  );
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
    <div className="grid lg:grid-cols-12 gap-8 p-12">
      <div className="col-span-6 border rounded-lg p-4 bg-white space-y-4 h-fit max-h-[80vh]">
        <h1 role="heading" className="text-default font-bold text-sm">
          Checkout
        </h1>
        <div className="w-full space-y-6">
          {carts ? (
            <React.Fragment>
              {carts.length === 0 && (
                <p className="text-sm font-semibold text-center text-destructive">
                  You have no items in the cart
                </p>
              )}
              {carts.length > 0 && (
                <div className="space-y-4 w-full">
                  {carts.map((cart: any, index: number) => (
                    <div
                      key={cart.product.id}
                      className="flex border-b pb-5 border-b-[#F5F5F5] space-x-3"
                    >
                      <div className="flex space-x-2 w-[20%]">
                        <Image
                          src={Car}
                          alt="car"
                          className="w-20 h-[62px] rounded-lg object-cover"
                        />
                      </div>
                      <div className="space-y-2 w-[80%]">
                        <div>
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-xs">
                              {cart.product.name}
                            </h4>
                            <Trash
                              role="button"
                              className="text-destructive"
                              size={14}
                              onClick={() => handleDelete(cart.product.id)}
                            />
                          </div>

                          <p className="text-[11px] font-light">Cars</p>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center space-x-4 text-sm">
                            <Button
                              variant="outline"
                              size="sm"
                              className={cn(
                                cart.count < 2 && 'cursor-default',
                                'h-6 w-6'
                              )}
                              onClick={() => handleMinus(index)}
                              disabled={cart.count < 2}
                            >
                              -
                            </Button>
                            <p>{cart.count}</p>
                            <Button
                              variant="outline"
                              className="h-6 w-6"
                              size="sm"
                              onClick={() => handlePlus(index)}
                            >
                              +
                            </Button>
                          </div>
                          <p>
                            ₦
                            {formatStringWithCommas(
                              (
                                Number(cart.product.price) * cart.count
                              ).toString()
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="space-y-4">
                    <div className="flex justify-between w-full">
                      <div className="w-[20%]" />
                      <div className="flex justify-between w-[80%] text-xs font-semibold">
                        <p>Total</p>
                        <p className="">
                          ₦{formatStringWithCommas(totalCart.toString())}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <Button
                className="text-xs font-light w-full"
                onClick={handleContinueShopping}
                pending={isPending}
                pendingText="Please wait ..."
              >
                Continue shopping
              </Button>
            </React.Fragment>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="col-span-6 bg-white rounded-lg space-y-4 p-4 h-fit max-h-[80vh]">
        <h1 className="text-sm font-semibold">Select payment method</h1>
        <div className="grid grid-cols-3 gap-4 text-[#334DAA80]">
          {paymentMethod.map((payment) => (
            <div
              className={cn(
                'bg-[#FAFAFA] rounded-sm p-4 trans text-[11px] border border-[#FAFAFA] font-light text-center space-y-3 relative',
                selectedMethod === payment.title &&
                  'border-primary text-primary'
              )}
              key={payment.title}
              role="button"
              onClick={() => setSelectedMethod(payment.title)}
            >
              <div
                className={cn(
                  'bg-primary w-4 h-4 rounded-full flex items-center justify-center absolute right-4',
                  selectedMethod !== payment.title && 'opacity-35'
                )}
              >
                <Check className="text-white" size={18} />
              </div>
              {payment.icon}
              <p>{payment.title}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#FAFAFA] border border-[#F5F5F5] text-center py-4 rounded-sm">
          <p className="text-xs font-light">Savings Balance</p>
          <p className="font-semibold">₦ 12,000,000.00</p>
        </div>
        <div className="border border-[#F5F5F5] py-4 rounded-[5px] text-xs">
          <div className="flex justify-between border-b pb-4 border-[#F5F5F5]">
            <p className="px-4 font-light">Price</p>
            <p className="font-semibold px-4">
              {formatStringWithCommas(totalCart.toString())}.00
            </p>
          </div>
          <div className="flex justify-between py-4 border-[#F5F5F5]">
            <p className="px-4 font-light text-xs">Interest</p>
            <p className="font-semibold px-4">600.00</p>
          </div>
          <div className="flex justify-between border-t pt-4 border-[#F5F5F5]">
            <p className="px-4 font-bold text-xs">Total</p>
            <p className="font-bold text-sm px-4">
              {formatStringWithCommas(totalCart.toString())}.00
            </p>
          </div>
        </div>
        <div className="space-x-4">
          <Button variant="outline" className="font-light w-[38%]">
            Cancel
          </Button>
          <Button className="font-light w-[58%]">
            Pay NGN {formatStringWithCommas(totalCart.toString())}.00
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Carts;

const paymentMethod: { title: string; icon: ReactNode }[] = [
  {
    title: 'Pay from savings',
    icon: <SavingsIcon className="w-5 h-5 mx-auto" />,
  },
  {
    title: 'Pay with loan',
    icon: <PayWithLoanIcon className="mx-auto" />,
  },
  {
    title: 'Outright purchase',
    icon: <SavingsIcon className="w-5 h-5 mx-auto" />,
  },
];
