import { createServer } from 'http';
import app from './app';
import config from './config';
import { connectDB } from './config/db';
import { initSocket } from './config/socket';

const bootstrap = async (): Promise<void> => {
  await connectDB();

  const httpServer = createServer(app);
  initSocket(httpServer);

  const server = httpServer.listen(config.port, () => {
    console.log(`✅ Backend running on http://localhost:${config.port}`);
    console.log(`   Environment : ${config.nodeEnv}`);
    console.log(`   Health check: http://localhost:${config.port}/api/health`);
  });

  const shutdown = () => {
    console.log('\nShutting down gracefully…');
    server.close(() => process.exit(0));
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

bootstrap().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
