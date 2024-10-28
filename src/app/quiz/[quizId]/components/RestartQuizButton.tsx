'use client'

import { request } from '@/app/api/base';
import LinkButton from '@/app/components/LinkButton';

export interface RestartQuizButtonProps {
  quizId: string,
  startQuestionId: string,
}

export default function RestartQuizButton({ quizId, startQuestionId }: RestartQuizButtonProps) {
  const onRestartQuiz = async () => {
    try {
      await request(`/api/quiz/${quizId}`, { method: 'PATCH', data: {} });
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <LinkButton
      href={`/quiz/${quizId}/question/${startQuestionId}`}
      title="Restart Quiz"
      className="bg-red-600 text-white"
      onClick={onRestartQuiz}
    />
  );
}