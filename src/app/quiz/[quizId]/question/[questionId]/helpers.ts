'use client'

import type { QuizSelectedAnswers } from '@/app/api/quiz/types';
import type { Question } from '@/app/sharedTypes/categories';

const generateCorrectAnswerIndex = ({
  question, questionsNumber,
}: {
  question: string, questionsNumber: number,
}) => question.length % questionsNumber;

export const generateResponseOptions = ({
  question, correct_answer: correctAnswer, incorrect_answers: incorrectAnswers,
}: Question): string[] => {
  if (!correctAnswer) {
    return [];
  }

  const correctAnswerIndex = generateCorrectAnswerIndex({
    question,
    questionsNumber: incorrectAnswers.length + 1,
  });

  const leftArr = incorrectAnswers.slice(0, correctAnswerIndex);
  const rightArr = incorrectAnswers.slice(correctAnswerIndex);
  return [...leftArr, correctAnswer, ...rightArr];
};

export const getQuizPoints = (selectedAnswers: QuizSelectedAnswers) => {
  return Object.values(selectedAnswers)
    .reduce((total, { selectedAnswer, correctAnswer }) => total + (+(selectedAnswer === correctAnswer)), 0);
};
