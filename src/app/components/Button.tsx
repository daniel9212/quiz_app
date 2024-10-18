import Link from 'next/link';

export default function Button({ title, href, className, ...restProps }) {
  return (
    <button {...restProps} className={`text-black p-4 rounded-lg${className ? ' ' + className : ''}`}>
      {href && <Link className="text-lg font-bold" href={href}>{title}</Link>}
      {!href && title}
    </button>
  );
};