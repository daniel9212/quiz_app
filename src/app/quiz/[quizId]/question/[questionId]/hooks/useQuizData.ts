'use client'

import type { BareFetcher } from 'swr';
import useSWR from 'swr';

interface QuizData {
  results: {
    category: string,
    correct_answer: string,
    incorrect_answers: string[],
    question: string,
  }[],
}

export const fetchQuizData = async ([url, category]: [string, string]): Promise<QuizData> => {
  const quizRes = await fetch(`${url}?amount=10&category=${category}`);
  const quiz = await quizRes.json();

  return quiz;
};


export default function useuQuizData({ quizId }: { quizId: string }) {
  const {
    data: { results: questions = [] } = {},
    error,
  } = useSWR<QuizData, Error>(['https://opentdb.com/api.php', quizId], fetchQuizData as BareFetcher<QuizData>, {
    dedupingInterval: 3_600_000,
  });

  return { questions, error };
}