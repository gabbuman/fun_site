# Personal Website

A retro terminal-themed personal website built with Python and Vercel.

## Features

- **Chess Stats**: Live Chess.com statistics and profile
- **Dota 2 Stats**: Steam/OpenDota integration showing recent matches and win/loss
- **Solar Data**: Real-time solar irradiance data for North America, Europe, and Asia

## Tech Stack

- **Frontend**: HTML, CSS (Terminal green on black theme), Vanilla JavaScript
- **Backend**: Python serverless functions (Vercel)
- **APIs**:
  - Chess.com Public API
  - OpenDota API
  - Open-Meteo Solar API
- **Deployment**: Vercel

## Local Development

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Run locally:
```bash
vercel dev
```

3. Visit `http://localhost:3000`

## Deployment

1. Install Vercel CLI (if not already):
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

## Project Structure

```
.
├── api/                  # Python serverless functions
│   ├── chess.py         # Chess.com stats
│   ├── dota.py          # Dota 2 stats
│   └── solar.py         # Solar irradiance data
├── public/
│   ├── css/
│   │   └── style.css    # Terminal green theme
│   └── js/
│       ├── chess.js     # Chess frontend
│       ├── dota.js      # Dota frontend
│       └── solar.js     # Solar frontend
├── index.html           # Home page
├── chess.html           # Chess stats page
├── dota.html            # Dota stats page
├── solar.html           # Solar data page
├── vercel.json          # Vercel configuration
└── requirements.txt     # Python dependencies (none needed!)
```

## Design

Terminal green on black aesthetic inspired by classic terminals and Matrix vibes.
- Monospace fonts (Courier New, Monaco)
- Green (#00ff00) on black (#0a0a0a)
- Subtle scanline animation
- ASCII art headers
- Terminal-style navigation

## APIs Used

All APIs are free and require no authentication:
- [Chess.com Published-Data API](https://www.chess.com/news/view/published-data-api)
- [OpenDota API](https://docs.opendota.com/)
- [Open-Meteo Solar API](https://open-meteo.com/)

## License

MIT
