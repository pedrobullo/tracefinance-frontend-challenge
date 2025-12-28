"use client";

import { type ReactNode } from "react";
import { tv } from "tailwind-variants";

const table = tv({
  slots: {
    wrapper: "w-full overflow-x-auto",
    table: "w-full",
    thead: "",
    tbody: "",
    tr: "border-b border-border-primary last:border-b-0",
    th: "px-6 py-2 text-left",
    td: "px-6 py-5",
  },
});

export interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className = "" }: TableProps) {
  const styles = table();
  return (
    <div className={`${styles.wrapper()} ${className}`}>
      <table className={styles.table()}>{children}</table>
    </div>
  );
}

export interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

export function TableHead({ children, className = "" }: TableHeadProps) {
  const styles = table();
  return <thead className={`${styles.thead()} ${className}`}>{children}</thead>;
}

export interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export function TableBody({ children, className = "" }: TableBodyProps) {
  const styles = table();
  return <tbody className={`${styles.tbody()} ${className}`}>{children}</tbody>;
}

export interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export function TableRow({ children, className = "" }: TableRowProps) {
  const styles = table();
  return <tr className={`${styles.tr()} ${className}`}>{children}</tr>;
}

export interface TableHeaderCellProps {
  children: ReactNode;
  width?: string;
  className?: string;
}

export function TableHeaderCell({
  children,
  width,
  className = "",
}: TableHeaderCellProps) {
  const styles = table();
  return (
    <th className={`${styles.th()} ${width || ""} ${className}`}>{children}</th>
  );
}

export interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export function TableCell({ children, className = "" }: TableCellProps) {
  const styles = table();
  return <td className={`${styles.td()} ${className}`}>{children}</td>;
}
