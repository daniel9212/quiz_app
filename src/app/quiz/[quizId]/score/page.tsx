'use client'

import {
  useState, useEffect,
} from 'react';
import { useRouter } from 'next/navigation';

import type { QuestionParams } from '@/app/sharedTypes/categories';
import LinkButton from '@/app/components/LinkButton';
import {
  type StorageAnswer,
  getScorePerQuestion,
} from '@/app/quiz/[quizId]/question/[questionId]/helpers';
import { request } from '@/app/api/base';

const INITIAL_QUIZ_STATE = {
  quizPoints: 0,
  totalQuizQuestions: 0,
};

interface QuizState {
  quizPoints: number,
  totalQuizQuestions: number,
}

export default function Score({ params: { quizId } }: { params: QuestionParams }) {
  const [{ quizPoints, totalQuizQuestions }, setQuizState] = useState<QuizState>(INITIAL_QUIZ_STATE);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let questions;
      const storageQuestions: Record<string, StorageAnswer> = JSON.parse(localStorage.getItem('quizes')!)?.[quizId] ?? {};

      try {
        const questionsResponse = await request(`/api/quiz/${quizId}`);
        questions = questionsResponse.data.questions;
      } catch(error) {
        questions = storageQuestions;
        console.error(error);
      }
  
      const storageQuestionsArr = Object.values(storageQuestions);
      if (storageQuestionsArr.length === 0) {
        router.push(`/quiz/${quizId}`);
      }
  
      const quizPoints = storageQuestionsArr.reduce((total: number, storageAnswer: StorageAnswer) => total + getScorePerQuestion(storageAnswer), 0);
      const totalQuizQuestions = questions.length;
  
      setQuizState({
        quizPoints,
        totalQuizQuestions,
      });
    })()

  }, [quizId, router]);

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