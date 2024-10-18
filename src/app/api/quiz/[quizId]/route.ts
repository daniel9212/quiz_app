import uniqId from 'uniqid';

import type { Quiz } from '@/app/helpers/jsonProcessing';
import { readFromFile, writeToFile } from '@/app/api/file';

const FILE_PATH = '/src/app/data/quizesData.json';

// TODO: Add validation (if quizId is not in quizes)

export async function POST(request: Request, { params: { quizId } }: { params: { quizId: string } }) {
  const { data: { quizes } } = await readFromFile<{ quizes: Quiz }>(FILE_PATH);

  const questionData = await request.json();

  questionData.id = uniqId();

  const { questions } = quizes[quizId];
  quizes[quizId].questions = [...questions, questionData];

  await writeToFile(FILE_PATH, JSON.stringify({ quizes }));

  return new Response(JSON.stringify({ data: questionData }), {
    headers: {
      'Content-type': 'application/json',
    },
    status: 201,
  });
}