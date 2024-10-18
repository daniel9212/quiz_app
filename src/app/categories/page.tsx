import Header from '@/app/components/Header';
import LinkButton from '@/app/components/LinkButton';
import Error from '@/app/components/Error';
import { getQuizCategories } from '@/app/helpers/jsonProcessing';

export default async function Categories() {
  const { error, data } = await getQuizCategories();
  
  if (error) {
    return <Error message={error} />
  }

  return (
    <section>
      <Header title='Start Quiz!' />
      <div className="grid grid-cols-2 gap-10">
        {data.map(({ id, category }) => (
          <LinkButton
            title={category}
            href={`/quiz/${id}`}
            key={id}
            className="bg-amber-300 w-full"
          />
        ))}
      </div>
    </section>
  );
}