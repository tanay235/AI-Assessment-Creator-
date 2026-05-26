import { Request, Response } from 'express';
import { getMongoStatus } from '../config/db';

/**
 * GET /api/health
 * Returns the status of the API and MongoDB.
 */
export const healthCheck = async (_req: Request, res: Response): Promise<void> => {
  const mongo = getMongoStatus();
  const allHealthy = mongo.status === 'connected';

  res.status(allHealthy ? 200 : 503).json({
    success: allHealthy,
    api: {
      status: 'connected',
      environment: process.env.NODE_ENV ?? 'development',
      timestamp: new Date().toISOString(),
    },
    mongodb: {
      status: mongo.status,
      readyState: mongo.readyState,
    },
  });
};
