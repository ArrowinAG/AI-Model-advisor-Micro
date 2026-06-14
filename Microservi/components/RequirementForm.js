import { useState } from 'react';

export default function RequirementForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    useCase: '',
    budget: 'medium',
    priority1: 'accuracy',
    priority2: 'cost',
    monthlyUsage: 'low',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.useCase.trim()) {
      alert('Please describe your project');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <h2>Project Requirements</h2>

      <div className="form-group">
        <label htmlFor="useCase">Describe your project</label>
        <textarea
          id="useCase"
          name="useCase"
          value={formData.useCase}
          onChange={handleChange}
          placeholder="What are you building? E.g., customer support chatbot, content generation, data analysis..."
          rows="3"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="budget">Budget range</label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          >
            <option value="free">Free (under $10/month)</option>
            <option value="low">Low ($10–50/month)</option>
            <option value="medium">Medium ($50–500/month)</option>
            <option value="high">High ($500+/month)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority1">Primary priority</label>
          <select
            id="priority1"
            name="priority1"
            value={formData.priority1}
            onChange={handleChange}
          >
            <option value="accuracy">Accuracy</option>
            <option value="cost">Cost efficiency</option>
            <option value="speed">Speed</option>
            <option value="balanced">Balanced</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority2">Secondary priority</label>
          <select
            id="priority2"
            name="priority2"
            value={formData.priority2}
            onChange={handleChange}
          >
            <option value="accuracy">Accuracy</option>
            <option value="cost">Cost efficiency</option>
            <option value="speed">Speed</option>
            <option value="balanced">Balanced</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="monthlyUsage">Expected monthly volume</label>
          <select
            id="monthlyUsage"
            name="monthlyUsage"
            value={formData.monthlyUsage}
            onChange={handleChange}
          >
            <option value="low">Low (under 1M tokens)</option>
            <option value="medium">Medium (1M–10M tokens)</option>
            <option value="high">High (10M–100M tokens)</option>
            <option value="very-high">Very high (100M+ tokens)</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Getting recommendations...' : 'Get Recommendations'}
      </button>
    </form>
  );
}
