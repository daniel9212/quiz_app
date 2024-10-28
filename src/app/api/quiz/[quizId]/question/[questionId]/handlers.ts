import type {
  QuestionParams, Question, QuestionData, CategoryData,
} from '@/app/sharedTypes/categories';
import type { QuizSelectedAnswers, DBQuizSelectedAnswers } from '@/app/api/quiz/types';
import { mapSelectedToCorrectAnswer } from '@/app/api/quiz/[quizId]/question/[questionId]/helpers';
import { readFromFile } from '@/app/api/file';

interface AdditionalQuestionData {
  included: {
    prevQuestionId: string | null,
    nextQuestionId: string | null,
    totalQuestionsNumber: number,
    questionIndex: number,
    selectedAnswers: QuizSelectedAnswers,
  },
}

export interface QuestionWithAdditionalData extends QuestionData, AdditionalQuestionData {}

interface QuestionReturn {
  error: string | null,
  data: QuestionWithAdditionalData,
}

const CATEGORIES_PATH = '/src/app/db/categories.json';
const QUESTIONS_PATH = '/src/app/db/questions.json';
const USER_PATH = '/src/app/db/user.json';

const DEFAULT_ERROR_MESSAGE = "There was an error reading the files";

export async function fetchQuestion({ quizId, questionId }: QuestionParams): Promise<QuestionReturn> {
  const {
    error: categoriesError, data: categoriesData,
  } = await readFromFile<Record<string, CategoryData>>(CATEGORIES_PATH);

  const {
    error: questionsError, data: questionsData,
  } = await readFromFile<Record<string, Question>>(QUESTIONS_PATH);

  const {
    error: userError, data: userData,
  } = await readFromFile<Record<string, DBQuizSelectedAnswers> | Record<string, never>>(USER_PATH);

  if (categoriesError || questionsError || userError) {
    return {
      error: categoriesError?.message ?? questionsError?.message ?? userError?.message ?? DEFAULT_ERROR_MESSAGE,
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

  const userQuizQuestions = userData[quizId] ?? {};
  const selectedAnswers = mapSelectedToCorrectAnswer({ userQuizQuestions, questionsData })

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
        selectedAnswers,
      },
    },
  };
}