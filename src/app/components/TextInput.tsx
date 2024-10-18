import type { HTMLAttributes } from 'react';
import classNames from 'classnames';

interface TextInputProps extends HTMLAttributes<HTMLInputElement>{
  name: string,
  className?: string,
  errors?: Record<string, string>,
  label?: string,
}

export default function TextInput({
  errors, label, id, name, className, ...props
}: TextInputProps) {
  const inputStyles = classNames('border-2 border-black rounded-md p-2 text-sm w-full', {
    [className!]: !!className,
  });

  const error = errors?.[name];
  return (
    <>
      {label && (<label className="font-bold text-md" htmlFor={id}>{label}</label>)}
      <span className="block">
        {error && (<span className="block text-red-600 text-xs font-bold">{error}</span>)}
        <input id={id} type="text" className={inputStyles} name={name} {...props} />
      </span>
    </>
  );
}