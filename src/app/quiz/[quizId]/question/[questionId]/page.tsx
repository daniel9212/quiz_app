import { redirect } from 'next/navigation';

import QuestionLayout, { type QuestionParams } from '@/app/quiz/[quizId]/question/[questionId]/components/QuestionLayout';
import Error from '@/app/components/Error';
import { getQuizData } from '@/app/helpers/jsonProcessing';

export default async function Question({
  params: { quizId, questionId },
}: { params: QuestionParams }) {
  const { error, data } = await getQuizData(quizId);

  if(error) {
    return <Error message={error} />
  }

  const { questions } = data;
  const questionIndex = +questionId;

  if (questionIndex < 1 || questionIndex > questions.length) {
    return redirect(`/quiz/${quizId}`);
  }

  return (
    <QuestionLayout
      questions={questions}
      quizId={quizId}
      questionId={questionId}
    />
  );
}