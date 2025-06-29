import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Introduction from './components/Introduction';
import ParticipantInformation from './components/ParticipantInformation';
import PrimaryQuestion from './components/PrimaryQuestion';

function App() {
  return (
    <div className='px-8 lg:px-16 w-full lg:w-1/2 mx-auto geist-normal'>
      <Header />
      <Introduction />
      <ParticipantInformation />
      <h5 className='section mt-8'>Questions</h5>
      <div className='my-4'>
        <p>Please rank the following criteria in order most significance.</p>
      </div>
      <PrimaryQuestion />
      <Footer />
    </div>
  );
}

export default App;
