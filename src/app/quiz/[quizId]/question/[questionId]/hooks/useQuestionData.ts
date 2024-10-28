import {
  useState, useMemo,
} from 'react';

import type { QuizSelectedAnswers } from '@/app/api/quiz/types';
import type { QuestionParams, QuestionData } from '@/app/sharedTypes/categories';
import {
  generateResponseOptions, getQuizPoints,
} from '@/app/quiz/[quizId]/question/[questionId]/helpers';
import { request } from '@/app/api/base';

interface QuestionDataProps extends QuestionParams, QuestionData {
  selectedAnswers: QuizSelectedAnswers,
}

export default function useQuestionData({
  quizId, questionId, questionData, selectedAnswers: defaultSelectedAnswers,
}: QuestionDataProps) {
  const {
    question, correct_answer,
  } = questionData;

  const [selectedAnswers, setSelectedAnswers] = useState<QuizSelectedAnswers>(defaultSelectedAnswers);

  const responseOptions = useMemo(() => generateResponseOptions(questionData), [questionData]);
  
  const onSelectAnswer = async (answer: string) => {
    try {
      const {
        data: { selectedAnswers: updatedSelectedAnswers },
      } = await request(`/api/quiz/${quizId}/question/${questionId}`, {
        method: 'PATCH',
        data: { selectedAnswer: answer },
      });
      setSelectedAnswers(updatedSelectedAnswers);
    } catch (error) {
      console.error(error);
    }
  };

  const selectedAnswer = selectedAnswers[questionId]?.selectedAnswer ?? null;
  return ({
    currentQuestionState: {
      selectedAnswer, onSelectAnswer, responseOptions, correctAnswer: correct_answer, question, questionId,
    },
    quizPoints: getQuizPoints(selectedAnswers),
    quizId,
  });
}