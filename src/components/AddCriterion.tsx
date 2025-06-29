import { setCriterion } from '@/store/surveyStore';
import { Plus } from 'lucide-react';
import { useCallback, useState, type ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';

export default function AddCriterion() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const handleSubmit = useCallback(() => {
    if (value) {
      dispatch(setCriterion(value));
      setValue('');
      return setOpen(false);
    }
    toast('Please enter criterion value', {
      duration: 3000,
      cancel: {
        label: 'close',
        onClick: () => {},
      },
    });
  }, [value]);
  return (
    <Dialog
      modal={false}
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          Add Criterion <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Criterion</DialogTitle>
        </DialogHeader>
        <Input
          value={value}
          onChange={handleChange}
        />
        <DialogFooter>
          <Button
            type='button'
            onClick={handleSubmit}
            variant={'secondary'}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
