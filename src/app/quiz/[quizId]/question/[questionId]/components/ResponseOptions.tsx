'use client'

import classNames from 'classnames';

interface ResponseOptionsProps {
  responseOptions: string[],
  correctAnswer: string,
  onSelectAnswer: (answer: string) => void,
  selectedAnswer?: string,
}

export default function ResponseOptions({
  responseOptions, correctAnswer, selectedAnswer, onSelectAnswer,
}: ResponseOptionsProps) {
  const answerType = selectedAnswer && (correctAnswer === selectedAnswer ? 'correct' : 'wrong');
  const isAnswerCorrect = answerType === 'correct';
  const isAnswerWrong = answerType === 'wrong';

  const revealMessageStyles = classNames('text-center text-xl font-bold mt-20', {
    'text-lime-500': isAnswerCorrect,
    'text-rose-500': isAnswerWrong,
  });

  return (
    <>
      <div className="grid grid-cols-2 gap-10">
        {responseOptions.map(name => {
          const answerStyles = classNames(
            'p-4 rounded-lg font-bold',
            {
              'bg-white text-black': selectedAnswer !== name,
              'bg-lime-500 text-white': selectedAnswer === name && isAnswerCorrect,
              'bg-rose-500 text-white': selectedAnswer === name && isAnswerWrong,
            },
          );

          return (
            <button
              key={name}
              className={answerStyles}
              onClick={() => onSelectAnswer(name)}
              disabled={!!answerType}
            >
              {name}
            </button>
          )
        })}
      </div>
      {selectedAnswer && (
        <p className={revealMessageStyles}>
          {isAnswerCorrect && 'Correct!'}
          {isAnswerWrong && `Wrong! The correct answer is "${correctAnswer}"!`}
        </p>
      )}
    </>
  );
}