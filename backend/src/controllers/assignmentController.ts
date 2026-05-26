import { Request, Response } from 'express';
import AssignmentModel from '../models/Assignment';
import QuestionPaperModel from '../models/QuestionPaper';

/**
 * GET /api/assignments
 * Returns all assignments sorted by newest first.
 */
export const getAllAssignments = async (_req: Request, res: Response): Promise<void> => {
  try {
    const assignments = await AssignmentModel.find().sort({ createdAt: -1 }).lean();

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments,
    });
  } catch (err) {
    console.error('[assignmentController] getAllAssignments error:', (err as Error).message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch assignments',
    });
  }
};

/**
 * POST /api/assignments
 * Creates a new assignment and starts AI generation in the background.
 */
import { processAssessment } from '../services/generateAssessment';
import { storeUploadedFile } from '../utils/fileUpload';

export const createAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, dueDate, additionalInfo, uploadedFileName } = req.body;
    let { questionTypes } = req.body;

    // questionTypes comes as a JSON string because of FormData
    if (typeof questionTypes === 'string') {
      try {
        questionTypes = JSON.parse(questionTypes);
      } catch (e) {
        questionTypes = [];
      }
    }

    let fileUrl: string | undefined;
    if (req.file) {
      fileUrl = await storeUploadedFile(
        req.file.buffer,
        req.file.originalname || 'upload.pdf'
      );
    }

    // Calculate total marks from questionTypes
    let totalMarks = 0;
    if (Array.isArray(questionTypes)) {
      totalMarks = questionTypes.reduce((sum, q) => sum + (q.count * q.marks), 0);
    }

    // 1. Create Assignment in DB
    const newAssignment = await AssignmentModel.create({
      title: title || uploadedFileName || 'Untitled Assignment',
      dueDate,
      description: additionalInfo,
      status: 'pending',
      totalMarks,
      fileUrl,
      // For now, hardcode a subject/grade or leave empty since UI doesn't collect it yet
    });

    const assignmentId = newAssignment._id.toString();
    const jobPayload = {
      ...req.body,
      questionTypes,
      fileUrl,
      title: newAssignment.title,
      totalMarks,
    };

    void processAssessment(assignmentId, jobPayload);

    res.status(201).json({
      success: true,
      message: 'Assignment created; generation started',
      assignmentId: newAssignment._id,
    });
  } catch (err) {
    const message = (err as Error).message;
    console.error('[assignmentController] createAssignment error:', message);
    res.status(500).json({
      success: false,
      message: message.includes('Cloudinary')
        ? 'File upload failed. Check Cloudinary settings or restart the backend.'
        : `Failed to create assignment: ${message}`,
    });
  }
};

/**
 * GET /api/assignments/:id/result
 * Fetches the assignment and its generated QuestionPaper
 */
export const getAssignmentResult = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const assignment = await AssignmentModel.findById(id).lean();
    if (!assignment) {
      res.status(404).json({ success: false, message: 'Assignment not found' });
      return;
    }

    const questionPaper = await QuestionPaperModel.findOne({ assignmentId: id }).lean();

    res.status(200).json({
      success: true,
      data: {
        assignment,
        questionPaper,
      },
    });
  } catch (err) {
    console.error('[assignmentController] getAssignmentResult error:', (err as Error).message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch assignment result',
    });
  }
};

/**
 * DELETE /api/assignments/:id
 * Deletes the assignment and its associated question paper.
 */
export const deleteAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedAssignment = await AssignmentModel.findByIdAndDelete(id);
    if (!deletedAssignment) {
      res.status(404).json({ success: false, message: 'Assignment not found' });
      return;
    }

    // Also delete the associated question paper
    await QuestionPaperModel.findOneAndDelete({ assignmentId: id });

    res.status(200).json({
      success: true,
      message: 'Assignment and associated question paper deleted successfully',
    });
  } catch (err) {
    console.error('[assignmentController] deleteAssignment error:', (err as Error).message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete assignment',
    });
  }
};

