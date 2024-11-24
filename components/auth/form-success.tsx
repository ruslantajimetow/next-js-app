import { CheckCircle } from 'lucide-react';

export const FormSuccess = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <div className="bg-teal-400 text-foreground">
      <CheckCircle className="w-4" />
      <span>{message}</span>
    </div>
  );
};
