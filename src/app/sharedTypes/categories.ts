export interface Question {
  id: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
}

export interface QuizParams {
  quizId: string,
}

export interface QuestionParams extends QuizParams {
  questionId: string,
}