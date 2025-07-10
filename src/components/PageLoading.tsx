import { LoaderPinwheel } from 'lucide-react';

export default function PageLoading() {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <LoaderPinwheel
        className='animate-spin text-gray-500 dark:text-gray-400'
        size={32}
      />
      <span className='geist-normal'>Loading Form</span>
    </div>
  );
}
