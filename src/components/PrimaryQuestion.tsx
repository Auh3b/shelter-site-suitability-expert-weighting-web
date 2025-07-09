import {
  generateCriteriaLookup,
  generateCriteriaSurveyTree,
  importancyValue,
  intensityValue,
} from '@/data';
import type {
  CriterionNodes,
  CriterionSupabase,
  Importancy,
  RootState,
  Scale,
} from '@/lib/types';
import {
  setCriteria,
  setCriteriaLookup,
  setCriterionImportancy,
  setCriterionScale,
} from '@/store/surveyStore';
import { Info, LoaderIcon } from 'lucide-react';
import { Fragment, memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import AddCriterion from './AddCriterion';
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
  const dispatch = useDispatch();
  const dataload = useLoaderData<CriterionSupabase[]>();

  useEffect(() => {
    if (dataload && !criteriaTree) {
      const tree = dataload ? generateCriteriaSurveyTree(dataload) : {};
      const lookup = generateCriteriaLookup(dataload);
      dispatch(setCriteriaLookup(lookup));
      dispatch(setCriteria(tree));
    }
  }, [dataload, criteriaTree, dispatch]);

  const criteriaEntries = useMemo(
    () => (criteriaTree ? Object.entries(criteriaTree) : false),
    [criteriaTree, dataload],
  );

  return (
    <Fragment>
      {criteriaEntries ? (
        <div>
          <div className='w-full  flex gap-4 capitalize font-medium text-sm'>
            <span className='w-44'>Subject</span>
            <div className='grow grid grid-cols-3 gap-4'>
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
        </div>
      ) : (
        <LoadingCriteriaInput />
      )}
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
        <span className='w-44'>
          <CriterionName criterion={subject} />
        </span>
        <div className='flex flex-col gap-4'>
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
      className={`flex justify-between gap-8 ${
        border && 'border-b border-dashed'
      } pb-2`}>
      <span className=' w-48'>
        <CriterionName criterion={props.comparand} />
      </span>
      <ImportancyScaleUI {...props} />
      <IntensityScaleUI {...props} />
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
  const dispatch = useDispatch();
  const _value = useSelector(
    (state: RootState) => state.survey.criteriaRanking,
  );
  const value = useMemo(() => {
    if (_value) return _value[subject][comparand].importancy;
  }, [_value]);
  const handleChange = useCallback(
    (value: string) => {
      dispatch(
        setCriterionImportancy({
          subject,
          comparand,
          value: value as Importancy,
        }),
      );
    },
    [subject, comparand, dispatch],
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
  const dispatch = useDispatch();
  const _value = useSelector(
    (state: RootState) => state.survey.criteriaRanking,
  );
  const value = useMemo(() => {
    if (_value) return _value[subject][comparand].scale;
  }, [_value]);
  const handleChange = useCallback(
    (value: string) => {
      dispatch(
        setCriterionScale({ subject, comparand, value: value as Scale }),
      );
    },
    [subject, comparand, dispatch],
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
  const criteria = useSelector(
    (state: RootState) => state.survey.criteriaLookup,
  );
  const citation = useMemo(() => {
    if (!criterion || !criteria || !criteria[criterion]) return null;
    return criteria[criterion].description;
  }, [criterion, criteria]);
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
        <PopoverContent
          side={'right'}
          className='text-xs'>
          {citation}
        </PopoverContent>
      </Popover>
    </div>
  );
}

function CriterionName(props: { criterion: string }) {
  const { criterion } = props;
  const criteria = useSelector(
    (state: RootState) => state.survey.criteriaLookup,
  );
  const name = useMemo(() => {
    if (!criterion || !criteria || !criteria[criterion]) return null;
    return criteria[criterion].label;
  }, [criterion, criteria]);
  return (
    <span className='flex items-center gap-1 text-sm'>
      {name}
      <CitationPopover {...props} />
    </span>
  );
}

function LoadingCriteriaInput() {
  return (
    <div className='w-full flex flex-col items-center justify-center my-8'>
      <span className='ml-2 text-muted-foreground animate-spin'>
        <LoaderIcon />
      </span>
      <span className='text-muted-foreground'>Loading criteria</span>
    </div>
  );
}
