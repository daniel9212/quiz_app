interface DBSelectedAnswer {
  selectedAnswer: string,
}

interface SelectedAnswer extends DBSelectedAnswer {
  correctAnswer: string,
}

export interface DBQuizSelectedAnswers {
  [questionId: string]: DBSelectedAnswer,
}

export interface QuizSelectedAnswers {
  [questionId: string]: SelectedAnswer,
}
