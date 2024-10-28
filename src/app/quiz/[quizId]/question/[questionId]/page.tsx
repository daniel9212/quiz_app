import type { QuestionParams } from '@/app/sharedTypes/categories';
import QuestionLayout from '@/app/quiz/[quizId]/question/[questionId]/components/QuestionLayout';
import Error from '@/app/components/Error';
import { fetchQuestion } from '@/app/api/quiz/[quizId]/question/[questionId]/handlers';

export default async function Question({ params }: { params: QuestionParams }) {
  const { error, data } = await fetchQuestion(params);

  if(error) {
    return <Error message={error} />
  }

  return (
    <QuestionLayout
      {...data}
      {...params}
    />
  );
}