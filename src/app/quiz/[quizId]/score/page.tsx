'use client'

import { redirect } from 'next/navigation';

import type { QuestionParams } from '@/app/quiz/[quizId]/question/[questionId]/components/QuestionLayout';
import LinkButton from '@/app/components/LinkButton';
import {
  type StorageAnswer,
  getScorePerQuestion,
} from '@/app/quiz/[quizId]/question/[questionId]/helpers';

import {
  useState, useEffect,
} from 'react';

const INITIAL_QUIZ_STATE = {
  quizPoints: 0,
  totalQuizQuestions: 0,
};

export default function Score({ params: { quizId } }: { params: QuestionParams }) {
  const [{ quizPoints, totalQuizQuestions }, setQuizState] = useState(INITIAL_QUIZ_STATE);

  useEffect(() => {
    const questions = JSON.parse(localStorage.getItem('quizes')!)?.[quizId] ?? [];

    if (questions.length === 0) {
      redirect(`/quiz/${quizId}`);
    }

    const quizPoints = questions.reduce((total: number, storageAnswer: StorageAnswer) => total + getScorePerQuestion(storageAnswer), 0);
    const totalQuizQuestions = questions.length;

    setQuizState({
      quizPoints,
      totalQuizQuestions,
    });
  }, [quizId]);

  return (
    <div>
      <section className='text-3xl'>
        <h2 className='mb-10'>Correct answers: {quizPoints}</h2>
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