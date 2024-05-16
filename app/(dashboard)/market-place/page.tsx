'use client';
import SearchInput from '@/components/ui/search-input';
import { marketPlace } from './data';
import { ReactNode, useContext, useState } from 'react';
import { cn, formatStringWithCommas } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { CARTS_URL } from '@/config/paths';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/app-context';

interface ISelectedItems {
  image: ReactNode;
  name: string;
  price: string;
  id: string;
}

export default function MarketPlace() {
  const router = useRouter();
  const { setCarts, carts } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState(marketPlace[0]);
  const [currentSelectedItem, setCurrentSelectedItem] =
    useState<ISelectedItems | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);

  const handleMinus = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const handlePlus = () => {
    setCount((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    const updatedCarts = [...carts, { count, product: currentSelectedItem }];
    localStorage.setItem('cart', JSON.stringify(updatedCarts));
    setCarts(updatedCarts);
    setOpen(false);
  };

  const handleViewCarts = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
    router.push(CARTS_URL);
  };

  const totalCart = carts.reduce(
    (sum: number, item: { count: number }) => sum + item.count,
    0
  );
  console.log(totalCart, '->totalCart');

  console.log(carts, '-> cart');
  return (
    <div className="px-4 py-2 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-default font-semibold text-sm">Marketplace</h1>
        {totalCart > 0 && (
          <div
            className="flex relative items-center space-x-1 text-sm font-light cursor-pointer"
            onClick={handleViewCarts}
          >
            <div className="absolute text-[10px] right-6 -top-1 bg-primary text-white rounded-full w-4 flex items-center justify-center h-4 font-light">
              {totalCart}
            </div>
            <ShoppingCart size={18} />
            <p>Cart</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2 w-[75%]">
          {marketPlace.map((market) => (
            <div
              key={market.name}
              className={cn(
                'font-light text-default bg-white text-[11px] py-1.5 px-3 trans rounded-sm border border-white hover:border hover:border-primary',
                selectedCategory === market && 'border-primary'
              )}
              style={{ boxShadow: '0px 2px 10px 0px #2F4A891A' }}
              role="button"
              onClick={() => setSelectedCategory(market)}
            >
              <p>{market.name}</p>
            </div>
          ))}
        </div>
        <div className="w-[25%]">
          <SearchInput placeholder="Search" />
        </div>
      </div>

      <div className="overflow-y-auto space-y-4 h-[78vh]">
        {selectedCategory.data?.length > 0 && (
          <div className="grid lg:grid-cols-4 gap-8">
            {selectedCategory.data?.map((each, index) => {
              const isSelected = carts.some(
                (item: any) => item.product.id === each.id
              );
              const handleSelect = () => {
                console.log(isSelected, '-> selected');
                if (!isSelected) {
                  setCount(1);
                  setOpen(true);
                  setCurrentSelectedItem(each);
                } else {
                  const updatedItems = carts.filter(
                    (item: any) => item.product.id !== each.id
                  );
                  setCarts(updatedItems);
                }
              };
              console.log(isSelected, '-> ue');
              return (
                <div
                  key={`${each.name}-${index}`}
                  className={cn(
                    'bg-white rounded-md p-3 border border-white space-y-2 relative',
                    isSelected && 'border-primary'
                  )}
                  style={{ boxShadow: '0px 2px 10px 0px #2F4A891A' }}
                  onClick={() => handleSelect()}
                >
                  <p className="absolute bg-white text-xs font-light px-2 py-1.5 rounded-md right-2">
                    {selectedCategory.name}
                  </p>
                  <div>{each.image}</div>
                  <div className="text-xs space-y-2">
                    <p className="font-bold">{each.name}</p>
                    <p className="font-normal">
                      ₦{formatStringWithCommas(each.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your order</DialogTitle>
            <DialogDescription>
              <div className="space-y-4">
                <div className="w-full mt-4  object-cover">
                  {currentSelectedItem?.image}
                </div>
                <div className="text-lg space-y-">
                  <p className="font-bold">{currentSelectedItem?.name}</p>
                  <p className="text-sm font-light">{selectedCategory.name}</p>
                  <div className="flex justify-between items-center">
                    <p className="font-light">
                      {formatStringWithCommas(currentSelectedItem?.price || '')}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(count < 2 && 'cursor-default')}
                        onClick={handleMinus}
                        disabled={count < 2}
                      >
                        -
                      </Button>
                      <p>{count}</p>
                      <Button variant="outline" size="sm" onClick={handlePlus}>
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="w-full" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
