import type { RestartQuizButtonProps } from '@/app/quiz/[quizId]/components/RestartQuizButton';
import LinkButton from '@/app/components/LinkButton';
import RestartQuizButton from '@/app/quiz/[quizId]/components/RestartQuizButton';

interface NavigationProps extends RestartQuizButtonProps {
  hasQuizHistory: boolean,
}

export default function Navigation({
  quizId, startQuestionId, hasQuizHistory,
}: NavigationProps) {

  return (
    <>
      <div className='flex justify-around'>
        <LinkButton
          href="/categories"
          title="Go Back"
          className="bg-white"
        />
        <LinkButton
          href={`/quiz/${quizId}/question/${startQuestionId}`}
          title={hasQuizHistory ? 'View Progress' : 'Start Quiz'}
          className="bg-sky-600 text-white"
        />
        {hasQuizHistory && (
          <RestartQuizButton
            quizId={quizId}
            startQuestionId={startQuestionId}
          />
        )}
      </div>
      <div className="flex justify-center mt-32 -mb-32">
        <LinkButton
          title="Create Question"
          href={`/quiz/${quizId}/create-question`}
          className="bg-amber-300 w-48"
        />
      </div>
    </>
  );
}