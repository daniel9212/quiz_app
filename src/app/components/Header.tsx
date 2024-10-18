export default function Header({ title, className }) {
  return (
    <h1 className={`${className ? className + ' ' : ''}text-center text-4xl mb-44`}>
      {title}
    </h1>
  );
}