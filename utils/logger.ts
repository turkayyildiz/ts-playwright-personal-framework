// utils/logger.ts
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          colorize:        true,
          translateTime:   'SYS:yyyy-mm-dd HH:MM:ss',
          ignore:          'pid,hostname',
          messageFormat:   '[{context}] {msg}',
        },
        level: 'debug',
      },
      {
        target: 'pino/file',
        options: { destination: 'reports/test-run.log', mkdir: true },
        level: 'info',
      },
    ],
  },
});

export const getLogger = (context: string) => logger.child({ context });
export default logger;
