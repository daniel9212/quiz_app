import uniqId from 'uniqid';

import type {
  Question, QuizParams, CategoryData,
} from '@/app/sharedTypes/categories';
import { readFromFile, writeToFile } from '@/app/api/file';

const CATEGORIES_PATH = '/src/app/db/categories.json';
const QUESTIONS_PATH = '/src/app/db/questions.json';

// TODO: Add validation (if quizId is not in quizes)
export async function POST(request: Request, { params: { quizId } }: { params: QuizParams }) {
  const { data: categoriesData } = await readFromFile<Record<string, CategoryData>>(CATEGORIES_PATH);
  const { data: questionsData } = await readFromFile<Record<string, Question>>(QUESTIONS_PATH);

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