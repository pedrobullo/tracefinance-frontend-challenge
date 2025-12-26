import {
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
  forwardRef,
  type ReactNode,
} from "react";

// Table Root
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className = "", ...props }, ref) => (
    <div className="w-full overflow-x-auto">
      <table
        ref={ref}
        className={`w-full border-collapse ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);
Table.displayName = "Table";

// Table Header
export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ children, className = "", ...props }, ref) => (
  <thead ref={ref} className={className} {...props}>
    {children}
  </thead>
));
TableHeader.displayName = "TableHeader";

// Table Body
export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className = "", ...props }, ref) => (
    <tbody ref={ref} className={className} {...props}>
      {children}
    </tbody>
  )
);
TableBody.displayName = "TableBody";

// Table Row
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  hoverable?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, hoverable = true, className = "", ...props }, ref) => (
    <tr
      ref={ref}
      className={`
        border-b border-light-border dark:border-dark-border
        ${hoverable ? "hover:bg-gray-50 dark:hover:bg-dark-card transition-colors" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </tr>
  )
);
TableRow.displayName = "TableRow";

// Table Head Cell
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ children, className = "", ...props }, ref) => (
    <th
      ref={ref}
      className={`
        px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider
        bg-gray-50 dark:bg-dark-card
        ${className}
      `}
      {...props}
    >
      {children}
    </th>
  )
);
TableHead.displayName = "TableHead";

// Table Cell
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className = "", ...props }, ref) => (
    <td
      ref={ref}
      className={`
        px-4 py-3 text-sm text-text-primary dark:text-text-inverse
        ${className}
      `}
      {...props}
    >
      {children}
    </td>
  )
);
TableCell.displayName = "TableCell";
