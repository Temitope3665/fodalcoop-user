import { Skeleton } from '../ui/skeleton';

export function MessagesLoading({ columns }: { columns?: number }) {
  return (
    <div className="space-y-4 py-4">
      {Array.from({ length: columns || 12 }, (_, index) => (
        <Skeleton key={index} className="w-full h-6" />
      ))}
    </div>
  );
}
