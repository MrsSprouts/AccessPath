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
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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