import { CheckCircle } from 'lucide-react';

export default function SuccessfulPage() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center gap-4'>
      <CheckCircle color='#5c834e' />
      <p>Form has been successfully been submitted!</p>
    </div>
  );
}
