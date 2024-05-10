import { icons } from 'lucide-react';

interface LucideIconSet {
  [key: string]: React.ComponentType<any>;
}

export type IconProps = {
  name: string | number | symbol | undefined;
  className?: string;
  color?: string;
  size?: number;
};

export function Icon({ name, color, size, className }: IconProps) {
  const LucideIconSet: LucideIconSet = icons;

  const LucideIcon = LucideIconSet[name as string];

  if (!LucideIcon) {
    console.error(`Icon '${String(name)}' not found`);
    return 'ChevronRight'; // Or some default icon
  }

  return <LucideIcon className={className} color={color} size={size} />;
}
