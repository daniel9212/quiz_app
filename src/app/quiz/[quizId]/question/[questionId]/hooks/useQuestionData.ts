import type { Reducer } from 'react';
import {
  useEffect, useReducer, useMemo,
} from 'react';

import {
  type StorageAnswer,
  generateResponseOptions, getQuizPoints,
} from '../helpers';
import type { QuestionData } from '@/app/api/quiz/[quizId]/question/[questionId]/handlers';
import type { QuestionParams } from '@/app/sharedTypes/categories';

export interface StorageQuizes {
  [quizId: string]: Record<string, StorageAnswer>,
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
  quizId, questionId, questionData,
}: QuestionParams & QuestionData) {
  const [quizesState, dispatchQuizesState] = useReducer<Reducer<State, Action>>(quizesReducer, {} as State);
  const { storageQuizes, selectedAnswer } = quizesState;
  const currentStorageQuiz = storageQuizes?.[quizId] ?? {};

  useEffect(() => {
    const storageQuizes = JSON.parse(localStorage.getItem('quizes')!) ?? {};

    dispatchQuizesState({
      type: 'init-storage-quizes',
      payload: {
        storageQuizes,
        selectedAnswer: storageQuizes[quizId]?.[questionId]?.selectedAnswer,
      },
    })
  }, [quizId, questionId]);

  const responseOptions = useMemo(() => generateResponseOptions(questionData), [questionData]);
  const { question, correct_answer } = questionData;
  
  const onSelectAnswer = (answer: string) => {
    dispatchQuizesState({
      type: 'set-selected-answer',
      payload: answer,
    });
    
    const updatedCurrentQuiz = {
      ...currentStorageQuiz,
      [questionId]: {
        selectedAnswer: answer,
        correctAnswer: correct_answer,
      },
    };
    
    localStorage.setItem('quizes', JSON.stringify({
      ...storageQuizes,
      [quizId]: updatedCurrentQuiz,
    }))
  };
  
  return ({
    currentQuestionState: {
      selectedAnswer, onSelectAnswer, responseOptions, correctAnswer: correct_answer, question, questionId,
    },
    quizPoints: getQuizPoints({
      currentStorageQuiz, questionId, selectedAnswer, correctAnswer: correct_answer,
    }),
    quizId,
  });
}