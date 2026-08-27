import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Image as ImageIcon,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Copy,
  Layers,
  Sparkles,
  Link2,
  Globe,
  Sliders,
  Check,
  X,
  History,
  Info,
  ArrowRight,
  UploadCloud,
  HelpCircle,
  Database
} from 'lucide-react';
import { useImageCMS } from '../lib/ImageCMSContext';
import { type CMSImageItem, DEFAULT_IMAGE_REGISTRY } from '../lib/imageRegistry';
import { normalizeImageUrl, CMS_PRESET_IMAGES, type NormalizedUrlResult } from '../lib/imageUtils';
import { useAdmin } from '../lib/AdminContext';

const BUNDLED_ASSETS = [
  { label: 'Specialty Coffee Cherries & Beans (Dark)', path: '/assets/images/regenerated_image_1778502393186.png' },
  { label: 'Gold & Mineral Geology (High Grade)', path: '/assets/images/regenerated_image_1778505448378.png' },
  { label: 'Ethiopian Sesame & Soybeans Harvest', path: '/assets/images/regenerated_image_1778502399482.png' },
  { label: 'Industrial Processing Plant & Sorter', path: '/assets/images/regenerated_image_1778503816656.png' },
  { label: 'Moderntech Domestic Milling Facility', path: '/assets/images/regenerated_image_1778502385742.png' },
  { label: 'Highland Coffee Farm Estate', path: '/assets/images/regenerated_image_1778504163293.png' },
  { label: 'Export Grade Roasted & Green Coffee', path: '/assets/images/regenerated_image_1778504171098.png' },
  { label: 'Lithium & Tantalum Crystals', path: '/assets/images/regenerated_image_1778504652929.png' },
  { label: 'Rough Emeralds & Gemstones', path: '/assets/images/regenerated_image_1778504655777.png' },
  { label: 'Mining Extraction Site', path: '/assets/images/regenerated_image_1778505215239.png' },
  { label: 'Mineral Aggregation Center', path: '/assets/images/regenerated_image_1778505226563.png' },
  { label: 'Industrial Heavy Mining Rig', path: '/assets/images/regenerated_image_1778503049133.png' },
  { label: 'Quality Control Assay Lab', path: '/assets/images/regenerated_image_1778505230834.png' }
];

export default function ImageManagement() {
  const {
    images,
    updateImage,
    toggleActive,
    restorePrevious,
    resetToDefault,
    deleteCustomImage,
    addCustomImage,
    syncAllDefaults,
    clearLocalCache,
    isLoading,
    isSaving
  } = useImageCMS();

  const { currentUser, isAdmin } = useAdmin();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'modified'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Edit State
  const [editingItem, setEditingItem] = useState<CMSImageItem | null>(null);
  const [editUrlInput, setEditUrlInput] = useState('');
  const [editTitleInput, setEditTitleInput] = useState('');
  const [editAltInput, setEditAltInput] = useState('');
  const [editActiveState, setEditActiveState] = useState(true);
  const [previewTestStatus, setPreviewTestStatus] = useState<'idle' | 'testing' | 'valid' | 'error'>('idle');
  const [testDimensions, setTestDimensions] = useState<string | null>(null);
  const [urlTransformResult, setUrlTransformResult] = useState<NormalizedUrlResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // New Image Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newImageForm, setNewImageForm] = useState<Omit<CMSImageItem, 'updatedAt'>>({
    id: '',
    title: '',
    page: 'Home',
    section: '',
    description: '',
    defaultUrl: '',
    url: '',
    active: true,
    aspectRatio: '16:9',
    altText: ''
  });

  // Unique pages for filtering
  const availablePages = useMemo(() => {
    const pages = Array.from(new Set(images.map((img) => img.page)));
    return ['All', ...pages];
  }, [images]);

  // Filtered images list
  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      // Page filter
      if (selectedPage !== 'All' && img.page !== selectedPage) return false;

      // Status filter
      if (statusFilter === 'active' && !img.active) return false;
      if (statusFilter === 'inactive' && img.active) return false;
      if (statusFilter === 'modified' && img.url === img.defaultUrl) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = img.id.toLowerCase().includes(q);
        const matchesTitle = img.title.toLowerCase().includes(q);
        const matchesPage = img.page.toLowerCase().includes(q);
        const matchesSection = img.section.toLowerCase().includes(q);
        const matchesDesc = img.description.toLowerCase().includes(q);
        const matchesUrl = img.url.toLowerCase().includes(q);
        if (!matchesId && !matchesTitle && !matchesPage && !matchesSection && !matchesDesc && !matchesUrl) {
          return false;
        }
      }

      return true;
    });
  }, [images, selectedPage, statusFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = images.length;
    const active = images.filter((i) => i.active).length;
    const modified = images.filter((i) => i.url !== i.defaultUrl).length;
    const inactive = total - active;
    return { total, active, modified, inactive };
  }, [images]);

  // Whenever editUrlInput changes, check normalization & reset test status
  useEffect(() => {
    if (!editUrlInput) {
      setUrlTransformResult(null);
      setPreviewTestStatus('idle');
      setTestDimensions(null);
      return;
    }

    const norm = normalizeImageUrl(editUrlInput);
    setUrlTransformResult(norm);
    setPreviewTestStatus('idle');
    setTestDimensions(null);
  }, [editUrlInput]);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: CMSImageItem) => {
    setEditingItem(item);
    setEditUrlInput(item.url || '');
    setEditTitleInput(item.title || '');
    setEditAltInput(item.altText || item.title || '');
    setEditActiveState(item.active);
    setPreviewTestStatus('idle');
    setTestDimensions(null);
  };

  // Close Edit Modal
  const handleCloseEdit = () => {
    setEditingItem(null);
    setPreviewTestStatus('idle');
    setTestDimensions(null);
    setUrlTransformResult(null);
  };

  // Test Image Load
  const handleTestUrl = () => {
    const candidate = urlTransformResult?.url || editUrlInput.trim();
    if (!candidate) {
      setPreviewTestStatus('idle');
      return;
    }
    setPreviewTestStatus('testing');
    const testImg = new Image();
    testImg.onload = () => {
      setPreviewTestStatus('valid');
      setTestDimensions(`${testImg.naturalWidth} × ${testImg.naturalHeight} px`);
    };
    testImg.onerror = () => {
      setPreviewTestStatus('error');
      setTestDimensions(null);
    };
    testImg.src = candidate;
  };

  // Save Edit
  const handleSaveEdit = async () => {
    if (!editingItem) return;

    const candidateUrl = urlTransformResult?.url || editUrlInput.trim() || editingItem.defaultUrl;

    const result = await updateImage(editingItem.id, {
      url: candidateUrl,
      title: editTitleInput.trim() || editingItem.title,
      altText: editAltInput.trim() || editingItem.altText,
      active: editActiveState
    });

    if (result.success) {
      setFeedbackToast({
        message: result.message || 'Image updated successfully!',
        type: result.savedToCloud ? 'success' : 'info'
      });
      setTimeout(() => setFeedbackToast(null), 4000);
      handleCloseEdit();
    }
  };

  // Sync All Defaults Handler
  const handleSyncDefaults = async () => {
    const result = await syncAllDefaults();
    if (result.success) {
      setFeedbackToast({
        message: `Successfully synchronized ${result.count} images to Firestore cloud database!`,
        type: 'success'
      });
    } else {
      setFeedbackToast({
        message: 'Could not sync all defaults to cloud database. Please verify administrator login.',
        type: 'error'
      });
    }
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  // Add Custom Image Handler
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageForm.id.trim() || !newImageForm.url.trim()) return;

    const formattedId = newImageForm.id.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const normUrl = normalizeImageUrl(newImageForm.url).url;

    const result = await addCustomImage({
      ...newImageForm,
      id: formattedId,
      url: normUrl,
      defaultUrl: newImageForm.defaultUrl ? normalizeImageUrl(newImageForm.defaultUrl).url : normUrl,
      active: true
    });

    if (result.success) {
      setIsAddModalOpen(false);
      setFeedbackToast({
        message: result.message || 'Custom image registered successfully!',
        type: result.savedToCloud ? 'success' : 'info'
      });
      setTimeout(() => setFeedbackToast(null), 4000);
      setNewImageForm({
        id: '',
        title: '',
        page: 'Home',
        section: '',
        description: '',
        defaultUrl: '',
        url: '',
        active: true,
        aspectRatio: '16:9',
        altText: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      <AnimatePresence>
        {feedbackToast && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-xl ${
              feedbackToast.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-800'
                : feedbackToast.type === 'error'
                ? 'bg-red-950/90 text-red-300 border border-red-800'
                : 'bg-blue-950/90 text-blue-300 border border-blue-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {feedbackToast.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
              {feedbackToast.type === 'error' && <AlertCircle size={18} className="text-red-400 shrink-0" />}
              {feedbackToast.type === 'info' && <Info size={18} className="text-blue-400 shrink-0" />}
              <span>{feedbackToast.message}</span>
            </div>
            <button onClick={() => setFeedbackToast(null)} className="text-slate-400 hover:text-white ml-3">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner & Quick Metrics */}
      <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <ImageIcon size={16} />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Website Image CMS & Assets Management
              </h3>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono uppercase tracking-wider rounded">
                Live Dynamic Sync
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Replace and customize every photo, product visual, and background graphic across all pages. Changes take effect immediately in live preview and synchronize with Firestore cloud database.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus size={14} /> Add Custom Image
            </button>
            <button
              onClick={handleSyncDefaults}
              disabled={isSaving}
              title="Sync all predefined images into Firestore database"
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={13} className={isSaving ? 'animate-spin text-orange-400' : 'text-slate-400'} />
              <span>Sync Defaults to Cloud</span>
            </button>
          </div>
        </div>

        {/* Quick Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80">
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Images</span>
            <span className="text-sm font-bold text-white font-mono">{stats.total}</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Active Images</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">{stats.active}</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Custom Overrides</span>
            <span className="text-sm font-bold text-orange-400 font-mono">{stats.modified}</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Inactive (Fallback)</span>
            <span className="text-sm font-bold text-slate-400 font-mono">{stats.inactive}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search images by name, key, page, section, or image URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="md:col-span-3 flex items-center gap-2">
            <Filter size={15} className="text-slate-500 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Image Statuses</option>
              <option value="active">Active Only ({stats.active})</option>
              <option value="modified">Customized Overrides ({stats.modified})</option>
              <option value="inactive">Inactive Only ({stats.inactive})</option>
            </select>
          </div>

          <div className="md:col-span-3 flex items-center justify-end gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center ${
                viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Card Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center ${
                viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              List View
            </button>
          </div>
        </div>

        {/* Section/Page Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] mr-1 shrink-0">
            Page:
          </span>
          {availablePages.map((page) => (
            <button
              key={page}
              onClick={() => setSelectedPage(page)}
              className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-all ${
                selectedPage === page
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800/80 hover:border-slate-700 hover:text-white'
              }`}
            >
              {page} {page !== 'All' && `(${images.filter((i) => i.page === page).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Images Display */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-500 text-xs flex items-center justify-center gap-2">
          <RefreshCw size={16} className="animate-spin text-orange-400" /> Loading image catalog...
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="py-16 text-center bg-slate-950/60 border border-slate-800 rounded-2xl p-8">
          <ImageIcon size={36} className="text-slate-600 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-white mb-1">No Images Found</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery || selectedPage !== 'All' || statusFilter !== 'all'
              ? 'No images matched your filter or search criteria.'
              : 'No image records currently loaded.'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredImages.map((item) => {
            const isModified = item.url !== item.defaultUrl;
            return (
              <div
                key={item.id}
                className={`bg-slate-950/80 border rounded-2xl overflow-hidden flex flex-col transition-all shadow-md hover:shadow-xl ${
                  !item.active
                    ? 'border-slate-800/60 opacity-60'
                    : isModified
                    ? 'border-orange-500/50 hover:border-orange-400 ring-1 ring-orange-500/20'
                    : 'border-slate-800/90 hover:border-slate-700'
                }`}
              >
                {/* Image Preview Container */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden group">
                  <img
                    key={item.url}
                    src={item.active ? (item.url || item.defaultUrl) : item.defaultUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.defaultUrl;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>

                  {/* Badges on preview */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-slate-950/90 backdrop-blur-sm text-orange-400 border border-slate-800 text-[10px] font-bold uppercase tracking-wider rounded">
                      {item.page}
                    </span>
                    {isModified && (
                      <span className="px-2 py-0.5 bg-orange-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1 shadow-sm">
                        <Sparkles size={10} /> Custom URL
                      </span>
                    )}
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    <button
                      onClick={() => toggleActive(item.id)}
                      title={item.active ? 'Image is Active (Click to disable)' : 'Image is Inactive (Click to activate)'}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded flex items-center gap-1 backdrop-blur-sm transition-colors ${
                        item.active
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                      {item.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>

                  <div className="absolute bottom-2 left-2.5 right-2.5 text-xs">
                    <span className="text-[11px] font-medium text-slate-300 truncate block">
                      {item.section}
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-white line-clamp-1 mb-1" title={item.title}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-2.5" title={item.description}>
                      {item.description}
                    </p>

                    {/* Key & Recommended ratio */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-900 pt-2">
                      <div className="flex items-center gap-1.5 truncate mr-2">
                        <span className="text-slate-400 truncate font-semibold">Key:</span>
                        <code className="text-orange-400/90 truncate">{item.id}</code>
                        <button
                          onClick={() => handleCopy(item.id, `key-${item.id}`)}
                          className="text-slate-500 hover:text-slate-300"
                          title="Copy image key"
                        >
                          {copiedKey === `key-${item.id}` ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                        </button>
                      </div>
                      {item.aspectRatio && (
                        <span className="text-slate-400 shrink-0 bg-slate-900 px-1.5 py-0.5 rounded text-[10px]">
                          {item.aspectRatio}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* URL View & Controls */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center justify-between gap-2 bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-800 text-[11px]">
                      <span className="text-slate-400 truncate max-w-[190px]" title={item.url}>
                        {item.url}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white"
                          title="Open original image URL in new tab"
                        >
                          <ExternalLink size={12} />
                        </a>
                        <button
                          onClick={() => handleCopy(item.url, `url-${item.id}`)}
                          className="text-slate-400 hover:text-white"
                          title="Copy URL"
                        >
                          {copiedKey === `url-${item.id}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="flex-1 py-1.5 bg-orange-600/90 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Edit3 size={13} /> Change Image
                      </button>

                      {isModified && (
                        <button
                          onClick={() => resetToDefault(item.id)}
                          title="Reset back to bundled default"
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                        >
                          <RotateCcw size={13} /> Default
                        </button>
                      )}

                      {item.previousUrl && item.previousUrl !== item.url && (
                        <button
                          onClick={() => restorePrevious(item.id)}
                          title="Restore previous URL"
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                        >
                          <History size={13} /> Undo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE / LIST VIEW */
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Image</th>
                  <th className="p-3.5">Title & Usage</th>
                  <th className="p-3.5">Page & Section</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Current URL</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredImages.map((item) => {
                  const isModified = item.url !== item.defaultUrl;
                  return (
                    <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5 w-20">
                        <div className="w-16 h-10 rounded-lg bg-slate-900 overflow-hidden border border-slate-800 shrink-0">
                          <img
                            key={item.url}
                            src={item.active ? (item.url || item.defaultUrl) : item.defaultUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </td>
                      <td className="p-3.5 max-w-xs">
                        <div className="font-bold text-white mb-0.5">{item.title}</div>
                        <div className="text-[11px] text-slate-400 truncate">{item.description}</div>
                        <div className="text-[10px] text-orange-400/90 font-mono mt-0.5">Key: {item.id}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 bg-slate-900 text-slate-300 border border-slate-800 rounded text-[11px] font-semibold">
                          {item.page}
                        </span>
                        <div className="text-[11px] text-slate-400 mt-1">{item.section}</div>
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => toggleActive(item.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                            item.active
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-red-500/20 text-red-300 border border-red-500/40'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                          {item.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="p-3.5 max-w-sm">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                          <span className="truncate max-w-[200px]" title={item.url}>{item.url}</span>
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            <ExternalLink size={12} />
                          </a>
                        </div>
                        {isModified && (
                          <span className="text-[10px] text-orange-400 font-semibold flex items-center gap-0.5 mt-0.5">
                            <Sparkles size={10} /> Custom Override
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right space-x-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="px-2.5 py-1 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                        >
                          <Edit3 size={12} /> Edit
                        </button>
                        {isModified && (
                          <button
                            onClick={() => resetToDefault(item.id)}
                            title="Reset to default"
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors inline-flex items-center gap-1"
                          >
                            <RotateCcw size={12} /> Reset
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EDIT IMAGE MODAL */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden text-slate-100 flex flex-col max-h-[92vh]"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center">
                    <Edit3 size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Edit & Replace Website Image</h3>
                    <p className="text-[11px] text-slate-400 font-mono">Image ID: {editingItem.id}</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseEdit}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body Form */}
              <div className="p-6 overflow-y-auto space-y-5">
                {/* Meta information Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider text-[10px] block font-semibold">Location</span>
                    <span className="font-semibold text-white">{editingItem.page} Page — {editingItem.section}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider text-[10px] block font-semibold">Recommended Ratio</span>
                    <span className="font-semibold text-orange-400">{editingItem.aspectRatio || '16:9'}</span>
                  </div>
                  <div className="sm:col-span-2 text-slate-400 text-[11px]">
                    <span className="font-semibold text-slate-300">Context:</span> {editingItem.description}
                  </div>
                </div>

                {/* External Image URL Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>New Image URL (HTTPS link, CDN photo, or Local Asset)</span>
                    <button
                      type="button"
                      onClick={handleTestUrl}
                      className="text-orange-400 hover:text-orange-300 text-xs font-semibold flex items-center gap-1 normal-case"
                    >
                      <Eye size={12} /> Test Image Load
                    </button>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Paste image link: https://images.unsplash.com/... or Google Image result link..."
                      value={editUrlInput}
                      onChange={(e) => setEditUrlInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-24 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setEditUrlInput(editingItem.defaultUrl)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-semibold"
                      title="Paste bundled default URL"
                    >
                      Use Default
                    </button>
                  </div>

                  {/* URL Auto-Transformation Notice */}
                  {urlTransformResult?.isTransformed && (
                    <div className="mt-2 p-2.5 bg-blue-950/70 border border-blue-800/80 rounded-xl text-[11px] text-blue-300 flex items-start gap-2">
                      <Sparkles size={14} className="text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block">Auto-Normalized Direct Image Link:</span>
                        <span className="font-mono text-slate-300 break-all">{urlTransformResult.url}</span>
                        {urlTransformResult.message && (
                          <span className="block text-[10px] text-blue-300 mt-0.5">{urlTransformResult.message}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* URL Test status indicator */}
                  {previewTestStatus === 'testing' && (
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                      <RefreshCw size={12} className="animate-spin text-orange-400" /> Validating and downloading image...
                    </div>
                  )}
                  {previewTestStatus === 'valid' && (
                    <div className="mt-2 p-2 bg-emerald-950/60 border border-emerald-800 rounded-xl text-[11px] text-emerald-300 flex items-center justify-between font-medium">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-emerald-400" />
                        <span>Image is fully accessible and renders properly!</span>
                      </div>
                      {testDimensions && <span className="font-mono text-emerald-400 text-[10px]">{testDimensions}</span>}
                    </div>
                  )}
                  {previewTestStatus === 'error' && (
                    <div className="mt-2 p-2 bg-red-950/60 border border-red-800 rounded-xl text-[11px] text-red-300 flex items-start gap-1.5 font-medium">
                      <AlertCircle size={13} className="text-red-400 shrink-0 mt-0.5" />
                      <span>Image failed to load. Please verify the URL or select a preset below. (Will safely fallback to default if published).</span>
                    </div>
                  )}
                </div>

                {/* 1-Click High-Quality CDN Presets */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                    <Sparkles size={11} className="text-orange-400" /> 1-Click High-Resolution Sample Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {CMS_PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setEditUrlInput(preset.url);
                          handleTestUrl();
                        }}
                        className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg text-[10px] font-medium transition-colors text-left flex items-center gap-1"
                      >
                        <span className="text-orange-400 font-bold">{preset.category}:</span>
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bundled Local Assets Selector */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                    <Layers size={11} className="text-blue-400" /> Or Choose from Bundled Local Artwork:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-28 overflow-y-auto pr-1">
                    {BUNDLED_ASSETS.map((asset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setEditUrlInput(asset.path);
                          handleTestUrl();
                        }}
                        className={`p-1.5 bg-slate-950 hover:bg-slate-800 border rounded-lg text-[10px] text-left transition-colors flex items-center gap-2 ${
                          editUrlInput === asset.path ? 'border-orange-500 text-orange-300' : 'border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="w-6 h-6 rounded bg-slate-900 overflow-hidden shrink-0">
                          <img src={asset.path} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="truncate">{asset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Side-by-Side Preview */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Live Preview Comparison
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Active/New Candidate Preview */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-semibold text-white flex items-center gap-1">
                          <Eye size={12} className="text-orange-400" /> New Preview (Visitors see this)
                        </span>
                      </div>
                      <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden border border-orange-500/60 relative flex items-center justify-center shadow-inner">
                        <img
                          key={urlTransformResult?.url || editUrlInput}
                          src={urlTransformResult?.url || editUrlInput.trim() || editingItem.defaultUrl}
                          alt="New preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = editingItem.defaultUrl;
                          }}
                        />
                      </div>
                    </div>

                    {/* Original Bundled Default Preview */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-300">Original Fallback Asset</span>
                        <span className="text-[10px] text-slate-500">Bundled Default</span>
                      </div>
                      <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative flex items-center justify-center opacity-80">
                        <img
                          src={editingItem.defaultUrl}
                          alt="Default fallback"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Metadata Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Display Title
                    </label>
                    <input
                      type="text"
                      value={editTitleInput}
                      onChange={(e) => setEditTitleInput(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Alt Text / Accessibility Label
                    </label>
                    <input
                      type="text"
                      value={editAltInput}
                      onChange={(e) => setEditAltInput(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Status Toggle */}
                <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white block">Image Display Status</span>
                    <span className="text-[11px] text-slate-400">
                      When active, visitors see this image. If disabled, automatically fall back to bundled asset.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditActiveState(!editActiveState)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      editActiveState
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {editActiveState ? 'Active / Published' : 'Inactive / Disabled'}
                  </button>
                </div>

                {/* Previous URL / Restore option */}
                {editingItem.previousUrl && editingItem.previousUrl !== editUrlInput && (
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="truncate mr-3">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Previous URL:</span>
                      <span className="text-slate-300 font-mono truncate block max-w-sm">{editingItem.previousUrl}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditUrlInput(editingItem.previousUrl || '')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1"
                    >
                      <History size={12} /> Use Previous
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditUrlInput(editingItem.defaultUrl);
                      setEditActiveState(true);
                    }}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1"
                  >
                    <RotateCcw size={13} /> Reset to Default
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    disabled={isSaving}
                    className="px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                    <span>Save & Publish Image</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD CUSTOM IMAGE MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden text-slate-100 flex flex-col"
            >
              <form onSubmit={handleAddSubmit}>
                <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center">
                      <Plus size={16} />
                    </div>
                    <h3 className="text-sm font-bold text-white">Add New Custom CMS Image</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Unique Image Key / ID (e.g., custom_banner_announcement) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. custom_promo_coffee"
                      value={newImageForm.id}
                      onChange={(e) => setNewImageForm({ ...newImageForm, id: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Image Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Special Arabica Harvest Promotional Banner"
                      value={newImageForm.title}
                      onChange={(e) => setNewImageForm({ ...newImageForm, title: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Target Page
                      </label>
                      <select
                        value={newImageForm.page}
                        onChange={(e) => setNewImageForm({ ...newImageForm, page: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="Home">Home Page</option>
                        <option value="About">About Page</option>
                        <option value="Exports">Exports Page</option>
                        <option value="Coffee">Coffee Page</option>
                        <option value="Minerals">Minerals Page</option>
                        <option value="Seeds">Seeds Page</option>
                        <option value="Imports">Imports Page</option>
                        <option value="Contact">Contact Page</option>
                        <option value="Global">Global / Universal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Section Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Hero Banner, Overview Grid"
                        value={newImageForm.section}
                        onChange={(e) => setNewImageForm({ ...newImageForm, section: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Direct Image URL (HTTPS / CDN / Google Image result) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newImageForm.url}
                      onChange={(e) => setNewImageForm({ ...newImageForm, url: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Description / Usage Context
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Explain where and why this image is rendered..."
                      value={newImageForm.description}
                      onChange={(e) => setNewImageForm({ ...newImageForm, description: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    />
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={14} /> Add Image to CMS
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
