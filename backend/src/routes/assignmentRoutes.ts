import { Router } from 'express';
import multer from 'multer';
import { getAllAssignments, createAssignment, getAssignmentResult, deleteAssignment } from '../controllers/assignmentController';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
});

// GET /api/assignments
router.get('/', getAllAssignments);

// GET /api/assignments/:id/result
router.get('/:id/result', getAssignmentResult);

// POST /api/assignments
router.post('/', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: err.message || 'File upload failed',
      });
      return;
    }
    next();
  });
}, createAssignment);

// DELETE /api/assignments/:id
router.delete('/:id', deleteAssignment);

export default router;
