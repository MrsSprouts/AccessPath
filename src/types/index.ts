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