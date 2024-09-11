import EmptyComponent from '@/components/empty';
import ShowError from '@/components/showError';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormGroup,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  addCapitalProducts,
  deleteCapitalProducts,
  getCapitalProducts,
} from '@/config/apis/loans';
import { LOAN_CAPITAL_PRODUCTS_KEY } from '@/lib/query-keys';
import { formatCurrency } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, Plus, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface IAddDocument {
  form: any;
  watchLoanAmount: string;
}

const defaultProduct = { itemName: '', qty: '', price: '', invoiceNumber: '' };

export default function AddCapitalLoanFields({
  form,
  watchLoanAmount,
}: IAddDocument) {
  const [customErrorField, setCustomErrorField] = React.useState<string>('');
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const queryClient: any = useQueryClient();
  const [capitalProduct, setCapitalProduct] = useState<{
    itemName: string;
    qty: string;
    price: string;
    invoiceNumber: string;
  }>(defaultProduct);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: getCapitalProducts,
    queryKey: [LOAN_CAPITAL_PRODUCTS_KEY],
    enabled: !!watchLoanAmount,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addCapitalProducts,
    onSuccess: async () => {
      queryClient.invalidateQueries(LOAN_CAPITAL_PRODUCTS_KEY);
      toast.success('Product added successfully');
      setCapitalProduct(defaultProduct);
    },
    onError: (error: any) =>
      setCustomErrorField(error?.response?.data?.message || 'An error occured'),
  });

  const { mutate: deleteDocument, isPending: isDeleting } = useMutation({
    mutationFn: deleteCapitalProducts,
    onSuccess: async () => {
      await queryClient.invalidateQueries(LOAN_CAPITAL_PRODUCTS_KEY);
      toast.success('Product removed successfully');
    },
    onError: (error: any) =>
      setCustomErrorField(error?.response?.data?.message || 'An error occured'),
  });

  useEffect(() => {
    if (data) {
      form.setValue('capital_loan_product', data?.data?.cart);
    }
  }, [isLoading, data]);

  console.log(data);

  const handleAddCapitalProduct = () => {
    if (
      capitalProduct.invoiceNumber &&
      capitalProduct.itemName &&
      capitalProduct.price &&
      capitalProduct.qty
    ) {
      mutate(capitalProduct);
    }
  };

  useEffect(() => {
    if (error) {
      setCustomErrorField('An error occured while accessing the server');
    }
  }, [isError]);

  return (
    <div className="space-y-2 w-full">
      <Label>Add Capital Loan Product</Label>

      <ShowError
        errorMessage={customErrorField}
        setErrorMessage={setCustomErrorField}
      />

      <div className="block space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="">Item Name</Label>
            <Input
              placeholder="Enter item name"
              className="h-10"
              type="text"
              value={capitalProduct.itemName}
              onChange={({ target }) =>
                setCapitalProduct((prev) => ({
                  ...prev,
                  itemName: target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1 relative">
            <Label className="">Price</Label>
            <div className="flex items-center">
              <p className="absolute pl-3">₦</p>
              <Input
                placeholder="200,000"
                className="pl-6 h-10"
                type="number"
                value={capitalProduct.price}
                onChange={({ target }) =>
                  setCapitalProduct((prev) => ({
                    ...prev,
                    price: target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="">Qty</Label>
            <Input
              placeholder="Enter qty"
              className="h-10"
              type="number"
              value={capitalProduct.qty}
              onChange={({ target }) =>
                setCapitalProduct((prev) => ({ ...prev, qty: target.value }))
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="">Invoice Number</Label>
            <Input
              placeholder="Enter invoice number"
              className="h-10"
              type="text"
              value={capitalProduct.invoiceNumber}
              onChange={({ target }) =>
                setCapitalProduct((prev) => ({
                  ...prev,
                  invoiceNumber: target.value,
                }))
              }
            />
          </div>
        </div>

        <Button
          className="flex space-x-2 bg-[#1E1E1E] border border-dark text-white w-fit rounded-lg py-2 px-3 items-center justify-center text-xs disabled:opacity-70"
          type="button"
          disabled={
            !capitalProduct.invoiceNumber ||
            !capitalProduct.itemName ||
            !capitalProduct.price ||
            !capitalProduct.qty
          }
          onClick={handleAddCapitalProduct}
          pending={isPending}
          pendingText="Adding..."
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {isLoading ? (
        <p className="text-primary font-sm font-light italic p-2">
          Loading products...
        </p>
      ) : (
        <div className="border rounded-lg">
          {!data || data.data?.cart?.length === 0 ? (
            <EmptyComponent
              title="No Capital Product Added"
              description="There are no capital product added yet"
              className="mt-4 mb-4"
            />
          ) : (
            <React.Fragment>
              <div className="grid grid-cols-5 border p-2 gap-2 text-xs bg-[#EDF0FF] border-[#EDF0FF]">
                <p>Name</p>
                <p>Qty</p>
                <p>Rate</p>
                <p>Amount</p>
                <p>Inv. No.</p>
              </div>
              {data?.data?.cart?.map((field, index: number) => (
                <div key={field.id + index} className="space-y-2">
                  <div className="grid py-2 px-2 grid-cols-5 gap-2 border text-xs">
                    <p>{field.title}</p>
                    <p>{field.qty}</p>
                    <p>{formatCurrency(field.rate)}</p>
                    <p>{formatCurrency(field.amount)}</p>
                    <div className="flex justify-between w-full space-x-2">
                      <p className="truncate">{field.invoice_number}ghgfg</p>

                      <div className="flex space-x-2 items-center">
                        {isDeleting &&
                        selectedDocument === field.id.toString() ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2
                            onClick={() => {
                              setSelectedDocument(field.id.toString());
                              deleteDocument(field.id.toString());
                            }}
                            role="button"
                            className="text-destructive"
                            size={12}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
}
