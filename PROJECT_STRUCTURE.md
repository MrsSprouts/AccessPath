# AccessPath - Complete Project Structure

This document contains the complete project structure and all source code for the AccessPath accessibility navigation app.

## Project Overview

AccessPath is a React-based accessibility navigation app that uses Google Maps and Firebase Firestore to help users navigate Delhi with accessibility information.

## Directory Structure

```
accesspath/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── LoadingSpinner.tsx
│   │   ├── Map.tsx
│   │   ├── ReportModal.tsx
│   │   └── Sidebar.tsx
│   ├── firebase/
│   │   └── config.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useFirestore.ts
│   │   └── useTheme.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Package.json

```json
{
  "name": "accesspath",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@googlemaps/js-api-loader": "^1.16.10",
    "firebase": "^12.0.0",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

## Configuration Files

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
};
```

### tsconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### tsconfig.app.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### eslint.config.js
```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
```

## HTML Template

### index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="AccessPath - Community-driven accessibility mapping for Delhi, India" />
    <meta name="keywords" content="accessibility, wheelchair, barriers, navigation, Delhi, India" />
    <title>AccessPath - Accessibility Navigation</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## Source Code

### src/main.tsx
```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### src/vite-env.d.ts
```typescript
/// <reference types="vite/client" />
```

### src/types/index.ts
```typescript
export interface AccessibilityPoint {
  id: string;
  type: 'barrier' | 'facilitator' | 'poi';
  coordinates: [number, number]; // [latitude, longitude]
  tags: Record<string, string>;
  createdAt?: any;
  userId?: string;
}

export interface Report {
  id: string;
  type: 'barrier' | 'facilitator' | 'poi';
  coordinates: [number, number];
  description: string;
  tags: Record<string, string>;
  createdAt: any;
  userId?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface MapLayers {
  barriers: boolean;
  facilitators: boolean;
  pois: boolean;
}

export interface User {
  uid: string;
  displayName?: string;
  email?: string;
}
```

### src/firebase/config.ts
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
```

### src/hooks/useFirestore.ts
```typescript
import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { AccessibilityPoint, Report } from '../types';

export const useAccessibilityData = () => {
  const [barriers, setBarriers] = useState<AccessibilityPoint[]>([]);
  const [facilitators, setFacilitators] = useState<AccessibilityPoint[]>([]);
  const [pois, setPois] = useState<AccessibilityPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeBarriers = onSnapshot(
      query(collection(db, 'barriers'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AccessibilityPoint[];
        setBarriers(data);
      }
    );

    const unsubscribeFacilitators = onSnapshot(
      query(collection(db, 'facilitators'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AccessibilityPoint[];
        setFacilitators(data);
      }
    );

    const unsubscribePois = onSnapshot(
      query(collection(db, 'accessible_pois'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AccessibilityPoint[];
        setPois(data);
        setLoading(false);
      }
    );

    return () => {
      unsubscribeBarriers();
      unsubscribeFacilitators();
      unsubscribePois();
    };
  }, []);

  return { barriers, facilitators, pois, loading };
};

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'reports'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Report[];
        setReports(data);
      }
    );

    return () => unsubscribe();
  }, []);

  return reports;
};

export const submitReport = async (report: Omit<Report, 'id' | 'createdAt'>) => {
  try {
    await addDoc(collection(db, 'reports'), {
      ...report,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting report:', error);
    return { success: false, error };
  }
};
```

### src/hooks/useAuth.ts
```typescript
import { useState, useEffect } from 'react';
import { 
  signInAnonymously, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || undefined,
          email: firebaseUser.email || undefined,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInAnonymous = async () => {
    try {
      await signInAnonymously(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    user,
    loading,
    signInAnonymous,
    signInWithGoogle,
    logout
  };
};
```

### src/hooks/useTheme.ts
```typescript
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return {
    isDark,
    toggleTheme: () => setIsDark(!isDark)
  };
};
```

### src/components/LoadingSpinner.tsx
```typescript
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Loading AccessPath
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Preparing your accessibility map...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
```

### src/components/Map.tsx
```typescript
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { AccessibilityPoint, MapLayers } from '../types';

interface MapProps {
  layers: MapLayers;
  barriers: AccessibilityPoint[];
  facilitators: AccessibilityPoint[];
  pois: AccessibilityPoint[];
  onMapRightClick: (lat: number, lng: number) => void;
  isDark: boolean;
}

const Map: React.FC<MapProps> = ({ 
  layers, 
  barriers, 
  facilitators, 
  pois, 
  onMapRightClick,
  isDark 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getIconForType = (point: AccessibilityPoint): string => {
    const iconBase = 'data:image/svg+xml;base64,';
    let svg = '';
    let color = '';
    
    if (point.type === 'barrier') {
      color = '#ef4444'; // red
      if (point.tags.barrier === 'steps') {
        svg = createSVGIcon('M2 18h20l-4-8h-12l-4 8zm10-6l2 4h-4l2-4z', color);
      } else {
        svg = createSVGIcon('M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', color);
      }
    } else if (point.type === 'facilitator') {
      color = '#22c55e'; // green
      if (point.tags.amenity === 'elevator') {
        svg = createSVGIcon('M7 2h10v20H7V2zm2 2v16h6V4H9zm2 2h2v2h-2V6zm0 4h2v2h-2v-2z', color);
      } else {
        svg = createSVGIcon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', color);
      }
    } else {
      color = '#3b82f6'; // blue
      svg = createSVGIcon('M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z', color);
    }
    
    return iconBase + btoa(svg);
  };

  const createSVGIcon = (path: string, color: string): string => {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="${path}" fill="${color}" stroke="#ffffff" stroke-width="0.5"/>
    </svg>`;
  };

  const createInfoWindow = (point: AccessibilityPoint): string => {
    const typeLabels = {
      barrier: 'Accessibility Barrier',
      facilitator: 'Accessibility Helper',
      poi: 'Accessible Place'
    };

    const tagsList = Object.entries(point.tags)
      .map(([key, value]) => `<div class="flex justify-between"><span class="font-medium">${key}:</span><span>${value}</span></div>`)
      .join('');

    return `
      <div class="p-4 max-w-sm">
        <h3 class="font-bold text-lg mb-2 text-gray-800">${typeLabels[point.type]}</h3>
        <div class="space-y-1 text-sm text-gray-600">
          ${tagsList}
        </div>
        ${point.tags.description ? `<p class="mt-3 text-sm text-gray-700 italic">${point.tags.description}</p>` : ''}
      </div>
    `;
  };

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
  };

  const addMarkers = useCallback(() => {
    if (!mapInstanceRef.current) return;

    clearMarkers();
    const allPoints = [
      ...(layers.barriers ? barriers : []),
      ...(layers.facilitators ? facilitators : []),
      ...(layers.pois ? pois : [])
    ];

    allPoints.forEach(point => {
      const marker = new google.maps.Marker({
        position: { lat: point.coordinates[0], lng: point.coordinates[1] },
        map: mapInstanceRef.current,
        title: point.tags.description || `${point.type} point`,
        icon: {
          url: getIconForType(point),
          scaledSize: new google.maps.Size(30, 30),
          anchor: new google.maps.Point(15, 15)
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: createInfoWindow(point)
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });
  }, [layers, barriers, facilitators, pois]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your API key
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      if (!mapRef.current) return;

      const mapStyles = isDark ? [
        { elementType: 'geometry', stylers: [{ color: '#212121' }] },
        { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
        {
          featureType: 'administrative',
          elementType: 'geometry',
          stylers: [{ color: '#757575' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.fill',
          stylers: [{ color: '#2c2c2c' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#000000' }]
        }
      ] : [];

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 28.6139, lng: 77.2090 }, // Delhi coordinates
        zoom: 12,
        styles: mapStyles,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      mapInstanceRef.current = map;

      // Add right-click listener for reporting
      map.addListener('rightclick', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          onMapRightClick(event.latLng.lat(), event.latLng.lng());
        }
      });

      // Add long-press listener for mobile
      let longPressTimer: NodeJS.Timeout;
      map.addListener('mousedown', (event: google.maps.MapMouseEvent) => {
        longPressTimer = setTimeout(() => {
          if (event.latLng) {
            onMapRightClick(event.latLng.lat(), event.latLng.lng());
          }
        }, 500);
      });

      map.addListener('mouseup', () => {
        clearTimeout(longPressTimer);
      });

      setIsLoaded(true);
    });
  }, [onMapRightClick, isDark]);

  useEffect(() => {
    if (isLoaded) {
      addMarkers();
    }
  }, [isLoaded, addMarkers]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg shadow-lg"
      role="application"
      aria-label="Interactive accessibility map of Delhi"
    />
  );
};

export default Map;
```

### src/components/ReportModal.tsx
```typescript
import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';
import { submitReport } from '../hooks/useFirestore';
import { useAuth } from '../hooks/useAuth';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  coordinates: [number, number] | null;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, coordinates }) => {
  const [reportType, setReportType] = useState<'barrier' | 'facilitator' | 'poi'>('barrier');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { user } = useAuth();

  const resetForm = () => {
    setReportType('barrier');
    setDescription('');
    setTags({});
    setSubmitStatus('idle');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coordinates || !user) return;

    setIsSubmitting(true);
    
    const report = {
      type: reportType,
      coordinates,
      description,
      tags: {
        ...tags,
        description,
        ...(reportType === 'barrier' && { barrier: tags.barrier || 'unknown' }),
        ...(reportType === 'facilitator' && { amenity: tags.amenity || 'unknown' }),
        ...(reportType === 'poi' && { 
          wheelchair: tags.wheelchair || 'yes',
          amenity: tags.amenity || 'unknown'
        })
      },
      userId: user.uid
    };

    const result = await submitReport(report);
    
    if (result.success) {
      setSubmitStatus('success');
      setTimeout(() => {
        handleClose();
      }, 2000);
    } else {
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
  };

  const addTag = (key: string, value: string) => {
    setTags(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Report Accessibility Point
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {coordinates && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center text-sm text-blue-700 dark:text-blue-300">
                <MapPin size={16} className="mr-2" />
                Location: {coordinates[0].toFixed(6)}, {coordinates[1].toFixed(6)}
              </div>
            </div>
          )}

          {submitStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                <CheckCircle size={16} className="mr-2" />
                Report submitted successfully! Thank you for contributing.
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="flex items-center text-sm text-red-700 dark:text-red-300">
                <AlertTriangle size={16} className="mr-2" />
                Error submitting report. Please try again.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Report Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'barrier', label: 'Barrier', color: 'red' },
                  { value: 'facilitator', label: 'Helper', color: 'green' },
                  { value: 'poi', label: 'Accessible Place', color: 'blue' }
                ].map(({ value, label, color }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setReportType(value as any)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      reportType === value
                        ? `border-${color}-500 bg-${color}-50 dark:bg-${color}-900/20 text-${color}-700 dark:text-${color}-300`
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
                placeholder="Describe the accessibility feature or issue..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {reportType === 'barrier' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Barrier Type
                </label>
                <select
                  value={tags.barrier || ''}
                  onChange={(e) => addTag('barrier', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select barrier type</option>
                  <option value="steps">Steps/Stairs</option>
                  <option value="narrow">Narrow passage</option>
                  <option value="broken_sidewalk">Broken sidewalk</option>
                  <option value="no_ramp">Missing ramp</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            {reportType === 'facilitator' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Helper Type
                </label>
                <select
                  value={tags.amenity || ''}
                  onChange={(e) => addTag('amenity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select helper type</option>
                  <option value="elevator">Elevator</option>
                  <option value="ramp">Ramp</option>
                  <option value="accessible_entrance">Accessible entrance</option>
                  <option value="accessible_parking">Accessible parking</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            {reportType === 'poi' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Place Type
                  </label>
                  <select
                    value={tags.amenity || ''}
                    onChange={(e) => addTag('amenity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select place type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="shop">Shop</option>
                    <option value="hospital">Hospital</option>
                    <option value="school">School</option>
                    <option value="bank">Bank</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Wheelchair Accessibility
                  </label>
                  <select
                    value={tags.wheelchair || 'yes'}
                    onChange={(e) => addTag('wheelchair', e.target.value)}
                    className="A-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="yes">Fully accessible</option>
                    <option value="limited">Limited accessibility</option>
                    <option value="no">Not accessible</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !user}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>

          {!user && (
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Please sign in to submit reports
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
```

### src/components/Sidebar.tsx
```typescript
import React from 'react';
import { 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  Plus,
  Moon,
  Sun,
  LogIn,
  LogOut,
  User
} from 'lucide-react';
import { MapLayers } from '../types';
import { useAuth } from '../hooks/useAuth';

interface SidebarProps {
  layers: MapLayers;
  onLayerToggle: (layer: keyof MapLayers) => void;
  onReportClick: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  layers, 
  onLayerToggle, 
  onReportClick,
  isDark,
  onThemeToggle 
}) => {
  const { user, signInAnonymous, signInWithGoogle, logout } = useAuth();

  const layerConfig = [
    {
      key: 'barriers' as keyof MapLayers,
      label: 'Barriers',
      icon: AlertTriangle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800'
    },
    {
      key: 'facilitators' as keyof MapLayers,
      label: 'Helpers',
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      key: 'pois' as keyof MapLayers,
      label: 'Accessible Places',
      icon: MapPin,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    }
  ];

  return (
    <div className="w-80 bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          AccessPath
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Community-driven accessibility mapping for Delhi
        </p>
      </div>

      {/* User Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        {user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <User size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.displayName || 'Anonymous User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.email || 'Signed in'}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sign in to report accessibility points
            </p>
            <div className="flex space-x-2">
              <button
                onClick={signInAnonymous}
                className="flex-1 px-3 py-2 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Anonymous
              </button>
              <button
                onClick={signInWithGoogle}
                className="flex-1 px-3 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Google
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 space-y-4 flex-1">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Theme
          </span>
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? (
              <Sun size={16} className="text-yellow-500" />
            ) : (
              <Moon size={16} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Layer Controls */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Map Layers
          </h3>
          <div className="space-y-2">
            {layerConfig.map(({ key, label, icon: Icon, color, bgColor, borderColor }) => (
              <button
                key={key}
                onClick={() => onLayerToggle(key)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                  layers[key]
                    ? `${bgColor} ${borderColor}`
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={20} className={layers[key] ? color : 'text-gray-400 dark:text-gray-500'} />
                  <span className={`text-sm font-medium ${
                    layers[key] ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {label}
                  </span>
                </div>
                {layers[key] ? (
                  <Eye size={16} className={color} />
                ) : (
                  <EyeOff size={16} className="text-gray-400 dark:text-gray-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Report Button */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Contribute
          </h3>
          <button
            onClick={onReportClick}
            disabled={!user}
            className="w-full flex items-center justify-center space-x-2 p-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white disabled:text-gray-500 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            <Plus size={20} />
            <span className="font-medium">Report Accessibility Point</span>
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Right-click or long-press on the map to report
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Built with ❤️ for accessibility
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
```

### src/App.tsx
```typescript
import React, { useState } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import ReportModal from './components/ReportModal';
import LoadingSpinner from './components/LoadingSpinner';
import { useAccessibilityData } from './hooks/useFirestore';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { MapLayers } from './types';

function App() {
  const [layers, setLayers] = useState<MapLayers>({
    barriers: true,
    facilitators: true,
    pois: true
  });
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportCoordinates, setReportCoordinates] = useState<[number, number] | null>(null);

  const { barriers, facilitators, pois, loading } = useAccessibilityData();
  const { loading: authLoading } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLayerToggle = (layer: keyof MapLayers) => {
    setLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const handleMapRightClick = (lat: number, lng: number) => {
    setReportCoordinates([lat, lng]);
    setIsReportModalOpen(true);
  };

  const handleReportClick = () => {
    // For manual reporting, we can set coordinates to Delhi center
    setReportCoordinates([28.6139, 77.2090]);
    setIsReportModalOpen(true);
  };

  if (loading || authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`h-screen flex ${isDark ? 'dark' : ''}`}>
      <div className="flex w-full h-full bg-gray-50 dark:bg-gray-900">
        <Sidebar
          layers={layers}
          onLayerToggle={handleLayerToggle}
          onReportClick={handleReportClick}
          isDark={isDark}
          onThemeToggle={toggleTheme}
        />
        
        <div className="flex-1 p-4">
          <Map
            layers={layers}
            barriers={barriers}
            facilitators={facilitators}
            pois={pois}
            onMapRightClick={handleMapRightClick}
            isDark={isDark}
          />
        </div>
      </div>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false);
          setReportCoordinates(null);
        }}
        coordinates={reportCoordinates}
      />
    </div>
  );
}

export default App;
```

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Firebase Configuration**:
   - Create a Firebase project
   - Enable Firestore and Authentication
   - Replace the config in `src/firebase/config.ts`

3. **Google Maps API**:
   - Get an API key from Google Cloud Console
   - Replace `YOUR_GOOGLE_MAPS_API_KEY` in `src/components/Map.tsx`

4. **Run the Application**:
   ```bash
   npm run dev
   ```

## Features

- Interactive Google Maps with accessibility layers
- Real-time Firebase Firestore integration
- Community reporting system
- Firebase Authentication (Anonymous & Google)
- Dark/Light mode toggle
- Responsive design with Tailwind CSS
- Custom SVG icons for different marker types
- Accessibility-focused UI design

## Firestore Collections

The app expects these collections:
- `barriers` - Accessibility obstacles
- `facilitators` - Accessibility helpers
- `accessible_pois` - Wheelchair-friendly places
- `reports` - Community reports (auto-created)

This complete project structure can be used to recreate the AccessPath application in any environment.