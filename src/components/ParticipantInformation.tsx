import type { RootState } from '@/lib/types';
import { setParticipantValue } from '@/store/surveyStore';
import { Label } from '@radix-ui/react-label';
import { useMemo, type ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from './ui/input';

const _participantInformation = [
  { required: true, key: 'name', label: 'Name' },
  { required: true, key: 'occupation', label: 'Occupation' },
  { required: true, key: 'organisation', label: 'Organisation' },
  { required: true, key: 'work_email', label: 'Work Email' },
  { required: false, key: 'alternative_email', label: 'Alternative Email' },
  { required: true, key: 'phone', label: 'phone' },
];

export default function ParticipantInformation() {
  return (
    <div>
      <p className='font-semibold text-xl mb-4'>Participant Information</p>
      <div className='flex flex-col gap-6'>
        {_participantInformation.map(({ label, key, ...rest }) => (
          <InformationInput
            keyName={key}
            key={key}
            label={label}
            {...rest}
          />
        ))}
      </div>
    </div>
  );
}

interface InformationInputProps {
  keyName: string;
  label: string;
  required?: boolean;
}

function InformationInput(props: InformationInputProps) {
  const { keyName, label, required } = props;
  const dispatch = useDispatch();
  const participant = useSelector(
    (state: RootState) => state.survey.participant,
  );
  const value = useMemo(
    () => participant[keyName] || '',
    [participant, keyName],
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setParticipantValue({
        keyName,
        value: e.currentTarget.value,
      }),
    );
  };

  return (
    <div className='flex flex-col gap-2'>
      <Label className='capitalize'>
        {label} {required && '*'}
      </Label>
      <Input
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}
