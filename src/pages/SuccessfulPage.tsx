import { Button } from "@/components/ui/button";
import type { RootState } from "@/lib/types";
import { ROUTE_NAMES } from "@/router";
import { resetPageState } from "@/store/pageStore";
import { resetSurveyState } from "@/store/surveyStore";
import { CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SuccessfulPage() {
  const { formSubmitted, submittedTries } = useSelector(
    (state: RootState) => state.page
  );
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(resetPageState());
    dispatch(resetSurveyState());
    nav(ROUTE_NAMES.HOME);
  };
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center gap-4'>
      <CheckCircle color='#5c834e' />
      {Boolean(formSubmitted && submittedTries) ? (
        <div className='flex flex-col gap-4 items-center'>
          <p>You have already submitted an entry.</p>
          <Button onClick={handleReset} className='button'>
            resubmit?
          </Button>
        </div>
      ) : (
        <p>Form has been successfully been submitted!</p>
      )}
    </div>
  );
}
