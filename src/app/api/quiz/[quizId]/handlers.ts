import { readFromFile } from '@/app/api/file';

export interface CategoryData {
  id: string,
  name: string,
  questions: string[],
}

interface CategoriesReturn {
  error: string | null,
  data: CategoryData,
}

const DEFAULT_ERROR_MESSAGE = "An Error ocured";

export async function fetchCategory(quizId: string): Promise<CategoriesReturn> {
  const { error, data } = await readFromFile<{ [id: string]: CategoryData }>('/src/app/db/categories.json');

  return {
    error: error && (error?.message ?? DEFAULT_ERROR_MESSAGE),
    data: error
      ? {} as CategoryData
      : data[quizId],
  };
}