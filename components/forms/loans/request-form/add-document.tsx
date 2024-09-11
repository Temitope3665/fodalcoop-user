import EmptyComponent from '@/components/empty';
import ShowError from '@/components/showError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  addMortgageDocument,
  deleteMortgageDocument,
  getMortgageDocument,
} from '@/config/apis/loans';
import { LOAN_MORTGAGE_KEY } from '@/lib/query-keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ExternalLink, Loader2, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface IAddDocument {
  form: any;
  watchLoanAmount: string;
}

export default function AddDocument({ form, watchLoanAmount }: IAddDocument) {
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [customErrorField, setCustomErrorField] = React.useState<string>('');
  const queryClient: any = useQueryClient();
  const [document, setDocument] = useState<{
    image: File | undefined;
    title: string;
  }>({ image: undefined, title: '' });

  const { data, isLoading, isError, error } = useQuery({
    queryFn: getMortgageDocument,
    queryKey: [LOAN_MORTGAGE_KEY],
    enabled: !!watchLoanAmount,
  });

  useEffect(() => {
    if (data) {
      form.setValue('documents', data);
    }
  }, [isLoading, data]);

  console.log(form.getValues('documents'), '-> data');

  const { mutate, isPending } = useMutation({
    mutationFn: addMortgageDocument,
    onSuccess: async () => {
      queryClient.invalidateQueries(LOAN_MORTGAGE_KEY);
      toast.success('Document added successfully');
      setDocument({ image: undefined, title: '' });
    },
    onError: (error: any) =>
      setCustomErrorField(error?.response?.data?.message || 'An error occured'),
  });

  const { mutate: deleteDocument, isPending: isDeleting } = useMutation({
    mutationFn: deleteMortgageDocument,
    onSuccess: async () => {
      await queryClient.invalidateQueries(LOAN_MORTGAGE_KEY);
      toast.success('Document removed successfully');
    },
    onError: (error: any) =>
      setCustomErrorField(error?.response?.data?.message || 'An error occured'),
  });

  const handleAddDocument = () => {
    if (document.image && document.title) {
      mutate(document);
    }
  };

  useEffect(() => {
    if (error) {
      setCustomErrorField('An error occured while accessing the server');
    }
  }, [isError]);

  return (
    <div className="space-y-2 w-full">
      <ShowError
        errorMessage={customErrorField}
        setErrorMessage={setCustomErrorField}
      />
      <Label>Add documents</Label>
      <div className="grid grid-cols-1 gap-2">
        <Input
          className="h-10"
          placeholder="File name"
          value={document.title}
          onChange={({ target }) =>
            setDocument((prev) => ({ ...prev, title: target.value }))
          }
        />

        <Input
          type="file"
          className="h-10"
          placeholder=""
          accept=".jpg, .jpeg, .png, .pdf"
          onChange={(e: any) => {
            const file = e.target.files[0];
            setDocument((prev) => ({ ...prev, image: file }));
          }}
        />
      </div>

      <Button
        className="flex space-x-2 bg-[#1E1E1E] border border-dark text-white w-fit rounded-lg py-2 px-3 items-center justify-center text-xs disabled:opacity-70"
        type="button"
        disabled={!document.image || !document.title}
        onClick={handleAddDocument}
        pending={isPending}
        pendingText="Adding..."
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Document
      </Button>

      {isLoading ? (
        <p className="text-primary font-sm font-light italic p-2">
          Loading Document...
        </p>
      ) : (
        <div className="border rounded-lg">
          {!data || data.length === 0 ? (
            <EmptyComponent
              title="No Document Added"
              description="There are no document added yet"
              className="mt-4 mb-4"
            />
          ) : (
            <React.Fragment>
              <div className="grid grid-cols-2 gap-4 border px-4 py-2 bg-[#EDF0FF] border-[#EDF0FF] text-xs">
                <p>Title</p>
                <p>Document</p>
              </div>
              {data?.map((field, index: number) => (
                <div key={field.id + index} className="space-y-2">
                  <div className="grid py-2 px-4 grid-cols-2 gap-4 border text-xs">
                    <div className="flex space-x-2 items-center">
                      <p className="col-span-0.5">{index + 1}.</p>
                      <p>{field.title}</p>
                    </div>
                    <div className="flex justify-between w-full">
                      <Link href={field.file_path} target="_blank">
                        <div className="flex space-x-2 items-center text-sm">
                          <p className="text-xs">Link</p>
                          <ExternalLink size={16} strokeWidth={1} />
                        </div>
                      </Link>

                      <div className="flex space-x-2 items-center">
                        <Trash2
                          onClick={() => {
                            setSelectedDocument(field.id);
                            deleteDocument(field.id);
                          }}
                          role="button"
                          className="text-destructive"
                          size={16}
                        />
                        {isDeleting && selectedDocument === field.id && (
                          <Loader2 className="h-4 w-4 animate-spin" />
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
