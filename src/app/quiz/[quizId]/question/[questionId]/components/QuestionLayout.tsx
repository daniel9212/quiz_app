'use client'

import type { QuestionWithAdditionalData } from '@/app/api/quiz/[quizId]/question/[questionId]/handlers';
import type { QuestionParams } from '@/app/sharedTypes/categories';
import LinkButton from '@/app/components/LinkButton';
import useQuestionData from '@/app/quiz/[quizId]/question/[questionId]/hooks/useQuestionData';
import ResponseOptions from './ResponseOptions';
import Navigation from '@/app/quiz/[quizId]/question/[questionId]/components/Navigation';
import Score from './Score';

export default function QuestionLayout({
  included: {
    nextQuestionId, prevQuestionId, totalQuestionsNumber, questionIndex,
  }, ...quizProps
}: QuestionWithAdditionalData & QuestionParams) {
  const {
    currentQuestionState: {
      selectedAnswer,
      onSelectAnswer,
      question,
      responseOptions,
      correctAnswer,
    },
    quizPoints,
    quizId,
  } = useQuestionData(quizProps);

  return (
    <div className='flex items-center flex-col h-full w-full'>
      <Score
        quizPoints={quizPoints}
        totalQuizQuestions={totalQuestionsNumber}
      />
      <section className='w-2/4 mt-auto -mb-20'>
        <p className='mb-20 font-bold text-3xl text-center'>Q{questionIndex + 1}: {question}</p>
        <ResponseOptions
          responseOptions={responseOptions}
          correctAnswer={correctAnswer}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
        />
      </section>
      <Navigation>
        <>
          {prevQuestionId && (
            <LinkButton
              title="Back"
              href={`/quiz/${quizId}/question/${prevQuestionId}`}
              className="bg-sky-600 text-white"
            />
          )}
          {selectedAnswer && nextQuestionId && (
            <LinkButton
              title="Next"
              href={`/quiz/${quizId}/question/${nextQuestionId}`}
              className="bg-sky-600 text-white"
              linkClasses="ml-auto"
            />
          )}
          {selectedAnswer && !nextQuestionId && (
            <LinkButton
              href={`/quiz/${quizId}/score`}
              title="Submit"
              className="bg-sky-600 text-white"
              linkClasses="ml-auto"
            />
          )}
        </>
      </Navigation>
    </div>
  );
}
