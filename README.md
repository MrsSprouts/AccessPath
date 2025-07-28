# AccessPath - Accessibility Navigation App

AccessPath is a community-driven accessibility mapping application focused on Delhi, India. It helps users discover accessibility information about barriers, facilitators, and wheelchair-friendly places throughout the city.

## Features

- **Interactive Map**: Google Maps integration with custom accessibility markers
- **Community Reporting**: Right-click or long-press to report accessibility points
- **Real-time Updates**: Live synchronization with Firebase Firestore
- **Layer Toggle**: Show/hide barriers, facilitators, and accessible POIs
- **Dark/Light Mode**: Accessible theme switching
- **Firebase Authentication**: Anonymous and Google sign-in options
- **Responsive Design**: Works on mobile and desktop devices

## Setup Instructions

### 1. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Enable Authentication with Anonymous and Google providers
4. Copy your Firebase configuration
5. Replace the config in `src/firebase/config.ts`

### 2. Google Maps API

1. Get a Google Maps JavaScript API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Maps JavaScript API
3. Replace `YOUR_GOOGLE_MAPS_API_KEY` in `src/components/Map.tsx`

### 3. Firestore Collections

Create these collections in your Firestore database:

- `barriers` - Accessibility obstacles
- `facilitators` - Accessibility helpers  
- `accessible_pois` - Wheelchair-friendly places
- `reports` - Community reports (auto-created)

### 4. Sample Data Structure

```json
{
  "type": "barrier",
  "coordinates": [28.6139, 77.2090],
  "tags": {
    "barrier": "steps",
    "description": "5 steps at entrance",
    "wheelchair": "no"
  },
  "createdAt": "timestamp",
  "userId": "user_id"
}
```

## Development

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run build
npm run preview
```

## Contributing

AccessPath thrives on community contributions. Users can report accessibility points directly on the map to help build a comprehensive accessibility database for Delhi.

## Technologies Used

- React 18 with TypeScript
- Google Maps JavaScript API
- Firebase Firestore & Authentication
- Tailwind CSS
- Lucide React Icons
- Vite

## License

MIT License - Built with ❤️ for accessibility