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