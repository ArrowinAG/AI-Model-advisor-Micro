import { logger } from '../../lib/logger';
import { cache } from '../../lib/cache';
import models from '../../lib/models.json';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    logger.info('Ranking request received', req.body);
    
    const { useCase, budget, priority1, priority2, monthlyUsage } = req.body;

    // Validate input
    if (!useCase || !useCase.trim()) {
      return res.status(400).json({ error: 'Use case is required' });
    }

    // Check cache
    const cacheKey = cache.generateKey(req.body);
    const cachedResults = cache.get(cacheKey);
    if (cachedResults) {
      logger.info('Cache hit for requirements', { cacheKey });
      return res.status(200).json(cachedResults);
    }

    // Score all models
    const scoredModels = models.models.map((model) => {
      let score = 5; // Base score

      // Budget scoring (0-10)
      let budgetMultiplier = 1;
      if (budget === 'free' && model.costPerMTok < 1) budgetMultiplier = 2;
      else if (budget === 'low' && model.costPerMTok < 5) budgetMultiplier = 1.8;
      else if (budget === 'medium' && model.costPerMTok < 15) budgetMultiplier = 1.5;
      else if (budget === 'high') budgetMultiplier = 1.2;
      
      score += (10 - Math.min(10, model.costPerMTok / 2)) * 0.15 * budgetMultiplier;

      // Priority scoring
      const priorityWeights = {
        accuracy: model.accuracy / 10,
        speed: model.speed / 10,
        cost: (10 - Math.min(10, model.costPerMTok / 2)) / 10,
        balanced: (model.accuracy + model.speed) / 20,
      };

      score += priorityWeights[priority1] * 4;
      score += priorityWeights[priority2] * 2;

      // Monthly usage scoring
      const monthlyTokens = {
        'low': 1000000,
        'medium': 50000000,
        'high': 500000000,
        'very-high': 1000000000,
      };

      const tokens = monthlyTokens[monthlyUsage] || 1000000;
      const estimatedCost = (tokens / 1000000) * model.costPerMTok;
      
      // Bonus for good price at scale
      if (estimatedCost < 100 && monthlyUsage !== 'low') score += 1;

      return {
        ...model,
        score: Math.min(10, Math.max(1, score)),
        estimatedCost,
      };
    });

    // Rank by score
    const rankedModels = scoredModels
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    const result = {
      rankedModels,
      summary: {
        totalModels: models.models.length,
        topModel: rankedModels[0]?.name,
        topScore: rankedModels[0]?.score.toFixed(1),
      },
    };

    // Cache the result
    cache.set(cacheKey, result);
    logger.info('Ranking completed successfully', { topModel: result.summary.topModel });

    res.status(200).json(result);
  } catch (error) {
    logger.error('Error in ranking API', { message: error.message, stack: error.stack });
    res.status(500).json({ error: 'Failed to rank models', details: error.message });
  }
}
