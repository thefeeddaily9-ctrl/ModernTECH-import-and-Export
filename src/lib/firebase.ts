import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp,
  type Firestore 
} from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';
import type { Inquiry } from '../types';

export const ADMIN_EMAILS = [
  'abdi@moderntechethiopia.com',
  'thefeeddaily9@gmail.com',
  'brakilu7@gmail.com',
  'info@moderntechethiopia.com',
  'moderntechplc@gmail.com',
  'abdi.edao@gmail.com',
  'abdi@moderntechplc.com'
].map(e => e.toLowerCase().trim());

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with custom databaseId if configured
export const db: Firestore = firebaseConfigJson.firestoreDatabaseId && firebaseConfigJson.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfigJson.firestoreDatabaseId)
  : getFirestore(app);

// Helper to save client inquiry
export async function saveInquiry(data: Omit<Inquiry, 'id' | 'createdAt' | 'status'> & { status?: Inquiry['status'] }): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'inquiries'), {
      ...data,
      status: data.status || 'new',
      createdAt: Date.now(),
      createdServerAt: serverTimestamp(),
    });
    
    // Also log activity
    logActivity('form_inquiry_submitted', {
      inquiryId: docRef.id,
      product: data.subject,
      buyerName: data.name,
      buyerEmail: data.email,
    }).catch(() => {});

    return docRef.id;
  } catch (error) {
    console.error('Error saving inquiry to Firebase:', error);
    throw error;
  }
}

// Helper to log user activity
export async function logActivity(action: string, details: Record<string, any> = {}) {
  try {
    await addDoc(collection(db, 'activity_logs'), {
      action,
      details,
      page: window.location.pathname,
      userAgent: navigator.userAgent.substring(0, 100),
      timestamp: Date.now(),
      serverAt: serverTimestamp(),
    });
  } catch (error) {
    // Non-blocking activity logging
    console.debug('Activity logging error:', error);
  }
}
