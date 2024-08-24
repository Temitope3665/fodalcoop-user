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
