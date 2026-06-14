import { useState } from 'react';
import Head from 'next/head';
import RequirementForm from '../components/RequirementForm';
import ResultsDisplay from '../components/ResultsDisplay';

export default function Home() {
  const [requirements, setRequirements] = useState(null);
  const [rankings, setRankings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setRequirements(formData);

    try {
      const response = await fetch('/api/rank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setRankings(data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRankings(null);
    setRequirements(null);
    setError(null);
  };

  return (
    <>
      <Head>
        <title>AI Model Recommender</title>
        <meta name="description" content="Find the right AI model for your project" />
      </Head>

      <div className="container">
        <header className="header">
          <h1>AI Model Recommender</h1>
          <p>Find the right AI model for your specific requirements and budget</p>
        </header>

        <main className="main">
          {!rankings ? (
            <RequirementForm onSubmit={handleSubmit} loading={loading} />
          ) : (
            <ResultsDisplay
              rankings={rankings}
              requirements={requirements}
              onReset={handleReset}
            />
          )}

          {error && <div className="error-message">{error}</div>}
        </main>

        <footer className="footer">
          <p>AI-powered model recommendations based on your requirements</p>
        </footer>
      </div>
    </>
  );
}
