import { logger } from '../../lib/logger';
import models from '../../lib/models.json';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    logger.info('Models list requested');

    res.status(200).json({
      totalModels: models.models.length,
      models: models.models.map((model) => ({
        id: model.id,
        name: model.name,
        provider: model.provider,
        category: model.category,
      })),
    });
  } catch (error) {
    logger.error('Error in models API', { message: error.message });
    res.status(500).json({ error: 'Failed to fetch models', details: error.message });
  }
}
