import Image from 'next/image';
import EmptyIcon from '@/assets/icons/empty-data.png';

export default function EmptyComponent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center mt-20">
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
