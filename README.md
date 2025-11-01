# Artwork Explorer

A React application built with TypeScript and Vite for exploring artworks from the Art Institute of Chicago API. Features a responsive data table with persistent row selection across pagination.

## Features

-  Browse artworks from the Art Institute of Chicago
-  PrimeReact DataTable with server-side pagination
-  Persistent row selection across page changes
-  TypeScript for type safety
-  Built with Vite for fast development
-  Responsive design with PrimeFlex

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **UI Components**: PrimeReact, PrimeFlex, PrimeIcons
- **Styling**: CSS3 with PrimeReact themes

## Getting Started

### Prerequisites

- Node.js 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Varshamishra2020/artwork-app.git
cd artwork-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Key Features

- **Server-side Pagination**: Fetches data efficiently page by page
- **Persistent Selection**: Row selections are maintained across page navigation
- **Memory Efficient**: No storage of all fetched rows, preventing memory issues
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Works on desktop and mobile devices

## API Integration

Uses the [Art Institute of Chicago API](https://api.artic.edu/api/v1/artworks) to fetch artwork data including:
- Title
- Place of Origin
- Artist Information
- Inscriptions
- Date Information
