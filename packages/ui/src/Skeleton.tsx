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
