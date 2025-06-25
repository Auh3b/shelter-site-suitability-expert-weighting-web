import { Separator } from './ui/separator';

export default function Introduction() {
  return (
    <div className='my-4'>
      <h1 className='font-bold geist-title uppercase text-3xl mb-6'>
        Evacuation Site Suitability Research: Criteria Ranking Questionaire
      </h1>
      <div className='flex flex-col gap-4 text-sm'>
        <p>
          I am a postgraduate student at the University of Zambia. I am
          administering a questionnaire for my research, which aims to identify
          suitable areas for establishing evacuation facilities for individuals
          displaced by floods.
        </p>
        <p>
          You are kindly invited to voluntarily participate in a questionnaire,
          which will require approximately 30 minutes of your time.
        </p>
        <p>
          The information you provide will only be used for this research and
          will be treated with strict confidentiality.
        </p>
        <p>
          Your details will be recorded but will not be shared or published. You
          do not need to answer any questions that you would prefer not to
          answer. Your help with this research would be greatly appreciated.
        </p>
      </div>
      <Separator className='mt-8' />
    </div>
  );
}
