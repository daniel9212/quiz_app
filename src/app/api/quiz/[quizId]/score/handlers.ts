import type { CategoryData, Question } from '@/app/sharedTypes/categories';
import type { QuizSelectedAnswers } from '@/app/api/quiz/types';
import { readFromFile } from '@/app/api/file';

const CATEGORIES_PATH = '/src/app/db/categories.json';
const QUESTIONS_PATH = '/src/app/db/questions.json';
const USER_PATH = '/src/app/db/user.json';
const DEFAULT_ERROR_MESSAGE = "An Error ocured";

interface QuizScoreReturn {
  error: string | null,
  data: {
    quizScore: number,
    totalQuizQuestions: number,
  } | Record<string, never>
}

// TODO: Add error handling for quizId not found
export async function fetchQuizScore(quizId: string): Promise<QuizScoreReturn> {
  const {
    error: categoriesError, data: categoriesData,
  } = await readFromFile<Record<string, CategoryData>>(CATEGORIES_PATH);
  const {
    error: questionsError, data: questionsData,
  } = await readFromFile<Record<string, Question>>(QUESTIONS_PATH);
  const {
    error: userError, data: userData,
  } = await readFromFile<Record<string, QuizSelectedAnswers> | Record<string, never>>(USER_PATH);

  const questionIds = categoriesData[quizId].questions;

  const quizScore = questionIds.reduce((score, questionId) => {
    const { correct_answer: correctAnswer } = questionsData[questionId];
    const { selectedAnswer } = userData[quizId]?.[questionId] ?? {};
    const questionScore = +(selectedAnswer === correctAnswer);
    return score + questionScore;
  }, 0);

  if (categoriesError || questionsError || userError) {
    return {
      error: categoriesError?.message ?? questionsError?.message ?? userError?.message ?? DEFAULT_ERROR_MESSAGE,
      data: {},
    };
  }

  return {
    error: null,
    data: {
      quizScore,
      totalQuizQuestions: questionIds.length,
    },
  };
}