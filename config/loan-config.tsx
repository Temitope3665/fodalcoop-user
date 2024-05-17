export const loanType: {
  type: string;
  name: string;
  loanType: { type: string }[];
  repaymentModel: { model: string }[];
}[] = [
  {
    type: 'cl',
    name: 'Cash Loan',
    loanType: [
      { type: '6 months' },
      { type: '12 months' },
      { type: '18 months' },
    ],
    repaymentModel: [{ model: 'Standard' }, { model: 'Self-determined' }],
  },
  {
    type: 'ml',
    name: 'Mortgage Loan',
    loanType: [{ type: 'Land' }],
    repaymentModel: [{ model: 'Standard' }, { model: 'Self-determined' }],
  },
  {
    type: 'cpl',
    name: 'Capital Loan',
    loanType: [{ type: 'Land' }],
    repaymentModel: [{ model: 'Standard' }, { model: 'Self-determined' }],
  },
  {
    type: 'gl',
    name: 'Grant',
    loanType: [{ type: 'Land' }],
    repaymentModel: [{ model: 'Standard' }, { model: 'Self-determined' }],
  },
];

export const duration = ['6 months', '12 months'];
