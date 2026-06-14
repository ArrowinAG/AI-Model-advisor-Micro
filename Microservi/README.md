# AI Model Recommender Engine

**Find the best AI model for your specific needs** — ranked from 1-10 based on cost, speed, accuracy, and efficiency.

## Features

- 🤖 **Intelligent Recommendation Engine** — Ranks models 1-10 based on your requirements
- 💰 **Cost-Effective** — Compare pricing across Claude, GPT-4, Gemini, Llama, Mistral, and more
- ⚡ **Real-time Analysis** — Powered by Groq API for fast inference
- 📊 **Detailed Comparison** — View side-by-side model metrics
- 🔄 **Smart Caching** — Fast responses for repeated queries
- 📍 **24/7 Availability** — Deployed on Vercel

## Tech Stack

- **Frontend:** Next.js + React (TypeScript)
- **Backend:** Vercel Serverless Functions (Microservices)
- **API:** Groq (free tier) for real-time AI analysis
- **Database:** JSON-based model specifications
- **Caching:** In-memory cache layer
- **Deployment:** Vercel + GitHub (auto-deploy)
- **Logging:** Vercel Console Logs (built-in)

## Live Demo

🚀 [AI Model Recommender](https://ai-model-recommender.vercel.app) (Coming soon)

## Setup

### Prerequisites
- Node.js 16+
- GitHub account
- Vercel account
- Groq API key (free at console.groq.com)

### Local Development

```bash
# Clone repo
git clone https://github.com/yourusername/ai-model-recommender.git
cd ai-model-recommender

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local
# Add your GROQ_API_KEY to .env.local

# Run dev server
npm run dev

# Open http://localhost:3000
```

### Deploy to Vercel

```bash
# Connect GitHub repo to Vercel
# Auto-deployment on every push
vercel
```

## Architecture

```
User → Frontend Form → Backend Ranking Engine → Groq API → Results
         ↓
    In-memory Cache (for speed)
         ↓
    Vercel Logs (for error tracking)
```

## How It Works

1. **User Inputs Requirements**
   - What are you building?
   - Budget range?
   - Priority: cost, speed, accuracy, efficiency?
   - Monthly usage volume?

2. **Backend Processes**
   - Requirement Handler validates input
   - Ranking Engine scores all models
   - Groq API provides additional insights
   - Results cached for speed

3. **Results Displayed**
   - Models ranked 1-10
   - Cost/speed/accuracy comparison
   - Detailed model information
   - Recommendation explanation

## API Routes

- `POST /api/requirements` — Submit requirements
- `POST /api/rank` — Get model rankings
- `GET /api/models` — List all available models
- `GET /api/health` — System health check

## Models Included

- **Anthropic:** Claude 3.5 Opus, Sonnet, Haiku
- **OpenAI:** GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo
- **Google:** Gemini Ultra, Pro, Flash
- **Meta:** Llama 2, Llama 3
- **Mistral:** Mistral Large, Medium, Small
- **Open-source:** Phi, Falcon, and more

## Error Handling

All errors logged to Vercel Console:
- Groq API failures → automatic fallback
- Invalid inputs → validation messages
- Timeout handling → graceful degradation

## Cost

**Completely Free**
- Vercel: Free tier
- Groq API: Free tier
- GitHub: Free repo
- No credit card required

## Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create feature branch
3. Submit pull request

## License

MIT License

## Contact

Questions? Open an issue on GitHub.

---

**Built with ❤️ for developers who need the right AI model**
