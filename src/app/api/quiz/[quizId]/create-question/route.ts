import uniqId from 'uniqid';

import type { CategoryData } from '@/app/api/quiz/[quizId]/handlers';
import { readFromFile, writeToFile } from '@/app/api/file';

const CATEGORIES_PATH = '/src/app/db/categories.json';
const QUESTIONS_PATH = '/src/app/db/questions.json';

// TODO: Add validation (if quizId is not in quizes)
export async function POST(request: Request, { params: { quizId } }: { params: { quizId: string } }) {
  const { data: categoriesData } = await readFromFile<Record<string, CategoryData>>(CATEGORIES_PATH);
  const { data: questionsData } = await readFromFile<Record<string, CategoryData>>(QUESTIONS_PATH);

  const newQuestionId = uniqId();
  const newCategoryQuestions = [...categoriesData[quizId].questions, newQuestionId];
  const newCategoriesData = {
    ...categoriesData,
    [quizId]: {
      ...categoriesData[quizId],
      questions: newCategoryQuestions,
    },
  };

  const questionData = await request.json();
  questionData.id = newQuestionId;
  const newQuestionsData = {
    ...questionsData,
    [newQuestionId]: questionData,
  };

  await writeToFile(CATEGORIES_PATH, JSON.stringify(newCategoriesData));
  await writeToFile(QUESTIONS_PATH, JSON.stringify(newQuestionsData));

  return new Response(JSON.stringify({ data: questionData }), {
    headers: {
      'Content-type': 'application/json',
    },
    status: 201,
  });
}