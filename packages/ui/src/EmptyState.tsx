import type { ReactNode, ComponentType, SVGProps } from "react";
import { Typography } from "./Typography";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      {Icon && (
        <div className="mb-4 text-disable-primary">
          <Icon className="h-16 w-16" />
        </div>
      )}
      <Typography variant="200-medium" color="primary" className="mb-2">
        {title}
      </Typography>
      {description && (
        <Typography
          variant="100-light"
          color="tertiary"
          className="mb-6 max-w-sm"
        >
          {description}
        </Typography>
      )}
      {action && (
        <Button hierarchy="primary" size="medium" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
}

export type { EmptyStateProps };
