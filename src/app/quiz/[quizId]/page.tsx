import Header from '@/app/components/Header';
import Button from '@/app/components/Button';

export default async function Quiz({ params: { quizId } }) {
  const response = {};

  try {
    const quizRes = await fetch(`https://opentdb.com/api.php?amount=10&category=${quizId}`);
    const { results: questions } = await quizRes.json();
    response.category = questions[0]?.category ?? '';
  } catch (error) {
    response.error = error;
    console.err(error);
  }

  const { error, category } = response;

  if (error) {
    return <span>{error}</span>
  }

  return (
    <section>
      <Header title={`Welcome to ${category} Quiz!`} />
      <div className='flex justify-around'>
        <Button
          href="/categories"
          title="Go Back"
          className="bg-white"
        />
        <Button
          href={`/quiz/${quizId}/question/1`}
          title="Start Quiz"
          className="bg-sky-600 text-white"
        />
      </div>
    </section>
  );
}
