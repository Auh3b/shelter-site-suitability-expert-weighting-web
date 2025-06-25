import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <div className='my-16 flex flex-col items-center'>
      <p className=''> Built by Chikondi Ngaiyaye &copy; 2025</p>
      <div className='flex gap-4'>
        <Linkedin />
        <Github />
      </div>
    </div>
  );
}
