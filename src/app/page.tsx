import LinkButton from '@/app/components/LinkButton';

export default function Home() {
  return (
    <LinkButton
      href="/categories"
      title="Pick Category"
      className="bg-amber-300 rounded-2xl"
    />
  );
}
