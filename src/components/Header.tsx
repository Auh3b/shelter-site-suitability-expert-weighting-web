import type { PropsWithChildren } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export default function Header() {
  return (
    <div className='py-6 px-4 flex justify-end'>
      <UserSheet>
        <Avatar className='cursor-pointer'>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </UserSheet>
    </div>
  );
}

function UserSheet(props: PropsWithChildren) {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{props.children}</SheetTrigger>
        <SheetContent className='geist-normal'>
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
            <SheetDescription>
              Please login to edit profile and save content
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button>Login</Button>
            <SheetClose asChild>
              <Button variant={'outline'}>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
