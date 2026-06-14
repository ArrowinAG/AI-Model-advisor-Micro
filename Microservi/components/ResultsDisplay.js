export default function ResultsDisplay({ rankings, requirements, onReset }) {
  return (
    <div>
      <div className="results-header">
        <h2>Top recommendations</h2>
        <div className="results-meta">
          Project: <strong>{requirements.useCase.substring(0, 45)}{requirements.useCase.length > 45 ? '...' : ''}</strong> • Budget: <strong>{requirements.budget}</strong>
        </div>
      </div>

      <div className="results-grid">
        {rankings.rankedModels.map((model, index) => (
          <div key={model.id} className="model-card">
            <span className="rank-badge">#{index + 1}</span>
            <div className="model-name">{model.name}</div>
            <div className="model-provider">{model.provider}</div>

            <div className="model-score">{model.score.toFixed(1)}</div>

            <div className="metrics">
              <div className="metric">
                <span className="metric-label">Monthly cost</span>
                <span className="metric-value">${model.estimatedCost.toFixed(2)}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Speed</span>
                <span className="metric-value">{model.speed}/10</span>
              </div>
              <div className="metric">
                <span className="metric-label">Accuracy</span>
                <span className="metric-value">{model.accuracy}/10</span>
              </div>
              <div className="metric">
                <span className="metric-label">Context</span>
                <span className="metric-value">{(model.contextWindow / 1000).toFixed(0)}K tokens</span>
              </div>
            </div>

            {model.strengths && model.strengths.length > 0 && (
              <div className="strengths">
                <div className="strengths-title">Key strengths</div>
                <ul>
                  {model.strengths.map((strength, i) => (
                    <li key={i}>{strength}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={onReset} className="btn-secondary">
          New search
        </button>
      </div>
    </div>
  );
}
