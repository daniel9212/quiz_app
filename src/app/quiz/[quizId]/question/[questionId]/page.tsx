'use client'

import { useMemo } from 'react';

import useQuizData from './hooks/useQuizData';
import Button from '@/app/components/Button';

export default function Quiz({
  params: { quizId, questionId },
}) {
  const { questions } = useQuizData({ quizId });

  const currentQuestionId = questionId - 1;

  const {
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
    question,
  } = questions[currentQuestionId] ?? {};

  const answers = useMemo(() => generateAnswers({ correctAnswer, incorrectAnswers }), [correctAnswer, incorrectAnswers]);
  const questionsNumber = questions.length;
  return (
    <>
      <section className="w-2/4">
        <p className='mb-20 font-bold text-3xl text-center'>{question}</p>
        <div className="grid grid-cols-2 gap-10">
          {answers.map(name => (
            <button
              key={name}
              className="bg-white text-black p-4 rounded-lg font-bold"
            >
              {name}
            </button>
          ))}
        </div>
      </section>
      <div className='absolute bottom-20 left-0 right- 0 flex justify-around w-full'>
        {currentQuestionId === 0 && (
          <Button
            title=""
            className="bg-transparent"
          />
        )}
        {currentQuestionId >= 1 && currentQuestionId < questionsNumber && (
          <Button
            title="Back"
            href={`/quiz/${quizId}/question/${questionId - 1}`}
            className="bg-sky-600 text-white"
          />
        )}
        {currentQuestionId >= 0 && currentQuestionId < questionsNumber - 1 && (
          <Button
            title="Next"
            href={`/quiz/${quizId}/question/${+questionId + 1}`}
            className="bg-sky-600 text-white"
          />
        )}
        {currentQuestionId === 9 && (
          <Button
            href={`/quiz/${quizId}/question/1`}
            title="Submit"
            className="bg-sky-600 text-white"
          />
        )}
      </div>
    </>
  );
}

const QUESTIONS_NUMBER = 4;
const generateCorrectAnswerIndex = () => Math.floor(Math.random() * QUESTIONS_NUMBER);

const generateAnswers = ({ correctAnswer, incorrectAnswers }) => {
  if (!correctAnswer) {
    return [];
  }

  const correctAnswerIndex = generateCorrectAnswerIndex();
  const leftArr = incorrectAnswers.slice(0, correctAnswerIndex);
  const rightArr = incorrectAnswers.slice(correctAnswerIndex);
  return [...leftArr, correctAnswer, ...rightArr];
};