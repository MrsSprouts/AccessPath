import React, { useState } from 'react';
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
  User,
  Brain,
  Loader2,
  X
} from 'lucide-react';
import { MapLayers, AccessibilityPoint } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useAI } from '../hooks/useAI';

interface SidebarProps {
  layers: MapLayers;
  onLayerToggle: (layer: keyof MapLayers) => void;
  onReportClick: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
  barriers: AccessibilityPoint[];
  facilitators: AccessibilityPoint[];
  pois: AccessibilityPoint[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  layers, 
  onLayerToggle, 
  onReportClick,
  isDark,
  onThemeToggle,
  barriers,
  facilitators,
  pois
}) => {
  const { user, signInAnonymous, signInWithGoogle, logout } = useAuth();
  const { summarizeArea } = useAI();
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleAISummary = async () => {
    setIsLoadingSummary(true);
    setShowSummary(true);
    
    try {
      const allPoints = [...barriers, ...facilitators, ...pois];
      const summary = await summarizeArea({ points: allPoints });
      setAiSummary(summary);
    } catch (error) {
      setAiSummary('Sorry, unable to generate summary at this time. Please try again later.');
    } finally {
      setIsLoadingSummary(false);
    }
  };
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

        {/* AI Summary Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            AI Insights
          </h3>
          <button
            onClick={handleAISummary}
            disabled={isLoadingSummary}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 dark:disabled:bg-purple-800 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {isLoadingSummary ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Brain size={18} />
            )}
            <span className="font-medium">
              {isLoadingSummary ? 'Summarizing...' : 'AI Summary'}
            </span>
          </button>
          
          {showSummary && (
            <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Area Analysis
                </h4>
                <button
                  onClick={() => setShowSummary(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="Close summary"
                >
                  <X size={16} />
                </button>
              </div>
              
              {isLoadingSummary ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <Loader2 size={24} className="animate-spin text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Analyzing accessibility data...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="max-h-48 overflow-y-auto">
                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {aiSummary}
                  </div>
                </div>
              )}
            </div>
          )}
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