import { redirect } from 'next/navigation';
import { fetchQuizScore } from '@/app/api/quiz/[quizId]/score/handlers';

import type { QuizParams } from '@/app/sharedTypes/categories';
import LinkButton from '@/app/components/LinkButton';

export default async function Score({ params: { quizId } }: { params: QuizParams }) {
  const { error, data } = await fetchQuizScore(quizId);

  if (error) {
    redirect(`/quiz/${quizId}`);
  }

  const { quizScore, totalQuizQuestions } = data;

  return (
    <div>
      <section className='text-3xl'>
        <h2 className='mb-10'>Correct answers: {quizScore}</h2>
        <h2>Total questions: {totalQuizQuestions}</h2>
      </section>
      <div className='flex'>
        <LinkButton
          title="Go To Categories"
          href="/categories"
          className="bg-sky-600 text-white"
          linkClasses=" m-auto mt-20"
        />
      </div>
    </div>
  );
}