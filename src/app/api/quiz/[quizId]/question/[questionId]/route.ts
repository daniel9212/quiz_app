import type { Question, QuestionParams } from '@/app/sharedTypes/categories';
import type { DBQuizSelectedAnswers } from '@/app/api/quiz/types';
import { readFromFile, writeToFile } from '@/app/api/file';
import { mapSelectedToCorrectAnswer } from '@/app/api/quiz/[quizId]/question/[questionId]/helpers';

const QUESTIONS_PATH = '/src/app/db/questions.json';
const USER_PATH = '/src/app/db/user.json';

export async function PATCH(request: Request, { params: { quizId, questionId } }: { params: QuestionParams }) {
  const { data: questionsData } = await readFromFile<Record<string, Question>>(QUESTIONS_PATH);
  const { data: userData } = await readFromFile<Record<string, DBQuizSelectedAnswers> | Record<string, never>>(USER_PATH);

  const { selectedAnswer } = await request.json();

  const currentQuiz = userData[quizId] ?? {};
  const updatedUserData = {
    ...userData,
    [quizId]: {
      ...currentQuiz,
      [questionId]: { selectedAnswer },
    }
  };

  await writeToFile(USER_PATH, JSON.stringify(updatedUserData));

  const selectedAnswers = mapSelectedToCorrectAnswer({ userQuizQuestions: updatedUserData[quizId], questionsData })
  return new Response(JSON.stringify({ selectedAnswers }), {
    headers: {
      'Content-type': 'application/json',
    },
    status: 200,
  });
}
