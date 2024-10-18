import type { JSX } from 'react';

interface NavigationProps {
  children: (childrenProps: NavigationChildrenProps) => JSX.Element,
  totalQuizQuestions: number,
  questionId: number,
}

export interface NavigationChildrenProps {
  finalStep: number,
  urlQuestionId: number,
}

export default function Navigation({
  children, totalQuizQuestions, questionId,
}: NavigationProps) {

  return (
    <div className='flex w-4/6 mt-auto mb-16'>
      {children({
        finalStep: totalQuizQuestions - 1,
        urlQuestionId: questionId + 1,
      })}
    </div>
  );
}