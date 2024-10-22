import type { UserData } from '@/app/api/quiz/[quizId]/question/[questionId]/route';
import type { Question } from '@/app/sharedTypes/categories';
import type { CategoryData } from '@/app/api/quiz/[quizId]/handlers';
import { readFromFile } from '@/app/api/file';

const CATEGORIES_PATH = '/src/app/db/categories.json';
const QUESTIONS_PATH = '/src/app/db/questions.json';
const USER_PATH = '/src/app/db/user.json';

export async function GET(_: Request, { params: { quizId } }: { params: { quizId: string } }) {
  const { data: categoriesData } = await readFromFile<Record<string, CategoryData>>(CATEGORIES_PATH);
  const { data: questionsData } = await readFromFile<Record<string, Question>>(QUESTIONS_PATH);
  const { data: userData } = await readFromFile<UserData | Record<string, never>>(USER_PATH);

  const questionIds = categoriesData[quizId].questions;

  const quizScore = questionIds.reduce((score, questionId) => {
    const { correct_answer: correctAnswer } = questionsData[questionId];
    const { selectedAnswer } = userData[quizId]?.[questionId] ?? {};
    const questionScore = +(selectedAnswer === correctAnswer);
    return score + questionScore;
  }, 0);

  return Response.json({ data: { score: quizScore } });
}