import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Typography, Button } from "@repo/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500" />

      <Typography as="h1" variant="400-medium" color="primary">
        404 - Not Found
      </Typography>

      <Typography variant="200-medium" color="tertiary">
        The page you are looking for does not exist.
      </Typography>

      <Link href="/">
        <Button hierarchy="primary" size="medium">
          Go back home
        </Button>
      </Link>
    </div>
  );
}
