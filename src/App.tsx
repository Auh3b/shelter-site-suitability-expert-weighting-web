import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Introduction from './components/Introduction';
import ParticipantConsent from './components/ParticipantConsent';
import ParticipantInformation from './components/ParticipantInformation';
import PrimaryQuestion from './components/PrimaryQuestion';
import PrimaryQuestionInstructionModal from './components/PrimaryQuestionInstructionModal';
import SubmitForm from './components/SubmitForm';

function App() {
  return (
    <div className='px-8 lg:px-16 w-full lg:w-1/2 mx-auto geist-normal'>
      <Header />
      <Introduction />
      <ParticipantInformation />
      <h5 className='section mt-8'>Questions</h5>
      <div className='my-4'>
        <p>
          Please rank the following criteria in order most significance (see{' '}
          <PrimaryQuestionInstructionModal>
            <span className='button underline button font-medium'>
              instructions
            </span>
          </PrimaryQuestionInstructionModal>
          ).
        </p>
      </div>

      <PrimaryQuestion />
      <ParticipantConsent />
      <SubmitForm />
      <Footer />
    </div>
  );
}

export default App;
