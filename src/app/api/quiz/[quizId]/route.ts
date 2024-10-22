import type { CategoryData } from './handlers';
import { readFromFile } from '@/app/api/file';

const CATEGORIES_PATH = '/src/app/db/categories.json';
const QUESTIONS_PATH = '/src/app/db/questions.json';

export async function GET(_: Request, { params: { quizId } }: { params: { quizId: string } }) {
  const { data: categoriesData } = await readFromFile<Record<string, CategoryData>>(CATEGORIES_PATH);
  const { data: questionsData } = await readFromFile<Record<string, CategoryData>>(QUESTIONS_PATH);

  const questionIds = categoriesData[quizId].questions;
  const quizQuestions = questionIds.map(questionId => questionsData[questionId]);

  return Response.json({ questions: quizQuestions });
}