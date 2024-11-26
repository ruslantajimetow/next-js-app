import { AlertCircle } from 'lucide-react';

export const FormError = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <div className="bg-destructive flex items-center p-2 my-3 gap-2 text-destructive-foreground">
      <AlertCircle className="w-4" />
      <span>{message}</span>
    </div>
  );
};
