'use client'

import {
  type SyntheticEvent,
  useState,
} from 'react';
import uniqId from 'uniqid';
import { useRouter } from 'next/navigation';

import type { QuestionParams } from '@/app/quiz/[quizId]/question/[questionId]/components/QuestionLayout';
import TextInput from '@/app/components/TextInput';
import Button from '@/app/components/Button';
import Plus from '@/app/components/icons/Plus';
import Bin from '@/app/components/icons/Bin';
import { request } from '@/app/api/base';

const WRONG_ANSWERS_LIMIT = 3;

export default function CreateQuestion({ params: { quizId } }: { params: QuestionParams }) {
  const router = useRouter()
  const [wrongAnswers, setWrongAnswers]  = useState<string[]>([]);
  const [errors, setErrors] = useState({});

  const onCreateWrongAnswer = () => setWrongAnswers(prevWrongAnswers => [...prevWrongAnswers, uniqId()]);
  const onDeleteWrongAnswer = (id: string) => setWrongAnswers(prevWrongAnswers => prevWrongAnswers.filter(wrongAnswer => wrongAnswer !== id));

  const onAddQuestion = async (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formElement = ev.currentTarget;
    const formData = new FormData(formElement);

    const currentErrors: Record<string, string> = {};

    for(const [key, value] of formData) {
      if (value === '') {
        currentErrors[key] = "This field is required";
      }
    }

    const areCurrentErrors = Object.keys(currentErrors).length > 0;
    const arePreviousErrors = Object.keys(errors).length > 0;
  
    if (areCurrentErrors) {
      setErrors(currentErrors);
      return;
    } else if (!areCurrentErrors && arePreviousErrors) {
      setErrors({})
    }

    // TODO: Add validation (options must be unique)
    const {
      correct_answer, question, ...wrongAnswersObj
    } = Object.fromEntries(formData);

    const questionData = {
      question,
      correct_answer,
      incorrect_answers: Object.values(wrongAnswersObj),
    };

    try {
      await request(`/api/quiz/${quizId}`, {
        method: 'POST',
        data: questionData,
      });
  
      formElement.reset();
      router.push(`/quiz/${quizId}`);
    } catch(error) {
      // TODO: Add notification with the error
      console.error(error);
    }
  };

  const isAddWrongAnswerBtnDisabled = wrongAnswers.length >= WRONG_ANSWERS_LIMIT;
  const isAddQuestionBtnDisabled = wrongAnswers.length === 0;

  return (
    <form
      onSubmit={onAddQuestion}
      className="bg-white text-black w-4/12 max-w-96 p-10 rounded-md"
    >
      <h1 className="text-center font-bold text-2xl mb-16">New Question</h1>
      <p className="pb-6">
        <TextInput
          label="Question"
          className="w-full"
          id="question"
          errors={errors}
          name="question"
        />
      </p>
      <p className="pb-6">
        <TextInput
          label="Correct Answer"
          className="w-full"
          id="correct_answer"
          errors={errors}
          name="correct_answer"
        />
      </p>
      <p>
        <label className="font-bold flex items-center justify-between text-md">
          Wrong Answers
          <button
            type="button"
            onClick={onCreateWrongAnswer}
            disabled={isAddWrongAnswerBtnDisabled}
          >
            <Plus width="20px" height="20px" />
          </button>
        </label>
        {wrongAnswers.map(id => (
          <span key={id} className="flex justify-between items-end my-2">
            <TextInput
              key={id}
              id="correct_answer"
              errors={errors}
              name={`wrong_answers_${id}`}
            />
            <button
              type="button"
              onClick={() => onDeleteWrongAnswer(id)}
            >
              <Bin fill="red" width="20px" height="20px" />
            </button>
          </span>
        ))}
      </p>
      <p className="flex justify-end mt-16">
        <Button
          title="Add Question"
          className="bg-sky-600 text-white font-bold"
          disabled={isAddQuestionBtnDisabled}
        />
      </p>  
    </form>
  );
}