import type { ButtonProps } from '@/app/components/Button';

import Link from 'next/link';
import Button from '@/app/components/Button';

interface LinkButtonProps extends ButtonProps{
  href: string,
  linkClasses?: string,
}

export default function LinkButton({ href, linkClasses, ...restProps }: LinkButtonProps) {
  return (
    <Link
      {...(linkClasses && { className: linkClasses })}
      href={href}
    >
      <Button {...(restProps as ButtonProps)} />
    </Link>
  );
};