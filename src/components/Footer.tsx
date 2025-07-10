import { Button } from './ui/button';

export default function Footer() {
  return (
    <div className='my-16 flex flex-col items-center'>
      <p className=''> Built by Chikondi Ngaiyaye &copy; 2025</p>
      <div className='flex gap-4'>
        <Button
          variant={'link'}
          className='button'>
          <a href='https://www.linkedin.com/in/chikondingaiyayejr/'>Linkedin</a>
        </Button>
        <Button
          className='button'
          variant={'link'}>
          <a href='https://github.com/Auh3b/shelter-site-suitability-expert-weighting-web'>
            Github
          </a>
        </Button>
      </div>
    </div>
  );
}
