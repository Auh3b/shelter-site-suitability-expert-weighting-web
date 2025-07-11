import Footer from '@/components/Footer';
import InputErrors from '@/components/InputErrors';
import Introduction from '@/components/Introduction';
import ParticipantConsent from '@/components/ParticipantConsent';
import ParticipantInformation from '@/components/ParticipantInformation';
import PrimaryQuestion from '@/components/PrimaryQuestion';
import PrimaryQuestionInstructionModal from '@/components/PrimaryQuestionInstructionModal';
import SubmitForm from '@/components/SubmitForm';
export default function Home() {
  return (
    <div>
      {' '}
      <div className='px-8 lg:px-16 w-full lg:w-1/2 mx-auto geist-normal'>
        {/* <Header /> */}
        <Introduction />
        <ParticipantInformation />
        <h5 className='section mt-8'>Criteria Ranking</h5>
        <div className='my-4'>
          <p className='text-sm text-muted-foreground'>
            The form below contains a set of criteria for identifying suitable
            sites for establishing shelters for flood victims. These criteria
            are structured as pairs of subjects and comparands. Each comparand
            must be compared against its corresponding subject to determine the
            relative level of significance. For more information on the
            Significance and Scale properties, (see{' '}
            <PrimaryQuestionInstructionModal>
              <span className='button underline button font-medium'>
                instructions
              </span>
            </PrimaryQuestionInstructionModal>
            ).
          </p>
        </div>

        <PrimaryQuestion />
        <InputErrors />
        <ParticipantConsent />
        <SubmitForm />
        <Footer />
      </div>
    </div>
  );
}
