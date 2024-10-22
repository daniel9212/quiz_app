import type { QuestionParams, Question } from '@/app/sharedTypes/categories';
import type { CategoryData } from '@/app/api/quiz/[quizId]/handlers';
import { readFromFile } from '@/app/api/file';

interface AdditionalQuestionData {
  included: {
    prevQuestionId: string | null,
    nextQuestionId: string | null,
    totalQuestionsNumber: number,
    questionIndex: number,
  },
}

export interface QuestionData {
  questionData: Question,
}

export interface QuestionWithAdditionalData extends QuestionData, AdditionalQuestionData {}

interface QuestionReturn {
  error: string | null,
  data: QuestionWithAdditionalData,
}

const DEFAULT_ERROR_MESSAGE = "There was an error reading the files";

export async function fetchQuestion({ quizId, questionId }: QuestionParams): Promise<QuestionReturn> {
  const {
    error: categoriesError, data: categoriesData,
  } = await readFromFile<{ [id: string]: CategoryData }>('/src/app/db/categories.json');

  const {
    error: questionsError, data: questionsData,
  } = await readFromFile<{ [id: string]: Question }>('/src/app/db/questions.json');

  if (categoriesError || questionsError) {
    return {
      error: categoriesError?.message ?? questionsError?.message ?? DEFAULT_ERROR_MESSAGE,
      data: {} as QuestionWithAdditionalData,
    };
  }

  const questionIds = categoriesData[quizId]?.questions ?? []

  if (questionIds.length === 0) {
    return { error: 'Quiz not found!', data: {} as QuestionWithAdditionalData };
  }

  const currentQuestionIndex = questionIds.findIndex(id => id === questionId);
  if (currentQuestionIndex === -1) {
    return { error: 'Question not found!', data: {} as QuestionWithAdditionalData };
  }

  const totalQuestionsNumber = questionIds.length;
  return {
    error: null,
    data: {
      questionData: questionsData[questionId],
      included: {
        prevQuestionId: currentQuestionIndex > 0
          ? questionIds[currentQuestionIndex - 1]
          : null,
        nextQuestionId: currentQuestionIndex < totalQuestionsNumber - 1
          ? questionIds[currentQuestionIndex + 1]
          : null,
        totalQuestionsNumber,
        questionIndex: currentQuestionIndex,
      },
    },
  };
}