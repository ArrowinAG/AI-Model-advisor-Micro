import { logger } from '../../lib/logger';

export default function handler(req, res) {
  try {
    logger.info('Health check');
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    });
  } catch (error) {
    logger.error('Health check failed', { message: error.message });
    res.status(500).json({ status: 'error', message: error.message });
  }
}
