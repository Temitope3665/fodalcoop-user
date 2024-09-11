import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import React from 'react';

interface ISelfDeterminedForm {
  fields: any;
  totalLoan: number | null;
  totalAmount: number | null;
  form: any;
  handleRepaymentChange: (input: string, field: any, index: number) => void;
  periodLength: any[];
  watchRePaymentPlan: any;
  customPayment: any;
  handleAppend: () => void;
  isPending: boolean;
  isDeleting: boolean;
  hanldeRemoveCustom: (index: number, id: string) => void;
  selectedItemToDelete: string;
}

export default function SelfDeterminedForm({
  fields,
  totalLoan,
  totalAmount,
  form,
  handleRepaymentChange,
  periodLength,
  watchRePaymentPlan,
  customPayment,
  handleAppend,
  isPending,
  isDeleting,
  hanldeRemoveCustom,
  selectedItemToDelete,
}: ISelfDeterminedForm) {
  return (
    <React.Fragment>
      <div className="rounded-md border px-3 py-2 border-primary">
        <p className="text-xs font-light text-primary">
          Loan amount left:{' '}
          {(Number(totalLoan) - Number(totalAmount)).toFixed(2)}
        </p>
      </div>
      <div className="space-y-2 relative">
        <div className="grid grid-cols-3 gap-4">
          <FormLabel>Enter amount</FormLabel>
          <FormLabel>Select month</FormLabel>
        </div>

        {fields.map((each: any, index: number) => (
          <div className="grid grid-cols-5 items-center gap-4 w-full">
            <FormField
              control={form.control}
              name={`repayment_plan.${index}.amount`}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Input
                      placeholder="Enter amount"
                      className="h-10 w-full"
                      max={(Number(totalLoan) - Number(totalAmount)).toFixed(2)}
                      onChange={({ target }) =>
                        handleRepaymentChange(target.value, field, index)
                      }
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.repayment_plan?.[index]?.root
                      ?.message || ''}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`repayment_plan.${index}.month`}
              render={({ field }) => (
                <FormItem className="w-full col-span-2">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select loan product"
                            className="w-full"
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="w-full">
                        {periodLength.map((each) => (
                          <SelectItem
                            value={each.month.toString()}
                            key={each.month}
                            className="w-full"
                            disabled={
                              !!watchRePaymentPlan?.find(
                                (paym: { month: string }) =>
                                  paym.month === each.month
                              )
                            }
                          >
                            {each.month + ' months'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage className="text-white">
                    {form.formState.errors.repayment_plan?.[index]?.root
                      ?.message || ''}
                  </FormMessage>
                </FormItem>
              )}
            />

            <div className="col-span-0.5 flex items-center space-x-4">
              {fields.length > 1 && (
                <div role="button" className="w-[10%]">
                  {isDeleting && each.monthId === selectedItemToDelete ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2
                      className="text-destructive"
                      size={16}
                      strokeWidth={1}
                      onClick={() =>
                        hanldeRemoveCustom(index, each.monthId || '')
                      }
                    />
                  )}
                </div>
              )}

              {fields[fields.length - 1].id === each.id && (
                <div>
                  {Number(customPayment?.total) !== Number(totalLoan) && (
                    <div
                      className="flex space-x-2 w-fit items-center justify-center text-xs text-primary right-6 bottom-[56px] rounded-full bg-[#506CC0BF] p-1.5"
                      role="button"
                      onClick={handleAppend}
                    >
                      {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
