import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Separator } from './components/ui/separator';

function App() {
  return (
    <div className='w-1/2 mx-auto'>
      <div className='my-4'>
        <h1 className='font-bold geist-title'>
          Evacuation Site Suitability Research: Criteria Ranking Questionaire
        </h1>
        <p></p>
      </div>
      <Separator />
      <div className='my-4'>
        <Label>Name</Label>
        <Input />
        <Label>Occupation</Label>
        <Input />
        <Label>Organisation</Label>
        <Input />
        <Label>Work Email</Label>
        <Input />
        <Label>Alternative Email</Label>
        <Input />
        <Label>Phone</Label>
        <Input />
      </div>
      <div className='my-4'>
        <p>Please rank the following criteria in order most significance.</p>
      </div>
    </div>
  );
}

export default App;
