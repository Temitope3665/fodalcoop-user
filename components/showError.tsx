import { capitalizeFirstLetter } from '@/lib/utils';
import { TriangleAlert, X } from 'lucide-react';

export default function ShowError({
  errorMessage,
  setErrorMessage,
}: {
  errorMessage: string;
  setErrorMessage: (arg: string) => void;
}) {
  return (
    <div className="w3-animate-opacity">
      {errorMessage && (
        <div className="text-sm animate-caret-non-blink text-[#E50101] max-h-[100px] px-4 border border-destructive rounded-md justify-between py-2 overflow-y-auto bg-[#FEEFF0] flex items-start space-x-2">
          <div className="flex space-x-4">
            <TriangleAlert size={18} />
            <p>{errorMessage}</p>
          </div>
          <X size={16} role="button" onClick={() => setErrorMessage('')} />
        </div>
      )}
    </div>
  );
}

export const ErrorMessages = ({
  errors,
  setErrors,
}: {
  errors: any;
  setErrors: (arg: any) => void;
}) => {
  // Convert the error object into an array of messages
  if (errors) {
    const errorMessages: string[] = Object.entries(errors).flatMap(
      ([field, messages]: any) =>
        messages.map(
          (message: string) => `${capitalizeFirstLetter(field)}: ${message}`
        )
    );

    return (
      <div className="text-sm animate-caret-non-blink justify-between text-[#E50101] border border-destructive rounded-md px-4 py-2 max-h-[300px] overflow-y-auto bg-[#FEEFF0] flex items-start space-x-2">
        <div className="flex space-x-2 items-center">
          <TriangleAlert size={18} />
          <div>
            {errorMessages.map((msg, index) => (
              <p key={index} className="text-sm font-light">
                {msg}
              </p>
            ))}
          </div>
        </div>
        <X size={16} role="button" onClick={() => setErrors(null)} />
      </div>
    );
  } else {
    return null;
  }
};
