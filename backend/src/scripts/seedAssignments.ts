/**
 * Seed sample assignments + question papers.
 * Run: npm run seed
 * Replace all data: npx ts-node --transpile-only src/scripts/seedAssignments.ts --replace
 */
import dotenv from 'dotenv';
dotenv.config();

import dns from 'dns';
import mongoose from 'mongoose';
import AssignmentModel from '../models/Assignment';
import QuestionPaperModel from '../models/QuestionPaper';
import { SEED_DATA } from './seedTopicsData';

dns.setServers(['8.8.8.8', '1.1.1.1']);

async function seed(): Promise<void> {
  const replace = process.argv.includes('--replace');
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI missing in backend/.env');

  await mongoose.connect(uri);
  console.log('MongoDB connected');

  if (replace) {
    await QuestionPaperModel.deleteMany({});
    await AssignmentModel.deleteMany({});
    console.log('Cleared existing assignments and question papers.');
  }

  let created = 0;
  let skipped = 0;

  for (const item of SEED_DATA) {
    const exists = await AssignmentModel.findOne({ title: item.title });
    if (exists && !replace) {
      skipped++;
      continue;
    }
    if (exists && replace) {
      await QuestionPaperModel.deleteMany({ assignmentId: exists._id.toString() });
      await AssignmentModel.deleteOne({ _id: exists._id });
    }

    const assignedDate = new Date(item.assignedOn);
    const marks = item.paper?.totalMarks ?? item.totalMarks ?? 0;

    const assignment = await AssignmentModel.create({
      title: item.title,
      dueDate: item.dueDate,
      status: item.status,
      subject: item.subject,
      grade: item.grade,
      totalMarks: marks,
      description: item.description,
      fileUrl: item.fileUrl,
      createdAt: assignedDate,
      updatedAt: assignedDate,
    });

    if (item.paper && item.status === 'completed') {
      await QuestionPaperModel.create({
        assignmentId: assignment._id.toString(),
        title: item.title,
        instructions: item.paper.instructions,
        totalMarks: marks,
        duration: item.paper.duration,
        sections: item.paper.sections,
        generatedByAI: true,
      });
    }

    created++;
    console.log(`  + ${item.title}`);
  }

  console.log(`\nDone. Created: ${created}, Skipped (already exist): ${skipped}`);
  console.log('Open http://localhost:3000/assignments to view the cards.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
