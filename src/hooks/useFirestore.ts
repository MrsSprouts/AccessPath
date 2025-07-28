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