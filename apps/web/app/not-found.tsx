import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500" />

      <h1 className="text-2xl font-bold">404 - Not Found</h1>

      <p className="text-gray-500">
        The page you are looking for does not exist.
      </p>

      <Link href="/" className="text-primary hover:underline">
        Go back home
      </Link>
    </div>
  );
}
