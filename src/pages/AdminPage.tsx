import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Lock,
  Mail,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MessageCircle,
  FileSpreadsheet,
  Trash2,
  Send,
  RefreshCw,
  ExternalLink,
  Activity,
  UserCheck,
  AlertCircle,
  Phone,
  Eye,
  ChevronRight,
  Package,
  Calendar,
  Layers,
  Sparkles,
  Image as ImageIcon,
  ArrowLeft,
  Database,
  Building,
  Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ImageManagement from '../components/ImageManagement';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  type User
} from 'firebase/auth';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  limit
} from 'firebase/firestore';
import { auth, googleProvider, db, ADMIN_EMAILS, isAdminEmail, logActivity } from '../lib/firebase';
import { useAdmin } from '../lib/AdminContext';
import type { Inquiry, ActivityLog } from '../types';

export default function AdminPage() {
  const navigate = useNavigate();
  const { currentUser, isAdmin, authLoading, logout } = useAdmin();

  // Auth Form State
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<'images' | 'inquiries' | 'activity' | 'system'>('images');

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Real-time Firestore Subscriptions for Inquiries and Activity Logs
  useEffect(() => {
    setIsLoadingData(true);

    // 1. Subscribe to Inquiries
    let unsubInquiries = () => {};
    let unsubLogs = () => {};

    try {
      const inquiriesQuery = query(
        collection(db, 'inquiries'),
        orderBy('createdAt', 'desc')
      );

      unsubInquiries = onSnapshot(
        inquiriesQuery,
        (snapshot) => {
          const items: Inquiry[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          } as Inquiry));
          setInquiries(items);
          setIsLoadingData(false);

          if (selectedInquiry) {
            const updated = items.find((i) => i.id === selectedInquiry.id);
            if (updated) setSelectedInquiry(updated);
          }
        },
        (error) => {
          console.warn('Inquiries subscription info:', error.message);
          setIsLoadingData(false);
        }
      );
    } catch (e) {
      console.warn('Inquiries query init notice:', e);
      setIsLoadingData(false);
    }

    try {
      const logsQuery = query(
        collection(db, 'activity_logs'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );

      unsubLogs = onSnapshot(
        logsQuery,
        (snapshot) => {
          const logs: ActivityLog[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          } as ActivityLog));
          setActivityLogs(logs);
        },
        (error) => {
          console.warn('Activity logs subscription info:', error.message);
        }
      );
    } catch (e) {
      console.warn('Logs query init notice:', e);
    }

    return () => {
      unsubInquiries();
      unsubLogs();
    };
  }, [isAdmin, currentUser]);

  useEffect(() => {
    if (selectedInquiry) {
      setAdminNoteInput(selectedInquiry.adminNotes || '');
    }
  }, [selectedInquiry]);

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (!isAdminEmail(user.email)) {
        setAuthError(
          `Signed in as ${user.email}, but this account does not have administrator privileges. Please sign in with an authorized account (e.g. info@moderntechplc.com or moderntechplc@gmail.com).`
        );
      } else {
        await logActivity('admin_login_success', { email: user.email, method: 'google' });
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      setAuthError(err.message || 'Failed to authenticate with Google.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Email/Password Auth
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsAuthenticating(true);
    setAuthError(null);
    try {
      if (authMode === 'signin') {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await logActivity('admin_login_success', { email: result.user.email, method: 'email' });
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await logActivity('admin_account_created', { email: result.user.email });
      }
    } catch (err: any) {
      console.error('Email Auth Error:', err);
      setAuthError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Update Inquiry Status
  const handleStatusChange = async (inquiryId: string, newStatus: Inquiry['status']) => {
    try {
      const docRef = doc(db, 'inquiries', inquiryId);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: Date.now(),
      });
      await logActivity('inquiry_status_updated', { inquiryId, newStatus, admin: currentUser?.email });
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Save Admin Note
  const handleSaveNote = async () => {
    if (!selectedInquiry) return;
    setSavingNote(true);
    try {
      const docRef = doc(db, 'inquiries', selectedInquiry.id);
      await updateDoc(docRef, {
        adminNotes: adminNoteInput,
        updatedAt: Date.now(),
      });
      await logActivity('inquiry_note_saved', { inquiryId: selectedInquiry.id, admin: currentUser?.email });
      setSelectedInquiry((prev) => (prev ? { ...prev, adminNotes: adminNoteInput } : null));
    } catch (err) {
      console.error('Error saving note:', err);
    } finally {
      setSavingNote(false);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (inquiryId: string) => {
    try {
      await deleteDoc(doc(db, 'inquiries', inquiryId));
      await logActivity('inquiry_deleted', { inquiryId, admin: currentUser?.email });
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(null);
      }
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Company', 'Commodity', 'Volume', 'Status', 'Message', 'Notes'];
    const rows = inquiries.map((i) => [
      new Date(i.createdAt).toISOString(),
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.phone || '').replace(/"/g, '""')}"`,
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${(i.commodity || '').replace(/"/g, '""')}"`,
      `"${(i.volume || '').replace(/"/g, '""')}"`,
      i.status,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${(i.adminNotes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `moderntech_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      inquiry.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.commodity?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const inquiryMetrics = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    contacted: inquiries.filter((i) => i.status === 'contacted').length,
    inProgress: inquiries.filter((i) => i.status === 'in_progress').length,
    closed: inquiries.filter((i) => i.status === 'closed').length,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pt-20">
      {/* Top Admin Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-colors border border-slate-700/80"
          >
            <ArrowLeft size={14} /> Back to Website
          </Link>
          <div className="h-5 w-px bg-slate-800"></div>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-orange-600/30">
              M
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight leading-none">
                Moderntech PLC Executive Admin
              </h1>
              <span className="text-[10px] text-slate-400 font-mono">Control Center & CMS</span>
            </div>
          </div>
        </div>

        {/* Authentication Quick Status */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-white">{currentUser.displayName || currentUser.email}</span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {isAdmin ? 'Verified Administrator' : 'Visitor Session'}
                </span>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1.5 bg-slate-800 hover:bg-red-950/80 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <LogOut size={13} /> Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              disabled={isAuthenticating}
              className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-600/20 flex items-center gap-1.5"
            >
              <Shield size={13} /> Admin Google Sign-In
            </button>
          )}
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Tabs Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-2 sm:p-2.5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('images')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'images'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <ImageIcon size={15} />
              <span>Image CMS & Assets</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative ${
                activeTab === 'inquiries'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <MessageCircle size={15} />
              <span>Trade Inquiries</span>
              {inquiryMetrics.new > 0 && (
                <span className="px-1.5 py-0.2 bg-emerald-500 text-white text-[10px] font-bold rounded-full">
                  {inquiryMetrics.new}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('activity')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'activity'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Activity size={15} />
              <span>Activity & Audit Log</span>
            </button>

            <button
              onClick={() => setActiveTab('system')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'system'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Database size={15} />
              <span>System Diagnostics</span>
            </button>
          </div>

          <div className="text-right text-[11px] text-slate-400 px-2 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Firestore Live Connection</span>
          </div>
        </div>

        {/* Tab 1: Image CMS */}
        {activeTab === 'images' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ImageManagement />
          </motion.div>
        )}

        {/* Tab 2: Trade Inquiries */}
        {activeTab === 'inquiries' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium block">Total Leads</span>
                <span className="text-xl font-bold text-white font-mono">{inquiryMetrics.total}</span>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium block">New & Unread</span>
                <span className="text-xl font-bold text-emerald-400 font-mono">{inquiryMetrics.new}</span>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium block">Contacted</span>
                <span className="text-xl font-bold text-blue-400 font-mono">{inquiryMetrics.contacted}</span>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium block">In Negotiation</span>
                <span className="text-xl font-bold text-orange-400 font-mono">{inquiryMetrics.inProgress}</span>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium block">Fulfilled / Closed</span>
                <span className="text-xl font-bold text-slate-400 font-mono">{inquiryMetrics.closed}</span>
              </div>
            </div>

            {/* Inquiries Table & Detail Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: List */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search inquiries by buyer, commodity, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New ({inquiryMetrics.new})</option>
                    <option value="contacted">Contacted ({inquiryMetrics.contacted})</option>
                    <option value="in_progress">In Progress ({inquiryMetrics.inProgress})</option>
                    <option value="closed">Closed ({inquiryMetrics.closed})</option>
                  </select>
                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <FileSpreadsheet size={14} className="text-emerald-400" /> Export CSV
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
                  {isLoadingData ? (
                    <div className="p-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                      <RefreshCw size={14} className="animate-spin text-orange-400" /> Loading inquiries...
                    </div>
                  ) : filteredInquiries.length === 0 ? (
                    <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-500 text-xs">
                      No inquiries found.
                    </div>
                  ) : (
                    filteredInquiries.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedInquiry(item)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          selectedInquiry?.id === item.id
                            ? 'bg-slate-900 border-orange-500 shadow-md ring-1 ring-orange-500/30'
                            : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{item.name}</span>
                            {item.company && (
                              <span className="text-xs text-slate-400 font-medium">({item.company})</span>
                            )}
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              item.status === 'new'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : item.status === 'contacted'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : item.status === 'in_progress'
                                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="text-xs text-slate-400 line-clamp-2 mb-2">
                          {item.message || 'No written message provided.'}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800/60">
                          <span>Commodity: <strong className="text-orange-400">{item.commodity || 'General Inquiry'}</strong></span>
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right Column: Selected Inquiry Detail */}
              <div className="lg:col-span-5">
                {selectedInquiry ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 sticky top-24 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="font-bold text-base text-white">{selectedInquiry.name}</h3>
                        <p className="text-xs text-slate-400">{selectedInquiry.company || 'Private Buyer'}</p>
                      </div>
                      <select
                        value={selectedInquiry.status}
                        onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as any)}
                        className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-orange-400 focus:outline-none"
                      >
                        <option value="new">Mark: New</option>
                        <option value="contacted">Mark: Contacted</option>
                        <option value="in_progress">Mark: In Progress</option>
                        <option value="closed">Mark: Closed</option>
                      </select>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Email:</span>
                        <a href={`mailto:${selectedInquiry.email}`} className="text-orange-400 font-semibold hover:underline">
                          {selectedInquiry.email}
                        </a>
                      </div>
                      {selectedInquiry.phone && (
                        <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Phone:</span>
                          <a href={`tel:${selectedInquiry.phone}`} className="text-white font-semibold">
                            {selectedInquiry.phone}
                          </a>
                        </div>
                      )}
                      {selectedInquiry.commodity && (
                        <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Requested Commodity:</span>
                          <span className="text-orange-400 font-bold">{selectedInquiry.commodity}</span>
                        </div>
                      )}
                      {selectedInquiry.volume && (
                        <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Target Volume:</span>
                          <span className="text-white font-semibold">{selectedInquiry.volume}</span>
                        </div>
                      )}
                    </div>

                    {/* Full Message */}
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Inquiry Message
                      </span>
                      <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {selectedInquiry.message || 'No additional message details.'}
                      </div>
                    </div>

                    {/* Admin Internal Notes */}
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Internal Admin Notes
                      </span>
                      <textarea
                        rows={3}
                        placeholder="Add private internal notes about pricing, logistics agreement, call history..."
                        value={adminNoteInput}
                        onChange={(e) => setAdminNoteInput(e.target.value)}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none mb-2"
                      />
                      <button
                        onClick={handleSaveNote}
                        disabled={savingNote}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                      >
                        {savingNote ? <RefreshCw size={13} className="animate-spin" /> : <Send size={13} />} Save Admin Note
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      {deleteConfirmId === selectedInquiry.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-red-400 font-bold">Delete permanently?</span>
                          <button
                            onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-bold"
                          >
                            Yes, Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(selectedInquiry.id)}
                          className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                        >
                          <Trash2 size={13} /> Delete Inquiry
                        </button>
                      )}

                      <a
                        href={`mailto:${selectedInquiry.email}?subject=Moderntech%20PLC%20Quote%20Inquiry%20Response`}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
                      >
                        <Mail size={13} /> Reply via Email
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[300px] bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-500 text-xs">
                    <MessageCircle size={32} className="text-slate-700 mb-2" />
                    Select an inquiry from the list to view full specifications and buyer details.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Activity Logs */}
        {activeTab === 'activity' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-sm text-white">System Audit & Activity Stream</h3>
                <p className="text-xs text-slate-400">Chronological history of admin actions, CMS changes, and buyer requests.</p>
              </div>
              <span className="text-xs font-mono text-slate-500">{activityLogs.length} events logged</span>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {activityLogs.length === 0 ? (
                <div className="p-12 text-center text-xs text-slate-500">No activity events recorded yet.</div>
              ) : (
                activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      <span className="text-orange-400 font-bold">{log.action}</span>
                      <span className="text-slate-400 text-[11px] truncate max-w-md">
                        {JSON.stringify(log.details || {})}
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px] shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString()} · {new Date(log.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 4: System Diagnostics */}
        {activeTab === 'system' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Database size={16} className="text-orange-500" /> Database & Persistence Diagnostics
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Database Engine:</span>
                  <span className="text-emerald-400 font-mono font-bold">Google Cloud Firestore</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Image Collection:</span>
                  <span className="text-white font-mono">website_images</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Inquiry Collection:</span>
                  <span className="text-white font-mono">inquiries</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Local Cache Mechanism:</span>
                  <span className="text-orange-400 font-mono font-bold">LocalStorage v3 + Zero-Latency Optimistic</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Shield size={16} className="text-orange-500" /> Security & Access Rules
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Authorized Admin Emails:</span>
                  <span className="text-white font-mono text-[11px]">info@moderntechplc.com, moderntechplc@gmail.com</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Public Read Rules:</span>
                  <span className="text-emerald-400 font-semibold">Active for all images & public content</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Write Security:</span>
                  <span className="text-orange-400 font-semibold">Enforced via firestore.rules</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
