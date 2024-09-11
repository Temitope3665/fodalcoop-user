import { z } from 'zod';

const repaymentSchema = z.object({
  month: z.string(),
  amount: z.string(),
  monthId: z.string().optional(),
});

const capitalLoanProduct = z.object({
  amount: z.any(),
  invoice_number: z.any(),
  rate: z.any(),
  qty: z.any(),
  title: z.any(),
});

const documentSchema = z.object({
  file_path: z.any({ message: 'Image is required' }),
  title: z.string({ message: 'Title is required' }),
});

export const loanFormSchema = z
  .object({
    loanType: z.string().min(1, { message: 'Loan type is required' }),
    loanProduct: z.string({ message: 'Loan product is required' }),
    noOfMonth: z.string().optional(),
    repaymentModel: z
      .string()
      .min(1, { message: 'Repayment model is required' }),
    amount: z.string().min(1, { message: 'Amount is required' }),
    interest: z.string().min(1, { message: 'Loan interest is required' }),
    totalLoan: z.string({ message: 'Total loan is required' }),
    total: z.string().optional(),
    repayment_plan: z.array(repaymentSchema).optional(),
    capital_loan_product: z.array(capitalLoanProduct),
    documents: z.array(documentSchema),
  })
  .refine((data) => {
    if (data.loanType && JSON.parse(data.loanType).name === 'Mortgage Loan') {
      data.documents.map((doc: any, index: number) => {
        if (!doc.file_path) {
          throw new z.ZodError([
            {
              code: 'custom',
              path: ['file_path', index],
              message: 'Image is required',
            },
          ]);
        }
        if (!doc.title) {
          throw new z.ZodError([
            {
              code: 'custom',
              path: ['title', index],
              message: 'Title is required',
            },
          ]);
        }
      });
    }
    return true;
  });
