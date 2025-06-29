import {
  criteria,
  importancyValue,
  intensityValue,
  type CriterionNodes,
} from '@/data';
import type { RootState } from '@/lib/types';
import { setCriteriaValue } from '@/store/surveyStore';
import {
  Fragment,
  memo,
  useCallback,
  useMemo,
  type PropsWithChildren,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCriterion from './AddCriterion';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Separator } from './ui/separator';

export default function PrimaryQuestion() {
  const criteriaTree = useSelector(
    (state: RootState) => state.survey.criteriaQuestion,
  );

  const criteriaEntries = useMemo(
    () => Object.entries(criteriaTree),
    [criteriaTree],
  );

  return (
    <Fragment>
      <div className='w-full  flex gap-4 capitalize font-medium'>
        <span className='w-32'>Subject</span>
        <div className='grow grid grid-cols-4 gap-4'>
          <span>Comparand</span>
          <span>Importancy</span>
          <span>Scale</span>
          <span></span>
        </div>
      </div>
      {criteriaEntries.map(([crit, values]) => (
        <CriteriaUI
          key={crit}
          subject={crit}
          values={values}
        />
      ))}
      <div className='w-full flex items-center justify-center my-8'>
        <AddCriterion />
      </div>
    </Fragment>
  );
}

function CriteriaUI(props: { subject: string; values: CriterionNodes }) {
  const { subject, values } = props;
  const comparands = useMemo(() => Object.entries(values), [values]);

  return (
    <Fragment>
      <div className='flex gap-4 my-4'>
        <span className='capitalize w-32'>
          <CriterionName criterion={subject} />
        </span>
        <div className='flex flex-col gap-4 grow'>
          {comparands.map(([comparand, rest], ix) => (
            <ComparativeCriterion
              key={comparand}
              subject={subject}
              comparand={comparand}
              border={ix === comparands.length - 1 ? false : true}
              {...rest}
            />
          ))}
        </div>
      </div>
      <Separator className='h-[0.5px]' />
    </Fragment>
  );
}

const ImportancyScaleUI = memo(ImportancyScale);
const IntensityScaleUI = memo(IntensityScale);

function ComparativeCriterion(props: ScaleProps) {
  const { border = true } = props;
  return (
    <div
      className={`grid grid-cols-4 gap-4 ${
        border && 'border-b border-dashed'
      } pb-2`}>
      <span className='capitalize'>
        <CriterionName criterion={props.comparand} />
      </span>
      <ImportancyScaleUI {...props} />
      <IntensityScaleUI {...props} />
      <OwnerTag>{props.owner}</OwnerTag>
    </div>
  );
}

interface ScaleProps {
  subject: string;
  comparand: string;
  border?: boolean;
  owner?: string;
}

function ImportancyScale(props: ScaleProps) {
  const { subject, comparand } = props;
  const type = 'importancy';
  const dispatch = useDispatch();
  const handleChange = useCallback(
    async (value: string) => {
      dispatch(setCriteriaValue({ subject, comparand, type, value }));
    },
    [subject, comparand, type, dispatch],
  );
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className='w-[60px]'>
        <SelectValue placeholder='Scale' />
      </SelectTrigger>
      <SelectContent>
        {importancyValue.map((d) => (
          <SelectItem
            key={d}
            value={d}>
            {d}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function IntensityScale(props: ScaleProps) {
  const { subject, comparand } = props;
  const type = 'scale';
  const dispatch = useDispatch();
  const handleChange = useCallback(
    (value: string) => {
      dispatch(setCriteriaValue({ subject, comparand, type, value }));
    },
    [subject, comparand, type, dispatch],
  );
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className='w-[60px]'>
        <SelectValue placeholder='Scale' />
      </SelectTrigger>
      <SelectContent>
        {intensityValue.map((d) => (
          <SelectItem
            key={d}
            value={String(d)}>
            {d}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function OwnerTag(props: PropsWithChildren) {
  return <Badge variant={'secondary'}>{props.children}</Badge>;
}

function CriterionName(props: { criterion: string }) {
  const name = criteria[props.criterion]
    ? criteria[props.criterion].name
    : props.criterion;
  return <span>{name}</span>;
}
