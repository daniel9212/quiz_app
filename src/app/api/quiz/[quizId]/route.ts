import type { QuizParams } from '@/app/sharedTypes/categories';
import type { DBQuizSelectedAnswers } from '@/app/api/quiz/types';
import { readFromFile, writeToFile } from '@/app/api/file';

const USER_PATH = '/src/app/db/user.json';

export async function PATCH(_: Request, { params: { quizId } }: { params: QuizParams }) {
  const { data: userData } = await readFromFile<Record<string, DBQuizSelectedAnswers> | Record<string, never>>(USER_PATH);

  const updatedUserData = { ...userData, [quizId]: {} };

  await writeToFile(USER_PATH, JSON.stringify(updatedUserData));

  return new Response(JSON.stringify({ message: 'Quiz History Removed' }), {
    headers: {
      'Content-type': 'application/json',
    },
    status: 200,
  });
}