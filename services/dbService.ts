import { ServiceItem } from "../types";

export interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  timestamp: number;
}

const LEADS_KEY = 'bloomview_leads';
const SUBS_KEY = 'bloomview_subscribers';

/**
 * DATABASE SERVICE (Simulated Backend)
 * This layer handles data persistence. In a production environment,
 * these methods would call an external API (Express/Supabase/Firebase).
 */
export const dbService = {
  // Save a new contact inquiry
  async saveLead(data: Omit<Lead, 'id' | 'status' | 'timestamp'>): Promise<boolean> {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const leads = this.getLeads();
      const newLead: Lead = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        status: 'new',
        timestamp: Date.now()
      };
      
      localStorage.setItem(LEADS_KEY, JSON.stringify([newLead, ...leads]));
      return true;
    } catch (e) {
      console.error("DB Error saving lead:", e);
      return false;
    }
  },

  // Get all inquiries (Admin Only)
  getLeads(): Lead[] {
    const data = localStorage.getItem(LEADS_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Update lead status
  updateLeadStatus(id: string, status: Lead['status']): void {
    const leads = this.getLeads();
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    localStorage.setItem(LEADS_KEY, JSON.stringify(updated));
  },

  // Delete lead
  deleteLead(id: string): void {
    const leads = this.getLeads();
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads.filter(l => l.id !== id)));
  },

  // Newsletter subscription
  async subscribe(email: string): Promise<boolean> {
    try {
      const subs = JSON.parse(localStorage.getItem(SUBS_KEY) || '[]');
      if (!subs.includes(email)) {
        localStorage.setItem(SUBS_KEY, JSON.stringify([...subs, email]));
      }
      return true;
    } catch (e) {
      return false;
    }
  }
};