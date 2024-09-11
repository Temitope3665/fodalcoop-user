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

interface ILoanProduct {
  isLoading: boolean;
  form: any;
  data: any;
  isError: boolean;
}

export default function SelectLoanType({
  isLoading,
  form,
  data,
  isError,
}: ILoanProduct) {
  return (
    <FormField
      control={form.control}
      name="loanType"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Select loan type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select loan type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {isLoading ? (
                <p className="px-4 py-2 text-xs font-light text-primary">
                  Loading loan type...
                </p>
              ) : (
                <React.Fragment>
                  {data?.length === 0 ? (
                    <p className="px-4 py-2 text-xs font-light text-primary">
                      No loan type
                    </p>
                  ) : (
                    <React.Fragment>
                      {data?.map((each: { name: string }) => (
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
              {isError && (
                <p className="px-4 py-2 text-sm font-light text-destructive">
                  An error occured while fetching loan type...
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
