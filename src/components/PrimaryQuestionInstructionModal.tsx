import { type PropsWithChildren } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export default function PrimaryQuestionInstructionModal(
  props: PropsWithChildren,
) {
  return (
    <Dialog>
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogContent className='geist-normal h-9/10 overflow-y-auto text-xs'>
        <DialogHeader>
          <DialogTitle>Instructions</DialogTitle>
          <DialogDescription className='text-xs'>
            This instructions details how the ranking question can be attempted.
            The are two properties that need to be filled by the participant:
            Significancy and Scale Property
          </DialogDescription>
        </DialogHeader>
        <ImportancyInstructions />
        <ScaleInstructions />
      </DialogContent>
    </Dialog>
  );
}

function ImportancyInstructions() {
  return (
    <div>
      <h6 className='  font-semibold'>Significancy Property</h6>
      <p className=''>
        There are only two option for this property "A" or "B" with former means
        the subject is the more significant while later means the comparand is
        more significant. This is only important when the scale intensity of
        more that 1 (see below).
      </p>
    </div>
  );
}

function ScaleInstructions() {
  return (
    <div>
      <h6 className=' font-semibold'>Scale Property</h6>
      <p className=''>
        The table below details the possible values available for the the scale
        property.
      </p>
      <table className='collection-table'>
        <caption className='caption-bottom italic text-xs'>
          Sources: Saaty(2008)
        </caption>
        <tr className='collection-row'>
          <th>Scale</th>
          <th>Definition</th>
          <th>Explanation</th>
        </tr>

        <tr className='collection-row'>
          <td>1</td>
          <td>Equal importance</td>
          <td>Two elements contribute equally to the objective</td>
        </tr>
        <tr className='collection-row'>
          <td>3</td>
          <td>Moderate importance</td>
          <td>
            Experience and judgement slightly favour one element over another
          </td>
        </tr>
        <tr className='collection-row'>
          <td>5</td>
          <td>Strong importance</td>
          <td>
            Experience and judgement strongly favour one element over another
          </td>
        </tr>
        <tr className='collection-row'>
          <td>7</td>
          <td>Very strong or demonstrated importance</td>
          <td>
            An element is favoured very strongly over another; its dominance
            demonstrated in practice
          </td>
        </tr>
        <tr className='collection-row'>
          <td>9</td>
          <td>Extreme importance</td>
          <td>
            The evidence favouring one element over another is of the highest
            possible order of affirmation
          </td>
        </tr>
        <tr className='collection-row'>
          <td colSpan={3}>
            2, 4, 6, 8 can be used to express intermediate values
          </td>
        </tr>
      </table>
    </div>
  );
}
