import type { RootState } from '@/lib/types';
import { flatGroup } from 'd3-array';
import { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';

const ERROR_GROUPS_NAMES = {
  participant: 'Participant Information',
  criteriaRanking: 'Criteria Ranking',
};

export default function InputErrors() {
  const _errors = useSelector((state: RootState) => state.page.errors);
  const errors = useMemo(() => {
    if (!_errors) return null;
    return flatGroup(_errors, (v) => v.path[0]);
  }, [_errors]);
  return (
    <Fragment>
      {errors && (
        <div className='rounded-md my-8 bg-red-300 p-4 text-red-900'>
          {errors.map(([group, issues]) => (
            <div key={`${group}-issues`}>
              <span className='font-medium text-sm'>
                {/* @ts-ignore */}
                {ERROR_GROUPS_NAMES[group] || group}
              </span>
              <ul className='text-xs list-disc pl-5'>
                {issues.map(({ path, message }) => (
                  <li
                    key={path.join('-')}
                    className='mt-1'>
                    {path.join('->')}: {message}
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
