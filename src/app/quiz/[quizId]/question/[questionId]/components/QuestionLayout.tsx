'use client'

import type { Question } from '@/app/helpers/jsonProcessing';
import LinkButton from '@/app/components/LinkButton';
import useQuestionData from '@/app/quiz/[quizId]/question/[questionId]/hooks/useQuestionData';
import ResponseOptions from './ResponseOptions';
import Navigation, { type NavigationChildrenProps } from '@/app/quiz/[quizId]/question/[questionId]/components/Navigation';
import Score from './Score';

export interface QuestionParams {
  quizId: string,
  questionId: string,
}

interface QuestionLayoutProps extends QuestionParams {
  questions: Question[],
}

export default function QuestionLayout(quizProps: QuestionLayoutProps) {
  const {
    currentQuestionState: {
      selectedAnswer,
      onSelectAnswer,
      question,
      responseOptions,
      correctAnswer,
      questionId,
    },
    totalQuizQuestions,
    quizPoints,
  } = useQuestionData(quizProps);

  const { quizId } = quizProps;

  return (
    <div className='flex items-center flex-col h-full w-full'>
      <Score
        quizPoints={quizPoints}
        totalQuizQuestions={totalQuizQuestions}
      />
      <section className='w-2/4 mt-auto -mb-20'>
        <p className='mb-20 font-bold text-3xl text-center'>Q{questionId + 1}: {question}</p>
        <ResponseOptions
          responseOptions={responseOptions}
          correctAnswer={correctAnswer}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
        />
      </section>
      <Navigation
        questionId={questionId}
        totalQuizQuestions={totalQuizQuestions}
      >
        {({ finalStep, urlQuestionId }: NavigationChildrenProps) => (
          <>
            {questionId >= 1 && questionId <= finalStep && (
              <LinkButton
                title="Back"
                href={`/quiz/${quizId}/question/${urlQuestionId - 1}`}
                className="bg-sky-600 text-white"
              />
            )}
            {selectedAnswer && questionId >= 0 && questionId < finalStep && (
              <LinkButton
                title="Next"
                href={`/quiz/${quizId}/question/${urlQuestionId + 1}`}
                className="bg-sky-600 text-white"
                linkClasses="ml-auto"
              />
            )}
            {selectedAnswer && questionId === finalStep && (
              <LinkButton
                href={`/quiz/${quizId}/score`}
                title="Submit"
                className="bg-sky-600 text-white"
                linkClasses="ml-auto"
              />
            )}
          </>
        )}
      </Navigation>
    </div>
  );
}
