import { readFromFile } from '../api/file';

export interface Question {
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
}

interface QuizProps {
  id: string,
  category: string,
  questions: Question[],
}

export interface Quiz {
  [id: string]: QuizProps
}

interface CategoriesData {
  error: string | null,
  data: {
    id: string,
    category: string,
  }[],
}

const DEFAULT_ERROR_MESSAGE = "An Error ocured";

export async function getQuizCategories(): Promise<CategoriesData> {
  const { error, data } = await readFromFile<{ quizes: Quiz }>('/src/app/data/quizesData.json');

  return {
    error: error && (error?.message ?? DEFAULT_ERROR_MESSAGE),
    data: error
      ? []
      : Object.values(data.quizes).map(({ id, category }) => ({ id, category })),
  };
}

interface QuizData {
  error: string | null,
  data: QuizProps,
}

function getQuizDataFromCache() {
  const cache: Quiz = {};

  return async function(quizId: string): Promise<QuizData> {
    let requestedQuiz = cache[quizId];

    if (requestedQuiz) {
      return { error: null, data: requestedQuiz };
    }

    const { error, data } = await readFromFile<{ quizes: Quiz }>('/src/app/data/quizesData.json');

    if (error) {
      return {
        error: error && (error?.message ?? DEFAULT_ERROR_MESSAGE),
        data: {} as QuizProps,
      };
    }

    requestedQuiz = data.quizes[quizId]
    cache[quizId] = requestedQuiz;

    return { error: null, data: requestedQuiz }
  }
}

export const getQuizData = getQuizDataFromCache();