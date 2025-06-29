import { type PropsWithChildren } from 'react';
import {
  Dialog,
  DialogContent,
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
      <DialogContent className='geist-normal'>
        <DialogHeader>
          <DialogTitle>Instructions</DialogTitle>
        </DialogHeader>
        <table className='collection-table'>
          <caption className='caption-bottom italic'>
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
            <td>Two activities contribute equally to the objective</td>
          </tr>
          <tr className='collection-row'>
            <td>3</td>
            <td>Moderate importance</td>
            <td>
              Experience and judgement slightly favour one activity over another
            </td>
          </tr>
          <tr className='collection-row'>
            <td>5</td>
            <td>Strong importance</td>
            <td>
              Experience and judgement strongly favour one activity over another
            </td>
          </tr>
          <tr className='collection-row'>
            <td>7</td>
            <td>Very strong or demonstrated importance</td>
            <td>
              An activity is favoured very strongly over another; its dominance
              demonstrated in practice
            </td>
          </tr>
          <tr className='collection-row'>
            <td>9</td>
            <td>Extreme importance</td>
            <td>
              The evidence favouring one activity over another is of the highest
              possible order of affirmation
            </td>
          </tr>
          <tr className='collection-row'>
            <td colSpan={3}>
              2, 4, 6, 8 can be used to express intermediate values
            </td>
          </tr>
        </table>
      </DialogContent>
    </Dialog>
  );
}
