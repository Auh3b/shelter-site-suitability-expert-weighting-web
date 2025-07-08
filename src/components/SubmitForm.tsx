import useSubmission from '@/hooks/useSubmission';
import { LoaderCircle } from 'lucide-react';
import { Button } from './ui/button';

export default function SubmitForm() {
  const { isLoading, handleSubmit } = useSubmission();

  return (
    <div className='my-8 w-full'>
      <Button
        disabled={isLoading}
        onClick={handleSubmit}
        className='w-full button'>
        {isLoading && <LoaderCircle className='animate-spin' />}
        Submit Form
      </Button>
    </div>
  );
}
