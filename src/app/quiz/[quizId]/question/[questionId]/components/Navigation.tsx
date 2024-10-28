import type { JSX } from 'react';

export default function Navigation({
  children,
}: { children: JSX.Element }) {

  return (
    <div className='flex w-4/6 mt-auto mb-16'>
      {children}
    </div>
  );
}