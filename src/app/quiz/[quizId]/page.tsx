import type { QuizParams } from '@/app/sharedTypes/categories';
import Header from '@/app/components/Header';
import Error from '@/app/components/Error';
import { fetchCategory } from '@/app/api/quiz/[quizId]/handlers';
import Navigation from '@/app/quiz/[quizId]/components/Navigation';

export default async function Quiz({ params: { quizId } }: { params: QuizParams }) {
  const { error, data } = await fetchCategory(quizId);

  if (error) {
    return <Error message={error} />
  }

  const { name, questions } = data;

  return (
    <section>
      <Header title={`Welcome to ${name} Quiz!`} />
      <Navigation quizId={quizId} startQuestionId={questions[0]} />
    </section>
  );
}
