import Header from '@/app/components/Header';
import Error from '@/app/components/Error';
import { getQuizData } from '@/app/helpers/jsonProcessing';
import Navigation from '@/app/quiz/[quizId]/components/Navigation';

interface QuizProps {
  params: {
    quizId: string,
  },
}

export default async function Quiz({ params: { quizId } }: QuizProps) {
  const { error, data } = await getQuizData(quizId);

  if (error) {
    return <Error message={error} />
  }

  const { category } = data;

  return (
    <section>
      <Header title={`Welcome to ${category} Quiz!`} />
      <Navigation quizId={quizId} />
    </section>
  );
}
