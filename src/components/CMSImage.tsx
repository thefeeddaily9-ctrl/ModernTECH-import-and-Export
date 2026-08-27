import React, { useState, useEffect } from 'react';
import { useImageCMS } from '../lib/ImageCMSContext';
import {
  REGISTRY_MAP,
  IMAGE_KEY_ALIASES,
  getDefaultSlotFallback,
  GLOBAL_FALLBACK_IMAGE
} from '../lib/imageRegistry';
import { normalizeImageUrl } from '../lib/imageUtils';

export interface CMSImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageKey?: string;
  fallback?: string;
  aspectRatioHint?: string;
  alt?: string;
  className?: string;
  src?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  loading?: 'lazy' | 'eager';
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export default function CMSImage({
  imageKey,
  fallback,
  src: directSrc,
  alt,
  className = '',
  referrerPolicy = 'no-referrer',
  loading = 'lazy',
  onError,
  ...rest
}: CMSImageProps) {
  const { getImage, getImageFallback, version } = useImageCMS();
  const [loadStage, setLoadStage] = useState<'primary' | 'slot_fallback' | 'global_fallback'>('primary');

  const resolvedId = imageKey ? (IMAGE_KEY_ALIASES[imageKey] || imageKey) : undefined;
  const registryItem = resolvedId ? REGISTRY_MAP[resolvedId] : (imageKey ? REGISTRY_MAP[imageKey] : undefined);
  
  // Safe default fallback constant for this specific slot
  const slotDefaultFallback = normalizeImageUrl(
    fallback || (imageKey ? getImageFallback(imageKey) : '') || getDefaultSlotFallback(resolvedId, fallback)
  ).url;

  // Resolve current active primary target URL
  const rawTargetSrc = imageKey
    ? getImage(imageKey, slotDefaultFallback)
    : (directSrc || slotDefaultFallback || GLOBAL_FALLBACK_IMAGE);
    
  const primarySrc = normalizeImageUrl(rawTargetSrc).url || slotDefaultFallback || GLOBAL_FALLBACK_IMAGE;

  // Whenever the primary target URL or CMS version changes, reset to primary stage
  useEffect(() => {
    setLoadStage('primary');
  }, [primarySrc, version]);

  // Determine current active source to render based on load stage
  let activeSrc = primarySrc;
  if (loadStage === 'slot_fallback') {
    activeSrc = slotDefaultFallback || GLOBAL_FALLBACK_IMAGE;
  } else if (loadStage === 'global_fallback') {
    activeSrc = GLOBAL_FALLBACK_IMAGE;
  }

  // Ensure activeSrc is never empty
  if (!activeSrc || activeSrc.trim() === '') {
    activeSrc = slotDefaultFallback || GLOBAL_FALLBACK_IMAGE;
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (loadStage === 'primary') {
      if (slotDefaultFallback && slotDefaultFallback !== primarySrc) {
        // Step down to slot's default fallback asset
        setLoadStage('slot_fallback');
      } else {
        // Step down to global guaranteed fallback image
        setLoadStage('global_fallback');
      }
    } else if (loadStage === 'slot_fallback') {
      // Step down to global fallback
      setLoadStage('global_fallback');
    }

    if (onError) {
      onError(e);
    }
  };

  const finalAlt = alt || registryItem?.altText || registryItem?.title || 'Moderntech Global Trade Image';

  return (
    <img
      key={`${resolvedId || directSrc || 'cms'}-${loadStage}-${activeSrc}`}
      src={activeSrc}
      alt={finalAlt}
      className={className}
      loading={loading}
      decoding="async"
      referrerPolicy={referrerPolicy}
      onError={handleImageError}
      {...rest}
    />
  );
}

