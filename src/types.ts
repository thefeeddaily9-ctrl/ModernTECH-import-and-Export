export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  volume?: string;
  message?: string;
  destinationPort?: string;
  packaging?: string;
  productType?: 'coffee' | 'minerals' | 'seeds' | 'imports' | 'general';
  status: 'new' | 'in_review' | 'quoted' | 'closed';
  createdAt: number;
  adminNotes?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  page?: string;
  details?: Record<string, any>;
  userAgent?: string;
  timestamp: number;
}
