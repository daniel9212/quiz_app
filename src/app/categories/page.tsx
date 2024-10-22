import Header from '@/app/components/Header';
import LinkButton from '@/app/components/LinkButton';
import Error from '@/app/components/Error';
import { fetchCategories } from '@/app/api/categories/handlers';

export default async function Categories() {
  const { error, data } = await fetchCategories();
  
  if (error) {
    return <Error message={error} />
  }

  return (
    <section>
      <Header title='Start Quiz!' />
      <div className="grid grid-cols-2 gap-10">
        {data.map(({ id, name }) => (
          <LinkButton
            title={name}
            href={`/quiz/${id}`}
            key={id}
            className="bg-amber-300 w-full"
          />
        ))}
      </div>
    </section>
  );
}