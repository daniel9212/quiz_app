'use client'

import type { Question } from '@/app/helpers/jsonProcessing';
import type { StorageQuizes } from './hooks/useQuestionData';

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

export interface StorageAnswer {
  selectedAnswer: string,
  correctAnswer: string,
}

export const getQuizPoints = ({
  currentStorageQuiz, questionId, selectedAnswer, correctAnswer,
}: {
  currentStorageQuiz: StorageAnswer[],
  questionId: number,
  selectedAnswer: string,
  correctAnswer: string,
}) => {
  const isAnswerNewAndCorrect = !currentStorageQuiz[questionId] && (selectedAnswer === correctAnswer);

  return currentStorageQuiz
    .reduce((total, answer) => total + getScorePerQuestion(answer), isAnswerNewAndCorrect ? 1 : 0);
};

export const getScorePerQuestion = ({ selectedAnswer, correctAnswer }: StorageAnswer) => {
  if (selectedAnswer === correctAnswer) {
    return 1;
  }

  return 0;
}