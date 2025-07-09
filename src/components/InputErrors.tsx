import type { RootState } from "@/lib/types";
import { resetErrors } from "@/store/pageStore";
import { flatGroup } from "d3-array";
import { X as CloseIcon } from "lucide-react";
import { Fragment, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const ERROR_GROUPS_NAMES = {
  participant: "Participant Information",
  criteriaRanking: "Criteria Ranking",
};

export default function InputErrors() {
  const _errors = useSelector((state: RootState) => state.page.errors);
  const errors = useMemo(() => {
    if (!_errors) return null;
    return flatGroup(_errors, (v) => v.path[0]);
  }, [_errors]);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(resetErrors());
  };
  return (
    <Fragment>
      {errors && (
        <div className='rounded-md my-8 bg-red-300 p-4 text-red-900'>
          <div className='flex justify-between items-center border-red-800 border-b pb-1 mb-4'>
            <span>Input Errors</span>
            <Button variant={"ghost"} onClick={handleClose}>
              <CloseIcon />
            </Button>
          </div>
          <Separator
            className='border-red-500 my-4 bg-red-800'
            orientation={"horizontal"}
          />
          {errors.map(([group, issues]) => (
            <div key={`${group}-issues`}>
              <span className='font-medium text-sm'>
                {/* @ts-ignore */}
                {ERROR_GROUPS_NAMES[group] || group}
              </span>
              <ul className='text-xs list-disc pl-5'>
                {issues.map(({ path, message }) => (
                  <li key={path.join("-")} className='mt-1'>
                    {path.join("->")}: {message}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
}
