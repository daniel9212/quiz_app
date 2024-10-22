import { readFromFile } from '@/app/api/file';

interface CategoryData {
  id: string,
  name: string,
}

interface CategoriesReturn {
  error: string | null,
  data: CategoryData[],
}

const DEFAULT_ERROR_MESSAGE = "An Error ocured";

export async function fetchCategories(): Promise<CategoriesReturn> {
  const { error, data } = await readFromFile<{ [id: string]: CategoryData }>('/src/app/db/categories.json');

  return {
    error: error && (error?.message ?? DEFAULT_ERROR_MESSAGE),
    data: error
      ? []
      : Object.values(data),
  };
}