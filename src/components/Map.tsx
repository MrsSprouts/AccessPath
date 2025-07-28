import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { AccessibilityPoint, MapLayers } from '../types';
import { AlertTriangle, Armchair as Wheelchair, MapPin, Stars as Stairs, DoorOpen, Car, ShoppingBag, Coffee, Building } from 'lucide-react';

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