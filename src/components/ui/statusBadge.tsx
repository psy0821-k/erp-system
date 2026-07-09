import { Badge } from '@/components/ui/badge';
import { getStatusBadgeClassName, StatusBadgeVariant } from '../badge';

interface StatusBadgeProps {
  label: string;
  variant: StatusBadgeVariant;
  className?: string;
}

export default function StatusBadge({ label, variant, className }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={getStatusBadgeClassName(variant, className)}>
      {label}
    </Badge>
  );
}
