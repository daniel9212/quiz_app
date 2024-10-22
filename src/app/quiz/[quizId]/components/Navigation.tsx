'use client'

import { useState, useEffect } from 'react';

import type { StorageQuizes } from '@/app/quiz/[quizId]/question/[questionId]/hooks/useQuestionData';
import LinkButton from '@/app/components/LinkButton';

interface NavigationProps {
  quizId: string,
  startQuestionId: string,
}

export default function Navigation({ quizId, startQuestionId }: NavigationProps) {
  const [storageQuizes, setStorageQuizes] = useState<StorageQuizes>({});

  useEffect(() => {
    setStorageQuizes(JSON.parse(localStorage.getItem('quizes')!) ?? {});
  }, []);

  const isQuizStarted = Object.keys(storageQuizes[quizId] ?? {}).length !== 0;

  const onRestartQuiz = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [quizId]: _, ...restQuizes } = storageQuizes;
    localStorage.setItem('quizes', JSON.stringify(restQuizes));
  };

  return (
    <>
      <div className='flex justify-around'>
        <LinkButton
          href="/categories"
          title="Go Back"
          className="bg-white"
        />
        <LinkButton
          href={`/quiz/${quizId}/question/${startQuestionId}`}
          title={isQuizStarted ? 'View Progress' : 'Start Quiz'}
          className="bg-sky-600 text-white"
        />
        {isQuizStarted && (
          <LinkButton
            href={`/quiz/${quizId}/question/${startQuestionId}`}
            title="Restart Quiz"
            className="bg-red-600 text-white"
            onClick={onRestartQuiz}
          />
        )}
      </div>
      <div className="flex justify-center mt-32 -mb-32">
        <LinkButton
          title="Create Question"
          href={`/quiz/${quizId}/create-question`}
          className="bg-amber-300 w-48"
        />
      </div>
    </>
  );
}