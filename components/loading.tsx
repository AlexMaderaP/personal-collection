import { Spinner } from "@nextui-org/spinner";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
}
