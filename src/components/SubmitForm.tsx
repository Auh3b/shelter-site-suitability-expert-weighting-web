import supabase from '@/data/supabase';
import type { RootState } from '@/lib/types';
import { LoaderCircle } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from './ui/button';

export default function SubmitForm() {
  const nav = useNavigate();
  const { criteriaQuestion, participant } = useSelector(
    (state: RootState) => state.survey,
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await supabase.from('responses').insert({
        ...participant,
        details: criteriaQuestion,
      });
      if (res.status !== 201) {
        console.log(res.error?.message);
        throw new Error('Something went wrong. Submission was unsuccessful.');
      }
      nav('successful-submission');
      toast('successful', { duration: 5000 });
    } catch (error) {
      console.log(error.message);
      toast(error.message, { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  }, [criteriaQuestion, participant]);
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
