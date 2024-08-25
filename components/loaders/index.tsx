import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

export function MessagesLoading({ columns }: { columns?: number }) {
  return (
    <div className="space-y-4 py-4">
      {Array.from({ length: columns || 12 }, (_, index) => (
        <div>
          <Skeleton key={index} className="w-full h-6" />
        </div>
      ))}
    </div>
  );
}

export function DGuarantorRequestLoading({ columns }: { columns?: number }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: columns || 3 }, (_, index) => (
        <Skeleton key={index} className="w-full h-36" />
      ))}
    </div>
  );
}

export function ProfileLoading() {
  return (
    <div className="space-y-4 py-4">
      <Skeleton className="w-full h-48" />
    </div>
  );
}

export const TableSkeleton = ({
  className,
  columns,
}: {
  className?: string;
  columns?: number;
}) => {
  return (
    <div className={cn('w-full p-4', className)}>
      <Skeleton className="h-14 rounded-none" />
      <>
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="flex gap-x-6 space-y-2 w-full">
              {Array(columns || 5)
                .fill(null)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-full h-8 rounded-none my-2"
                  />
                ))}
            </div>
          ))}
      </>
    </div>
  );
};
