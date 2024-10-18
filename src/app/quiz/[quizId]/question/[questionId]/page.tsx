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

  return (
    <QuestionLayout
      questions={data.questions}
      quizId={quizId}
      questionId={questionId}
    />
  );
}