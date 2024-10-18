'use client'

import { useState, useEffect } from 'react';

import type { StorageQuizes } from '@/app/quiz/[quizId]/question/[questionId]/hooks/useQuestionData';
import LinkButton from '@/app/components/LinkButton';

interface NavigationProps {
  quizId: string,
}

export default function Navigation({ quizId }: NavigationProps) {
  const [storageQuizes, setStorageQuizes] = useState<StorageQuizes>({});

  useEffect(() => {
    setStorageQuizes(JSON.parse(localStorage.getItem('quizes')!) ?? {});
  }, []);

  const isQuizStarted = (storageQuizes[quizId] ?? []).length !== 0;

  const onRestartQuiz = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [quizId]: _, ...restQuizes } = storageQuizes;
    localStorage.setItem('quizes', JSON.stringify(restQuizes));
  };

  return (
    <div className='flex justify-around'>
      <LinkButton
        href="/categories"
        title="Go Back"
        className="bg-white"
      />
      <LinkButton
        href={`/quiz/${quizId}/question/1`}
        title={isQuizStarted ? 'View Progress' : 'Start Quiz'}
        className="bg-sky-600 text-white"
      />
      {isQuizStarted && (
        <LinkButton
          href={`/quiz/${quizId}/question/1`}
          title="Restart Quiz"
          className="bg-red-600 text-white"
          onClick={onRestartQuiz}
        />
      )}
    </div>
  );
}