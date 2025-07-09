import supabase from "@/data/supabase";
import type { RootState } from "@/lib/types";
import { validateSubmission } from "@/lib/utils";
import { ROUTE_NAMES } from "@/router";
import { setErrors, setFormSubmitted, setRetry } from "@/store/pageStore";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useSubmission() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { consentGiven, formSubmitted } = useSelector(
    (state: RootState) => state.page
  );

  const { criteriaRanking, participant } = useSelector(
    (state: RootState) => state.survey
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!consentGiven) {
        toast(
          "Consent has not been given. Please read the consent form and accept the form.",
          { duration: 5000 }
        );
        throw Error("Consent not given.");
      }

      if (formSubmitted) {
        dispatch(setRetry());
        return nav(ROUTE_NAMES.SUCCESS);
      }

      const results = validateSubmission({ participant, criteriaRanking });
      if (!results.success) {
        dispatch(setErrors(results.error.issues));
        toast("Some required field have not been properly filled.", {
          duration: 5000,
        });
        throw Error("Validation failed");
      }
      const res = await supabase.from("responses").insert({
        ...participant,
        details: criteriaRanking,
      });
      if (res.status !== 201) {
        throw new Error(res.error?.message);
      }
      dispatch(setFormSubmitted());
      nav(ROUTE_NAMES.SUCCESS);
    } catch (e) {
      await supabase.from("errors").insert({
        // @ts-expect-error
        message: e.toString(),
      });
    } finally {
      setIsLoading(false);
    }
  }, [criteriaRanking, participant, consentGiven]);
  return {
    isLoading,
    handleSubmit,
  };
}
