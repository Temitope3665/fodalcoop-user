import { Button } from '@/components/ui/button';
import { wait } from '@/lib/utils';
import React from 'react';

const ReviewForm = ({
  setCurrentFormView,
}: {
  setCurrentFormView: (arg: number) => void;
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  function handleBack() {
    setIsLoading(true);
    wait().then(() => {
      setCurrentFormView(2);
      setIsLoading(false);
    });
  }
  return (
    <div className="space-y-4">
      <div>
        <p className="font-bold text-[10px] text-[#666666]">LOAN TYPE</p>
        <p className="text-xs">Annual interest loan</p>
      </div>
      <div>
        <p className="font-bold text-[10px] text-[#666666]">LOAN PRODUCT</p>
        <p className="text-xs">Basic Business Loan</p>
      </div>
      <div>
        <p className="font-bold text-[10px] text-[#666666]">LOAN AMOUNT</p>
        <p className="text-xs">NGN 5,000,000.00</p>
      </div>
      <div>
        <p className="font-bold text-[10px] text-[#666666]">LOAN INTEREST</p>
        <p className="text-xs">NGN 500,000</p>
      </div>
      <div className="">
        <p className="font-bold text-[10px] text-[#666666]">GUARANTOR</p>
        <div className="space-y-2">
          <div className="grid grid-cols-2 text-xs">
            <p>Olayinka Adeyeye</p>
            <p>200,000.00</p>
          </div>
          <div className="grid grid-cols-2 text-xs">
            <p>Olayinka Adeyeye</p>
            <p>200,000.00</p>
          </div>
        </div>
      </div>
      <div>
        <p className="font-bold text-[10px] text-[#666666]">AMOUNT</p>
        <p className="text-xs">NGN 5,000,000.00</p>
      </div>

      <div className="flex space-x-4">
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleBack}
          pending={isLoading}
          pendingText="Please wait..."
        >
          Back
        </Button>
        <Button type="submit" pendingText="Please wait" className="w-full">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
