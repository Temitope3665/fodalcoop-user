// import { Input } from '@/components/ui/input';
// import { cn } from '@/lib/utils';

// export interface SearchInputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   inputClassName?: string;
// }

// export function SearchInput({ inputClassName, ...props }: SearchInputProps) {
//   return (
//     <div className="relative">
//       <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//       <Input
//         className={cn(
//           'w-full appearance-none bg-background pl-12 shadow-none md:w-2/3 lg:w-1/3',
//           inputClassName
//         )}
//         type="search"
//         {...props}
//       />
//     </div>
//   );
// }

'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from './input';
import { cn } from '@/lib/utils';

export default function SearchInput({
  placeholder,
  classNames,
  queryKey,
}: {
  placeholder: string;
  classNames?: string;
  queryKey?: string;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(queryKey || 'search', term);
    } else {
      params.delete(queryKey || 'search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        className={cn(
          'peer block w-full rounded-md border pl-8 border-gray-200 h-10 text-sm outline-2 placeholder:text-gray-500',
          classNames
        )}
        placeholder={placeholder}
        type="search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get(queryKey || 'search')?.toString()}
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
