interface ScoreProps {
  quizPoints: number,
  totalQuizQuestions: number,
}

export default function Score({
  quizPoints, totalQuizQuestions,
}: ScoreProps) {
  return (
    <div className='font-bold text-2xl w-4/5 text-right mt-20'>
      <span className='text-lime-500'>{quizPoints}</span>
      /{totalQuizQuestions}
    </div>
  );
}

