import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const CheckIcon = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'bg-primary w-3 h-3 rounded-full flex items-center justify-center',
      className
    )}
  >
    <Check className="text-white" size={16} />
  </div>
);

export default CheckIcon;
