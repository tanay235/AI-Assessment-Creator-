type QuestionSeed = {
  text: string;
  type: 'mcq' | 'short_answer' | 'long_answer' | 'true_false';
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  options?: string[];
  correctAnswer: string;
  explanation: string;
};

export function buildExamPaper(
  mcqs: QuestionSeed[],
  shorts: QuestionSeed[],
  instructions = 'All questions are compulsory unless stated otherwise.'
) {
  const totalMarks =
    mcqs.reduce((s, q) => s + q.marks, 0) + shorts.reduce((s, q) => s + q.marks, 0);
  return {
    instructions,
    duration: 60,
    totalMarks,
    sections: [
      {
        title: 'Section A: Multiple Choice Questions',
        instructions: 'Select the single most appropriate option for each question.',
        questions: mcqs,
      },
      {
        title: 'Section B: Short Answer Questions',
        instructions: 'Answer the following questions in 2-3 sentences.',
        questions: shorts,
      },
    ],
  };
}

export type { QuestionSeed };
