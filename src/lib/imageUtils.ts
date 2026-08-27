/**
 * Image URL normalization, sanitization, and fallback helpers.
 * Handles common pasted image URL formats (Google search results, Google Drive,
 * Dropbox, Imgur, Unsplash webpage links, etc.) and provides robust fallback logic.
 */

export interface NormalizedUrlResult {
  url: string;
  isTransformed: boolean;
  type: 'direct' | 'google_image' | 'google_drive' | 'dropbox' | 'imgur' | 'unsplash' | 'local_asset' | 'data_uri' | 'invalid';
  message?: string;
}

/**
 * Automatically cleans and extracts direct image links from common user-pasted formats.
 */
export function normalizeImageUrl(rawInput: string): NormalizedUrlResult {
  if (!rawInput || typeof rawInput !== 'string') {
    return { url: '', isTransformed: false, type: 'invalid' };
  }

  let cleaned = rawInput.trim();

  // Strip wrapping quotes if any
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  // If local asset or relative path
  if (cleaned.startsWith('/') || cleaned.startsWith('./') || cleaned.startsWith('../')) {
    return { url: cleaned, isTransformed: false, type: 'local_asset' };
  }

  // If Data URI (Base64)
  if (cleaned.startsWith('data:image/')) {
    return { url: cleaned, isTransformed: false, type: 'data_uri' };
  }

  // Prepend https:// if protocol is missing
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    if (cleaned.startsWith('images.unsplash.com') || 
        cleaned.startsWith('images.pexels.com') || 
        cleaned.startsWith('cdn.') || 
        cleaned.startsWith('i.imgur.com') ||
        cleaned.includes('.com/') || 
        cleaned.includes('.org/') || 
        cleaned.includes('.net/')) {
      cleaned = 'https://' + cleaned;
    }
  }

  try {
    const urlObj = new URL(cleaned);

    // 1. Handle Google Images Search Results (e.g. google.com/imgres?imgurl=... or google.com/url?q=...)
    if (urlObj.hostname.includes('google.') && (urlObj.pathname.includes('/imgres') || urlObj.pathname.includes('/url'))) {
      const imgurlParam = urlObj.searchParams.get('imgurl') || urlObj.searchParams.get('url') || urlObj.searchParams.get('q');
      if (imgurlParam) {
        try {
          const decoded = decodeURIComponent(imgurlParam);
          if (decoded.startsWith('http://') || decoded.startsWith('https://')) {
            return {
              url: decoded,
              isTransformed: true,
              type: 'google_image',
              message: 'Extracted direct image source from Google Image Search link'
            };
          }
        } catch {
          // ignore decode error and continue
        }
      }
    }

    // 2. Handle Google Drive Sharing links
    // e.g. drive.google.com/file/d/FILE_ID/view?usp=sharing -> drive.google.com/uc?export=view&id=FILE_ID
    if (urlObj.hostname.includes('drive.google.com')) {
      const match = urlObj.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        const fileId = match[1];
        return {
          url: `https://drive.google.com/uc?export=view&id=${fileId}`,
          isTransformed: true,
          type: 'google_drive',
          message: 'Converted Google Drive link to direct image view stream'
        };
      }
    }

    // 3. Handle Dropbox links (e.g. dropbox.com/.../photo.jpg?dl=0 -> ?raw=1)
    if (urlObj.hostname.includes('dropbox.com')) {
      urlObj.searchParams.set('raw', '1');
      urlObj.searchParams.delete('dl');
      return {
        url: urlObj.toString(),
        isTransformed: true,
        type: 'dropbox',
        message: 'Converted Dropbox link to direct raw image format'
      };
    }

    // 4. Handle Imgur page links (e.g. imgur.com/abc123 -> i.imgur.com/abc123.jpg)
    if ((urlObj.hostname === 'imgur.com' || urlObj.hostname === 'www.imgur.com') && !urlObj.pathname.includes('/a/') && !urlObj.pathname.includes('/gallery/')) {
      const id = urlObj.pathname.replace(/^\//, '');
      if (id && !id.includes('.')) {
        return {
          url: `https://i.imgur.com/${id}.jpg`,
          isTransformed: true,
          type: 'imgur',
          message: 'Converted Imgur page to direct i.imgur.com photo link'
        };
      }
    }

    // 5. Handle Unsplash Webpage URLs (e.g. unsplash.com/photos/abc-123 -> source image)
    if ((urlObj.hostname === 'unsplash.com' || urlObj.hostname === 'www.unsplash.com') && urlObj.pathname.startsWith('/photos/')) {
      const parts = urlObj.pathname.split('/');
      const photoSlug = parts[parts.length - 1] || parts[parts.length - 2];
      if (photoSlug) {
        // Extract the photo ID from slug (usually after the last dash or entire string)
        const photoId = photoSlug.split('-').pop() || photoSlug;
        return {
          url: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=1600`,
          isTransformed: true,
          type: 'unsplash',
          message: 'Converted Unsplash webpage URL to high-resolution direct photo URL'
        };
      }
    }

    return {
      url: cleaned,
      isTransformed: cleaned !== rawInput.trim(),
      type: 'direct'
    };
  } catch {
    // If not a valid URL string
    return {
      url: cleaned,
      isTransformed: false,
      type: 'invalid',
      message: 'Invalid URL format'
    };
  }
}

/**
 * Pre-curated high quality presets for 1-click test in CMS
 */
export const CMS_PRESET_IMAGES = [
  {
    label: 'Ethiopian Specialty Coffee Beans',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1600',
    category: 'Coffee'
  },
  {
    label: 'Highland Coffee Farm Harvesting',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1600',
    category: 'Coffee'
  },
  {
    label: 'Artisanal Cupping & Quality Lab',
    url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1600',
    category: 'Coffee'
  },
  {
    label: 'Pure Gold Nuggets & Bullion',
    url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=1600',
    category: 'Minerals'
  },
  {
    label: 'Lithium & Mineral Crystals',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1600',
    category: 'Minerals'
  },
  {
    label: 'Industrial Mineral Mining Site',
    url: 'https://images.unsplash.com/photo-1516192511155-07202167386d?auto=format&fit=crop&q=80&w=1600',
    category: 'Minerals'
  },
  {
    label: 'Organic Sesame Seeds Harvest',
    url: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=1600',
    category: 'Seeds'
  },
  {
    label: 'Agricultural Soybeans & Pulses',
    url: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&q=80&w=1600',
    category: 'Seeds'
  },
  {
    label: 'Global Maritime Container Vessel',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600',
    category: 'Logistics'
  },
  {
    label: 'Port Cargo Terminal & Shipping Cranes',
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1600',
    category: 'Logistics'
  },
  {
    label: 'Modern Industrial Processing Mill',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600',
    category: 'Infrastructure'
  },
  {
    label: 'Modern Corporate Headquarters',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600',
    category: 'Corporate'
  }
];
