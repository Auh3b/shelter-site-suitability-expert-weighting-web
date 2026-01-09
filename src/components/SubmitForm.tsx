import useSubmission from '@/hooks/useSubmission';
import { resetPageState } from '@/store/pageStore';
import { resetSurveyState } from '@/store/surveyStore';
import { LoaderCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Button } from './ui/button';

export default function SubmitForm() {
  const { isLoading, handleSubmit } = useSubmission();

  return (
    <div className='my-8 w-full flex flex-col gap-4'>
      <Button
        disabled={isLoading}
        onClick={handleSubmit}
        className='w-full button'>
        {isLoading && <LoaderCircle className='animate-spin' />}
        Submit Form
      </Button>

      <ClearForm />
    </div>
  );
}

function ClearForm() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(resetPageState());
    dispatch(resetSurveyState());
  };
  return (
    <Button
      variant={'outline'}
      onClick={handleClick}>
      Clear Form
    </Button>
  );
}
