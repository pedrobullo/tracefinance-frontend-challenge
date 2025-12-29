import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Typography,
  Badge,
} from "@repo/ui";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>
            <Badge variant="success">Active</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>
            <Badge variant="warning">Pending</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Wilson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>
            <Badge variant="error">Inactive</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const TransactionsTable: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell width="w-1/4">
            <Typography variant="75-light" color="tertiary">
              Date
            </Typography>
          </TableHeaderCell>
          <TableHeaderCell width="w-1/4">
            <Typography variant="75-light" color="tertiary">
              Recipient
            </Typography>
          </TableHeaderCell>
          <TableHeaderCell width="w-1/4">
            <Typography variant="75-light" color="tertiary">
              Amount
            </Typography>
          </TableHeaderCell>
          <TableHeaderCell width="w-1/4">
            <Typography variant="75-light" color="tertiary">
              Status
            </Typography>
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Typography variant="100-light" color="primary">
              Dec 28, 2024
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="100-light" color="primary">
              Maria Silva
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="100-medium" color="primary">
              R$ 1.500,00
            </Typography>
          </TableCell>
          <TableCell>
            <Badge variant="success">Completed</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="100-light" color="primary">
              Dec 27, 2024
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="100-light" color="primary">
              João Santos
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="100-medium" color="primary">
              R$ 750,00
            </Typography>
          </TableCell>
          <TableCell>
            <Badge variant="warning">Processing</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const EmptyTable: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell className="text-center">
            <Typography variant="100-light" color="tertiary">
              No data available
            </Typography>
          </TableCell>
          <TableCell>{""}</TableCell>
          <TableCell>{""}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
