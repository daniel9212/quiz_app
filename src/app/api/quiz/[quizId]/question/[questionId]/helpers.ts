import type { Question } from '@/app/sharedTypes/categories';
import type { DBQuizSelectedAnswers } from '@/app/api/quiz/types';

export const mapSelectedToCorrectAnswer = ({
  userQuizQuestions, questionsData,
}: {
  userQuizQuestions: DBQuizSelectedAnswers,
  questionsData: Record<string, Question>
}) => {
  return Object.keys(userQuizQuestions)
  .reduce((selectedAnswersObj, id) => ({
    ...selectedAnswersObj,
    [id]: {
      selectedAnswer: userQuizQuestions[id].selectedAnswer,
      correctAnswer: questionsData[id].correct_answer,
    },
  }), {});
};