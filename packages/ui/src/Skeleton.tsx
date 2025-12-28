import { tv } from "tailwind-variants";

const skeleton = tv({
  base: "animate-pulse bg-level-three rounded",
});

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function Skeleton({
  width,
  height = 16,
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`${skeleton()} ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
}

export interface TableRowSkeletonProps {
  columns?: number;
}

export function TableRowSkeleton({ columns = 6 }: TableRowSkeletonProps) {
  return (
    <tr className="border-b border-border-primary last:border-b-0">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-5">
          <Skeleton width={i === 0 ? 60 : 120} />
        </td>
      ))}
    </tr>
  );
}
