import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
}

export function SearchInput({ inputClassName, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        className={cn(
          'w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3',
          inputClassName
        )}
        type="search"
        {...props}
      />
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
