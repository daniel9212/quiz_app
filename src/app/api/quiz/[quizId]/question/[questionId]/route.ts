import { readFromFile, writeToFile } from '@/app/api/file';

interface QuizSelectedAnswers {
  [questionId: string]: {
    selectedAnswer: string,
  }
}

interface UserData {
  [quizId: string]: QuizSelectedAnswers
}

const USER_PATH = '/src/app/db/user.json';

export async function PATCH(request: Request, { params: { quizId, questionId } }: { params: { quizId: string, questionId: string } }) {
  const { data: userData } = await readFromFile<UserData | Record<string, never>>(USER_PATH);

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

  return new Response(JSON.stringify({ data: { message: 'Selected answers were updated successfully!' } }), {
    headers: {
      'Content-type': 'application/json',
    },
    status: 200,
  });
}