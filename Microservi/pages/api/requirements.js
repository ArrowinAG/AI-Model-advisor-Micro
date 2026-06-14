import { logger } from '../../lib/logger';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    logger.info('Requirements validation started', req.body);

    const { useCase, budget, priority1, priority2, monthlyUsage, teamSize } = req.body;

    // Validate required fields
    const errors = [];
    if (!useCase || useCase.trim().length === 0) errors.push('Use case is required');
    if (!budget) errors.push('Budget is required');
    if (!priority1) errors.push('Primary priority is required');

    if (errors.length > 0) {
      logger.warn('Validation failed', { errors });
      return res.status(400).json({ error: 'Validation failed', errors });
    }

    // Sanitize and normalize data
    const requirements = {
      useCase: useCase.trim(),
      budget: budget.toLowerCase(),
      priority1: priority1.toLowerCase(),
      priority2: priority2?.toLowerCase() || 'balanced',
      monthlyUsage: monthlyUsage?.toLowerCase() || 'low',
      teamSize: teamSize || '1-5',
      timestamp: new Date().toISOString(),
    };

    logger.info('Requirements validated successfully', requirements);

    res.status(200).json({
      success: true,
      requirements,
      message: 'Requirements processed successfully',
    });
  } catch (error) {
    logger.error('Error in requirements API', { message: error.message });
    res.status(500).json({ error: 'Failed to process requirements', details: error.message });
  }
}
