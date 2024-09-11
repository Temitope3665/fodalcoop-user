import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

interface ISelectLoanType {
  form: any;
  loadingLoanProduct: boolean;
  loanProduct: any;
  isLoanProductError: boolean;
}

export default function SelectLoanProduct({
  form,
  loadingLoanProduct,
  loanProduct,
  isLoanProductError,
}: ISelectLoanType) {
  return (
    <FormField
      control={form.control}
      name="loanProduct"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Select loan product</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select loan product" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {loadingLoanProduct ? (
                <p className="px-4 py-2 text-xs font-light text-primary">
                  Loading loan product...
                </p>
              ) : (
                <React.Fragment>
                  {loanProduct?.length === 0 ? (
                    <p className="px-4 py-2 text-sm font-light">
                      No loan product
                    </p>
                  ) : (
                    <React.Fragment>
                      {loanProduct?.map((each: { name: string }) => (
                        <SelectItem
                          value={JSON.stringify(each)}
                          key={each.name}
                        >
                          {each.name}
                        </SelectItem>
                      ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
              {isLoanProductError && (
                <p className="px-4 py-2 text-sm font-light text-destructive">
                  An error occured while fetching loan product...
                </p>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
