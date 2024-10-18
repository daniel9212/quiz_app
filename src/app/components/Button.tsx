import type { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string,
  className?: string,
}

export default function Button({ title, className, ...restProps }: ButtonProps) {
  const buttonStyles = classNames('text-black font-bold p-4 rounded-lg', {
    [className!]: !!className,
  });

  return (
    <button {...restProps} className={buttonStyles}>
      {title}
    </button>
  );
};