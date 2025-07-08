import { criteria, importancyValue, intensityValue } from '@/data';
import type { CriterionNodes, RootState } from '@/lib/types';
import { setCriteriaValue } from '@/store/surveyStore';
import { Info } from 'lucide-react';
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
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
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
    (state: RootState) => state.survey.criteriaRanking,
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
          <span>Significancy</span>
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
  const _value = useSelector(
    (state: RootState) => state.survey.criteriaRanking,
  );
  const value = useMemo(() => _value[subject][comparand].importancy, [_value]);
  const handleChange = useCallback(
    async (value: string) => {
      dispatch(setCriteriaValue({ subject, comparand, type, value }));
    },
    [subject, comparand, type, dispatch],
  );

  return (
    <Select
      value={value}
      onValueChange={handleChange}>
      <SelectTrigger className='w-[60px]'>
        <SelectValue placeholder='A/B' />
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
  const _value = useSelector(
    (state: RootState) => state.survey.criteriaRanking,
  );
  const value = useMemo(() => _value[subject][comparand].scale, [_value]);
  const handleChange = useCallback(
    (value: string) => {
      dispatch(setCriteriaValue({ subject, comparand, type, value }));
    },
    [subject, comparand, type, dispatch],
  );
  return (
    <Select
      value={value}
      onValueChange={handleChange}>
      <SelectTrigger className='w-[60px]'>
        <SelectValue placeholder='0' />
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

function CitationPopover(props: { criterion?: string }) {
  const { criterion } = props;
  const citation = useMemo(() => {
    if (!criterion || !criteria[criterion] || !criteria[criterion].citation)
      return null;
    return criteria[criterion].citation.authors;
  }, []);
  return (
    <div className='self-start'>
      <Popover>
        <PopoverTrigger asChild>
          <Info
            color='#525252'
            size={12}
            className='button'
          />
        </PopoverTrigger>
        <PopoverContent side={'left'}>{citation}</PopoverContent>
      </Popover>
    </div>
  );
}

function OwnerTag(props: PropsWithChildren) {
  return <Badge variant={'secondary'}>{props.children}</Badge>;
}

function CriterionName(props: { criterion: string }) {
  const name = criteria[props.criterion]
    ? criteria[props.criterion].name
    : props.criterion;
  return (
    <span className='flex items-center gap-1'>
      {name}
      <CitationPopover {...props} />
    </span>
  );
}
