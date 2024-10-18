import type { Reducer } from 'react';
import {
  useEffect, useReducer, useMemo,
} from 'react';

import type { Question } from '@/app/helpers/jsonProcessing';
import {
  type StorageAnswer,
  generateResponseOptions, getQuizPoints,
} from '../helpers';

export interface StorageQuizes {
  [quizId: string]: StorageAnswer[],
}

interface State {
  storageQuizes: StorageQuizes,
  selectedAnswer: string,
}

interface Action {
  type: string,
  payload: State | string;
}

const quizesReducer = (state: State, { type, payload }: Action): State => {
  switch(type) {
    case 'init-storage-quizes':
      return payload as State;
    case 'set-selected-answer':
      return {
        ...state,
        selectedAnswer: payload as string,
      };
    default:
      return state;
  }
};

export default function useQuestionData({
  quizId, questionId, questions,
}: {
  quizId: string,
  questionId: string,
  questions: Question[],
}) {
  const [quizesState, dispatchQuizesState] = useReducer<Reducer<State, Action>>(quizesReducer, {} as State);
  const currentQuestionId = +questionId - 1;
  const { storageQuizes, selectedAnswer } = quizesState;
  const currentStorageQuiz = storageQuizes?.[quizId] ?? [];

  useEffect(() => {
    const storageQuizes = JSON.parse(localStorage.getItem('quizes')!) ?? {};

    dispatchQuizesState({
      type: 'init-storage-quizes',
      payload: {
        storageQuizes,
        selectedAnswer: storageQuizes[quizId]?.[currentQuestionId]?.selectedAnswer,
      },
    })
  }, [quizId, currentQuestionId]);

  const currentQuestion = questions[currentQuestionId];
  const responseOptions = useMemo(() => generateResponseOptions(currentQuestion), [currentQuestion]);
  const { question, correct_answer } = currentQuestion;
  
  const onSelectAnswer = (answer: string) => {
    dispatchQuizesState({
      type: 'set-selected-answer',
      payload: answer,
    });
    
    const updatedCurrentQuiz = [...currentStorageQuiz];
    updatedCurrentQuiz[currentQuestionId] = {
      selectedAnswer: answer,
      correctAnswer: correct_answer,
    };
    
    localStorage.setItem('quizes', JSON.stringify({
      ...storageQuizes,
      [quizId]: updatedCurrentQuiz,
    }))
  };
  
  return ({
    currentQuestionState: {
      selectedAnswer, onSelectAnswer, responseOptions, correctAnswer: correct_answer, question, questionId: currentQuestionId,
    },
    totalQuizQuestions: questions.length,
    quizPoints: getQuizPoints({
      currentStorageQuiz, questionId: currentQuestionId, selectedAnswer, correctAnswer: correct_answer,
    }),
  });
}