import type { CategoryData } from '@/app/sharedTypes/categories';
import type { DBQuizSelectedAnswers } from '@/app/api/quiz/types';
import { readFromFile } from '@/app/api/file';

interface CategoriesReturn {
  error: string | null,
  data: {
    quizData: CategoryData,
    included: {
      hasQuizHistory: boolean,
    }
  } | Record<string, never>,
}

const CATEGORIES_PATH = '/src/app/db/categories.json';
const USER_PATH = '/src/app/db/user.json';
const DEFAULT_ERROR_MESSAGE = "An Error ocured";

export async function fetchCategory(quizId: string): Promise<CategoriesReturn> {
  const {
    error: categoriesError, data: categoriesData,
  } = await readFromFile<{ [id: string]: CategoryData }>(CATEGORIES_PATH);
  const {
    error: userError, data: userData,
  } = await readFromFile<Record<string, DBQuizSelectedAnswers> | Record<string, never>>(USER_PATH);

  const hasQuizHistory = Object.keys(userData[quizId] ?? {}).length !== 0;

  if (categoriesError || userError) {
    return {
      error: categoriesError?.message ?? userError?.message ?? DEFAULT_ERROR_MESSAGE,
      data: {},
    };
  }

  return {
    error: null,
    data: {
        quizData: categoriesData[quizId],
        included: { hasQuizHistory },
      },
  };
}