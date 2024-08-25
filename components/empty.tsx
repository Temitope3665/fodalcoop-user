import Image from 'next/image';
import EmptyIcon from '@/assets/icons/empty-data.png';
import { cn } from '@/lib/utils';

export default function EmptyComponent({
  title,
  className,
  description,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn('text-center mt-20', className)}>
      <Image
        src={EmptyIcon}
        alt="Empty data"
        width={40}
        height={40}
        className="mx-auto"
      />
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs font-light">{description}</p>
    </div>
  );
}
