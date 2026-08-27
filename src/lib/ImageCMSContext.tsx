import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { db, logActivity } from './firebase';
import {
  DEFAULT_IMAGE_REGISTRY,
  REGISTRY_MAP,
  IMAGE_KEY_ALIASES,
  DEFAULT_SLOT_FALLBACKS,
  GLOBAL_FALLBACK_IMAGE,
  getDefaultSlotFallback,
  type CMSImageItem
} from './imageRegistry';
import { normalizeImageUrl } from './imageUtils';
import { useAdmin } from './AdminContext';

const LOCAL_STORAGE_KEY = 'moderntech_cms_image_overrides_v3';

interface UpdateImageResult {
  success: boolean;
  savedToCloud: boolean;
  message?: string;
}

interface ImageCMSContextType {
  images: CMSImageItem[];
  getImage: (id: string, customFallback?: string) => string;
  getImageFallback: (id: string, customFallback?: string) => string;
  getImageItem: (id: string) => CMSImageItem | undefined;
  updateImage: (id: string, updates: Partial<CMSImageItem>) => Promise<UpdateImageResult>;
  toggleActive: (id: string) => Promise<UpdateImageResult>;
  restorePrevious: (id: string) => Promise<UpdateImageResult>;
  resetToDefault: (id: string) => Promise<UpdateImageResult>;
  deleteCustomImage: (id: string) => Promise<boolean>;
  addCustomImage: (item: Omit<CMSImageItem, 'updatedAt'>) => Promise<UpdateImageResult>;
  syncAllDefaults: () => Promise<{ success: boolean; count: number }>;
  clearLocalCache: () => void;
  isLoading: boolean;
  isSaving: boolean;
  version: number;
  slotFallbacks: Record<string, string>;
  globalFallback: string;
}

const ImageCMSContext = createContext<ImageCMSContextType | undefined>(undefined);

export function ImageCMSProvider({ children }: { children: React.ReactNode }) {
  // Load initial overrides from localStorage for zero-latency instant rendering
  const [cmsOverrides, setCmsOverrides] = useState<Record<string, Partial<CMSImageItem>>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse cached CMS image overrides:', e);
    }
    return {};
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [version, setVersion] = useState(0); // Trigger re-renders when overrides update
  const { currentUser, isAdmin } = useAdmin();

  // Save to localStorage whenever cmsOverrides change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cmsOverrides));
    } catch (e) {
      console.warn('Failed to write CMS overrides to localStorage:', e);
    }
  }, [cmsOverrides]);

  // Listen to Firestore `images` collection in real-time to keep UI in sync
  useEffect(() => {
    let isMounted = true;
    try {
      const colRef = collection(db, 'images');
      const unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
          if (!isMounted) return;
          const cloudOverrides: Record<string, Partial<CMSImageItem>> = {};
          snapshot.docs.forEach((docSnap) => {
            const data = docSnap.data();
            cloudOverrides[docSnap.id] = {
              id: docSnap.id,
              ...data,
            } as CMSImageItem;
          });

          // Merge cloud overrides with local state, giving priority to latest cloud data
          setCmsOverrides((prev) => ({
            ...prev,
            ...cloudOverrides,
          }));
          setIsLoading(false);
          setVersion((v) => v + 1);
        },
        (error) => {
          console.warn('Firestore images subscription info (using local registry & storage cache):', error.message);
          setIsLoading(false);
        }
      );

      return () => {
        isMounted = false;
        unsubscribe();
      };
    } catch (e) {
      console.warn('Could not establish real-time image listener on images collection:', e);
      setIsLoading(false);
    }
  }, []);

  // Also listen to Firestore `website_images` collection in real-time for full backwards compatibility
  useEffect(() => {
    let isMounted = true;
    try {
      const colRef = collection(db, 'website_images');
      const unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
          if (!isMounted) return;
          const cloudOverrides: Record<string, Partial<CMSImageItem>> = {};
          snapshot.docs.forEach((docSnap) => {
            const data = docSnap.data();
            cloudOverrides[docSnap.id] = {
              id: docSnap.id,
              ...data,
            } as CMSImageItem;
          });

          setCmsOverrides((prev) => ({
            ...prev,
            ...cloudOverrides,
          }));
          setIsLoading(false);
          setVersion((v) => v + 1);
        },
        (error) => {
          console.warn('Firestore website_images subscription info:', error.message);
        }
      );

      return () => {
        isMounted = false;
        unsubscribe();
      };
    } catch (e) {
      console.warn('Could not establish real-time image listener on website_images collection:', e);
    }
  }, []);

  // Merge default registry items with any overrides
  const mergedImages: CMSImageItem[] = React.useMemo(() => {
    const knownKeys = new Set(DEFAULT_IMAGE_REGISTRY.map((i) => i.id));
    
    // Process default registry items
    const combined: CMSImageItem[] = DEFAULT_IMAGE_REGISTRY.map((defaultItem) => {
      // Check direct ID and aliases
      const override = cmsOverrides[defaultItem.id];
      if (!override) return defaultItem;

      const fallbackUrl = defaultItem.defaultUrl || defaultItem.url || GLOBAL_FALLBACK_IMAGE;
      const normalizedUrl = override.url !== undefined && override.url.trim() !== ''
        ? normalizeImageUrl(override.url).url
        : fallbackUrl;

      return {
        ...defaultItem,
        ...override,
        url: normalizedUrl,
        active: override.active !== undefined ? override.active : defaultItem.active,
        previousUrl: override.previousUrl || defaultItem.previousUrl
      };
    });

    // Append any extra custom images created in CMS that aren't in default list
    Object.keys(cmsOverrides).forEach((key) => {
      if (!knownKeys.has(key)) {
        const custom = cmsOverrides[key] as CMSImageItem;
        if (custom && custom.id) {
          const normUrl = custom.url ? normalizeImageUrl(custom.url).url : '';
          combined.push({
            id: custom.id,
            title: custom.title || custom.id,
            page: custom.page || 'Global',
            section: custom.section || 'General',
            description: custom.description || 'Custom added CMS image',
            defaultUrl: custom.defaultUrl || normUrl || GLOBAL_FALLBACK_IMAGE,
            url: normUrl || custom.defaultUrl || GLOBAL_FALLBACK_IMAGE,
            previousUrl: custom.previousUrl,
            active: custom.active !== undefined ? custom.active : true,
            aspectRatio: custom.aspectRatio || '16:9',
            altText: custom.altText || custom.title,
            updatedAt: custom.updatedAt,
            updatedBy: custom.updatedBy
          });
        }
      }
    });

    return combined;
  }, [cmsOverrides, version]);

  // Resolves the default fallback image URL for any slot
  const getImageFallback = useCallback((id: string, customFallback?: string): string => {
    return getDefaultSlotFallback(id, customFallback);
  }, []);

  // Resolves the active image URL for components with guaranteed fallback
  const getImage = useCallback((id: string, customFallback?: string): string => {
    const defaultFallback = getDefaultSlotFallback(id, customFallback);
    if (!id) return defaultFallback;

    const resolvedId = IMAGE_KEY_ALIASES[id] || id;
    const override = cmsOverrides[resolvedId] || cmsOverrides[id];
    const defaultItem = REGISTRY_MAP[resolvedId] || REGISTRY_MAP[id];

    // If override exists and is inactive, return fallback
    if (override) {
      if (override.active === false) {
        return defaultFallback;
      }
      if (override.url && typeof override.url === 'string' && override.url.trim() !== '') {
        const normalized = normalizeImageUrl(override.url.trim()).url;
        if (normalized) return normalized;
      }
      // If override URL is empty, use default fallback
      return defaultFallback;
    }

    if (defaultItem) {
      if (defaultItem.active === false) {
        return defaultFallback;
      }
      const rawDefault = defaultItem.url || defaultItem.defaultUrl;
      if (rawDefault && typeof rawDefault === 'string' && rawDefault.trim() !== '') {
        const normalized = normalizeImageUrl(rawDefault.trim()).url;
        if (normalized) return normalized;
      }
      return defaultFallback;
    }

    return defaultFallback;
  }, [cmsOverrides]);

  const getImageItem = useCallback((id: string): CMSImageItem | undefined => {
    const resolvedId = IMAGE_KEY_ALIASES[id] || id;
    return mergedImages.find((item) => item.id === resolvedId || item.id === id);
  }, [mergedImages]);

  // Update image in state, localStorage, and Firestore, then trigger frontend state update
  const updateImage = async (id: string, updates: Partial<CMSImageItem>): Promise<UpdateImageResult> => {
    setIsSaving(true);
    const resolvedId = IMAGE_KEY_ALIASES[id] || id;
    const currentItem = getImageItem(resolvedId) || getImageItem(id);
    const existingUrl = currentItem?.url || '';

    // Normalize new URL or fall back to slot default if empty
    const rawNewUrl = updates.url !== undefined ? updates.url.trim() : existingUrl;
    const normalizedNewUrl = rawNewUrl ? normalizeImageUrl(rawNewUrl).url : getDefaultSlotFallback(resolvedId);

    // Determine previous URL
    const previousUrl = (normalizedNewUrl !== existingUrl && existingUrl) 
      ? existingUrl 
      : (updates.previousUrl || currentItem?.previousUrl);

    const payload: Partial<CMSImageItem> = {
      ...updates,
      id: resolvedId,
      url: normalizedNewUrl,
      previousUrl: previousUrl || undefined,
      updatedAt: Date.now(),
      updatedBy: currentUser?.email || 'admin'
    };

    // 1. Instant Optimistic State & LocalStorage Update for frontend components
    setCmsOverrides((prev) => {
      const next = {
        ...prev,
        [resolvedId]: {
          ...(prev[resolvedId] || {}),
          ...payload
        }
      };
      if (id !== resolvedId) {
        next[id] = { ...(prev[id] || {}), ...payload };
      }
      return next;
    });
    setVersion((v) => v + 1);

    // 2. Attempt Firestore Cloud Sync to 'images' and 'website_images' collections
    let savedToCloud = false;
    let message = 'Image updated locally in browser and cache.';

    try {
      // Primary write to 'images' collection
      const imagesDocRef = doc(db, 'images', resolvedId);
      await setDoc(imagesDocRef, payload, { merge: true });

      // Secondary write to 'website_images' collection for multi-collection support
      try {
        const websiteImagesDocRef = doc(db, 'website_images', resolvedId);
        await setDoc(websiteImagesDocRef, payload, { merge: true });
      } catch (err) {
        // secondary write error is non-fatal
      }

      savedToCloud = true;
      message = 'Image successfully updated in Firestore cloud database and synchronized!';

      // Trigger frontend state update after successful Firestore write
      setCmsOverrides((prev) => {
        const next = {
          ...prev,
          [resolvedId]: {
            ...(prev[resolvedId] || {}),
            ...payload
          }
        };
        if (id !== resolvedId) {
          next[id] = { ...(prev[id] || {}), ...payload };
        }
        return next;
      });
      setVersion((v) => v + 1);

      logActivity('cms_image_updated', {
        imageId: resolvedId,
        title: updates.title || currentItem?.title,
        newUrl: normalizedNewUrl,
        adminEmail: currentUser?.email || 'admin'
      }).catch(() => {});
    } catch (error: any) {
      console.warn('Firestore cloud sync notice (saved to local persistent cache):', error?.message || error);
      if (!currentUser) {
        message = 'Image rendered and saved locally. Note: To persist for all public visitors on the cloud, please sign in with an authorized Google admin account.';
      } else if (!isAdmin) {
        message = 'Image saved locally. Cloud synchronization requires administrator privileges.';
      } else {
        message = 'Image rendered locally. Cloud database synchronization encountered a temporary network delay.';
      }
    } finally {
      setIsSaving(false);
    }

    return {
      success: true,
      savedToCloud,
      message
    };
  };

  // Toggle image active state
  const toggleActive = async (id: string): Promise<UpdateImageResult> => {
    const current = getImageItem(id);
    if (!current) return { success: false, savedToCloud: false, message: 'Image not found' };
    const nextActive = !current.active;
    return updateImage(id, { active: nextActive });
  };

  // Restore previous URL
  const restorePrevious = async (id: string): Promise<UpdateImageResult> => {
    const current = getImageItem(id);
    if (!current || !current.previousUrl) {
      return { success: false, savedToCloud: false, message: 'No previous URL found in history' };
    }
    return updateImage(id, {
      url: current.previousUrl,
      previousUrl: current.url
    });
  };

  // Reset to default bundled URL
  const resetToDefault = async (id: string): Promise<UpdateImageResult> => {
    const resolvedId = IMAGE_KEY_ALIASES[id] || id;
    const current = getImageItem(resolvedId) || getImageItem(id);
    const defaultUrl = current?.defaultUrl || getDefaultSlotFallback(resolvedId);
    if (!defaultUrl) {
      return { success: false, savedToCloud: false, message: 'No default URL found' };
    }
    return updateImage(resolvedId, {
      url: defaultUrl,
      previousUrl: current?.url,
      active: true
    });
  };

  // Delete custom image override
  const deleteCustomImage = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    const resolvedId = IMAGE_KEY_ALIASES[id] || id;

    // Remove from local state
    setCmsOverrides((prev) => {
      const next = { ...prev };
      delete next[resolvedId];
      delete next[id];
      return next;
    });
    setVersion((v) => v + 1);

    try {
      await deleteDoc(doc(db, 'images', resolvedId));
      try {
        await deleteDoc(doc(db, 'website_images', resolvedId));
      } catch (e) {
        // secondary delete error is non-fatal
      }
      logActivity('cms_image_deleted', { imageId: resolvedId, adminEmail: currentUser?.email }).catch(() => {});
      return true;
    } catch (error) {
      console.warn('Error deleting image from Firestore:', error);
      return true; // Still removed from local cache
    } finally {
      setIsSaving(false);
    }
  };

  // Add a brand new custom image item
  const addCustomImage = async (item: Omit<CMSImageItem, 'updatedAt'>): Promise<UpdateImageResult> => {
    setIsSaving(true);
    const formattedId = item.id.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const normUrl = normalizeImageUrl(item.url).url || GLOBAL_FALLBACK_IMAGE;

    const payload = {
      ...item,
      id: formattedId,
      url: normUrl,
      defaultUrl: item.defaultUrl ? normalizeImageUrl(item.defaultUrl).url : normUrl,
      updatedAt: Date.now(),
      updatedBy: currentUser?.email || 'admin'
    };

    // Update local state
    setCmsOverrides((prev) => ({
      ...prev,
      [formattedId]: payload
    }));
    setVersion((v) => v + 1);

    let savedToCloud = false;
    let message = 'New custom image added locally!';

    try {
      const imagesDocRef = doc(db, 'images', formattedId);
      await setDoc(imagesDocRef, payload);
      try {
        const websiteImagesDocRef = doc(db, 'website_images', formattedId);
        await setDoc(websiteImagesDocRef, payload);
      } catch (e) {}

      savedToCloud = true;
      message = 'Custom image created and saved to Firestore database!';
      logActivity('cms_image_created', { imageId: formattedId, title: item.title, adminEmail: currentUser?.email }).catch(() => {});
    } catch (error: any) {
      console.warn('Firestore cloud sync notice for new image:', error);
      message = 'Custom image saved in local session. Sign in with admin account for cloud sync.';
    } finally {
      setIsSaving(false);
    }

    return { success: true, savedToCloud, message };
  };

  // Sync all default items into Firestore
  const syncAllDefaults = async (): Promise<{ success: boolean; count: number }> => {
    setIsSaving(true);
    let count = 0;
    try {
      for (const item of DEFAULT_IMAGE_REGISTRY) {
        const payload = {
          ...item,
          updatedAt: Date.now(),
          updatedBy: currentUser?.email || 'system'
        };
        const imagesDocRef = doc(db, 'images', item.id);
        await setDoc(imagesDocRef, payload, { merge: true });
        try {
          const websiteImagesDocRef = doc(db, 'website_images', item.id);
          await setDoc(websiteImagesDocRef, payload, { merge: true });
        } catch (e) {}
        count++;
      }
      logActivity('cms_all_defaults_synced', { count, adminEmail: currentUser?.email }).catch(() => {});
      return { success: true, count };
    } catch (error) {
      console.warn('Error syncing default images to Firestore:', error);
      return { success: false, count };
    } finally {
      setIsSaving(false);
    }
  };

  // Clear local cache helper
  const clearLocalCache = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setCmsOverrides({});
      setVersion((v) => v + 1);
    } catch (e) {
      console.warn('Failed to clear local CMS cache:', e);
    }
  };

  return (
    <ImageCMSContext.Provider
      value={{
        images: mergedImages,
        getImage,
        getImageFallback,
        getImageItem,
        updateImage,
        toggleActive,
        restorePrevious,
        resetToDefault,
        deleteCustomImage,
        addCustomImage,
        syncAllDefaults,
        clearLocalCache,
        isLoading,
        isSaving,
        version,
        slotFallbacks: DEFAULT_SLOT_FALLBACKS,
        globalFallback: GLOBAL_FALLBACK_IMAGE
      }}
    >
      {children}
    </ImageCMSContext.Provider>
  );
}

export function useImageCMS() {
  const context = useContext(ImageCMSContext);
  if (!context) {
    throw new Error('useImageCMS must be used within an ImageCMSProvider');
  }
  return context;
}


