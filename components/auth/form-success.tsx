import { CheckCircle } from 'lucide-react';

export const FormSuccess = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <div className="bg-teal-400 flex items-center p-2 my-3 gap-2 text-foreground">
      <CheckCircle className="w-4" />
      <span>{message}</span>
    </div>
  );
};
