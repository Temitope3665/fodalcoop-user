import Image from 'next/image';
import React from 'react';
import Car from '@/assets/images/nissan-pathfinder.png';
import { Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { cn, formatStringWithCommas } from '@/lib/utils';

interface IUserCarts {
  carts: {
    count: number;
    product: { name: string; id: string; price: number };
  }[];
  handleDelete: (arg: number) => void;
  handleMinus: (arg: number) => void;
  handlePlus: (arg: number) => void;
  totalCart: number;
}

const UserCarts = ({
  carts,
  handleDelete,
  handleMinus,
  handlePlus,
  totalCart,
}: IUserCarts) => {
  return (
    <div>
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
                          (Number(cart.product.price) * cart.count).toString()
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
        </React.Fragment>
      ) : (
        ''
      )}
    </div>
  );
};

export default UserCarts;
