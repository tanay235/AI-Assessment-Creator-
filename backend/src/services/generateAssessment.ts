import AssignmentModel from '../models/Assignment';
import QuestionPaperModel from '../models/QuestionPaper';
import { getIO } from '../config/socket';
import {
  formatGeminiError,
  generateContentWithFallback,
  getGeminiApiKey,
} from './geminiClient';

async function fetchFileAsGenerativePart(fileUrl: string) {
  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch file from ${fileUrl}`);
  }
  const buffer = await response.arrayBuffer();
  const mimeType = response.headers.get('content-type') || 'application/octet-stream';

  return {
    inlineData: {
      data: Buffer.from(buffer).toString('base64'),
      mimeType,
    },
  };
}

export type AssessmentJobPayload = {
  additionalInfo?: string;
  questionTypes?: unknown;
  fileUrl?: string;
  title?: string;
  totalMarks?: number;
};

/**
 * Generates a question paper with Gemini and updates the assignment in MongoDB.
 * Runs in the background after POST /api/assignments; progress is emitted via Socket.IO.
 */
export const processAssessment = async (
  assignmentId: string,
  payload: AssessmentJobPayload
): Promise<void> => {
  const { additionalInfo, questionTypes, fileUrl, title, totalMarks } = payload;

  console.log(`\n[Assessment] Started processing: ${assignmentId}`);

  const emitProgress = (msg: string) => {
    try {
      getIO().to(assignmentId).emit('job:progress', { message: msg });
    } catch {
      /* socket not ready */
    }
  };

  try {
    getGeminiApiKey();

    await AssignmentModel.findByIdAndUpdate(assignmentId, { status: 'processing' });
    try {
      getIO().to(assignmentId).emit('job:processing', { assignmentId });
    } catch {
      console.warn('[Assessment] Socket emit processing skipped');
    }

    const generativeParts: Array<{ text: string } | Awaited<ReturnType<typeof fetchFileAsGenerativePart>>> = [];
    if (fileUrl) {
      emitProgress('Reading your uploaded document...');
      console.log(`[Assessment] Fetching file: ${fileUrl}`);
      generativeParts.push(await fetchFileAsGenerativePart(fileUrl));
    }

    const questionTypesJson = JSON.stringify(questionTypes ?? [], null, 2);

    const prompt = `You are an expert curriculum designer and school teacher.
Generate a COMPLETE, LONG question paper in STRICT JSON only (no markdown fences).

PAPER STRUCTURE (follow this layout closely):
1. "Section A: Multiple Choice Questions" — instruction: "Select the single most appropriate option for each question."
   - Include AT LEAST 8 MCQs (more if questionTypes requests more MCQs).
   - Each MCQ: exactly 4 options (a–d), difficulty tag, 1 mark each unless specified otherwise.
2. "Section B: Short Answer Questions" — instruction: "Answer the following questions in 2-3 sentences."
   - Include AT LEAST 5 short-answer questions, 2 marks each unless specified otherwise.
   - Mix easy, medium, and hard difficulty.
3. Add Section C, D, etc. only if questionTypes lists Long Questions, Numerical Problems, Essay, Diagram, or True/False — use clear section titles.

ANSWER KEY REQUIREMENTS (CRITICAL — every question MUST include both fields):
- "correctAnswer": For MCQ, copy the FULL TEXT of the correct option exactly as written in options[] (not just "b").
  For short/long answers, write the complete model answer (2–4 sentences for short, longer for essay).
- "explanation": A separate pedagogical explanation (2–4 sentences) that teaches WHY the answer is correct.
  This appears after an em dash in the Answer Key UI: "b. [correctAnswer] — [explanation]"

QUALITY RULES:
- Questions must be specific, syllabus-aligned, and non-generic.
- Base content on uploaded file context (if any) and additional instructions.
- Vary difficulty across [Easy], [Medium], [Hard].
- Total marks across all questions must equal ${totalMarks || 30}.
- Use realistic school-exam wording like NCERT/CBSE style.

JSON SCHEMA (return exactly this shape):
{
  "title": "${title}",
  "instructions": "All questions are compulsory unless stated otherwise.",
  "totalMarks": ${totalMarks || 30},
  "duration": 60,
  "sections": [
    {
      "title": "Section A: Multiple Choice Questions",
      "instructions": "Select the single most appropriate option for each question.",
      "questions": [
        {
          "text": "Question text",
          "type": "mcq",
          "difficulty": "medium",
          "marks": 1,
          "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
          "correctAnswer": "Option B text",
          "explanation": "2-4 sentence explanation of why this is correct."
        }
      ]
    },
    {
      "title": "Section B: Short Answer Questions",
      "instructions": "Answer the following questions in 2-3 sentences.",
      "questions": [
        {
          "text": "Question text",
          "type": "short_answer",
          "difficulty": "hard",
          "marks": 2,
          "correctAnswer": "Full model answer in complete sentences.",
          "explanation": "Brief note reinforcing the key concept tested."
        }
      ]
    }
  ]
}

ASSIGNMENT INPUT:
- Title: ${title}
- Additional Instructions: ${additionalInfo || 'None'}
- Question types requested (match counts and marks per type exactly):
${questionTypesJson}

Return ONLY valid JSON. No trailing commas. No comments.`;

    generativeParts.push({ text: prompt });

    emitProgress('Planning the assignment layout...');
    console.log(`[Assessment] Calling Gemini API...`);
    const { text: rawText, modelUsed } = await generateContentWithFallback(generativeParts);
    console.log(`[Assessment] Generated with ${modelUsed}`);
    let text = rawText;
    if (text.startsWith('```json')) text = text.slice(7);
    if (text.startsWith('```')) text = text.slice(3);
    if (text.endsWith('```')) text = text.slice(0, -3);
    text = text.trim();

    console.log(`[Assessment] Parsing Gemini output...`);
    const parsedJson = JSON.parse(text);

    emitProgress('Saving your new assignment...');
    const paper = await QuestionPaperModel.create({
      ...parsedJson,
      assignmentId,
      generatedByAI: true,
    });

    await AssignmentModel.findByIdAndUpdate(assignmentId, {
      status: 'completed',
      title: paper.title || title,
    });

    try {
      getIO().to(assignmentId).emit('job:completed', { assignmentId });
    } catch {
      console.warn('[Assessment] Socket emit completed skipped');
    }
    console.log(`[Assessment] Completed: ${assignmentId}`);
  } catch (err) {
    const message = formatGeminiError(err);
    console.error(`[Assessment] Failed ${assignmentId}:`, message);
    await AssignmentModel.findByIdAndUpdate(assignmentId, { status: 'draft' });
    try {
      getIO().to(assignmentId).emit('job:failed', { assignmentId, error: message });
    } catch {
      /* ignore */
    }
  }
};
