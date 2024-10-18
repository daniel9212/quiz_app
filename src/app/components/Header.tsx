import classNames from 'classnames';

interface HeaderProps {
  title: string,
  className?: string,
}

export default function Header({ title, className }: HeaderProps) {
  const headerStyles = classNames('text-center text-4xl mb-44', {
    className: !!className,
  });
  return (
    <h1 className={headerStyles}>
      {title}
    </h1>
  );
}