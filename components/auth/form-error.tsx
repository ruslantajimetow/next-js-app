import { AlertCircle } from 'lucide-react';

export const FormError = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <div className="bg-destructive text-destructive-foreground">
      <AlertCircle className="w-4" />
      <span>{message}</span>
    </div>
  );
};
