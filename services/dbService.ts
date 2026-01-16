export interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  timestamp: number;
}

export interface AnalyticsData {
  distribution: Array<{ service: string; count: number }>;
  trends: Array<{ day: string; count: number }>;
}

/**
 * CONNECTIVITY CONFIGURATION:
 * We use 127.0.0.1 instead of localhost for better cross-platform compatibility.
 */
const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const dbService = {
  // Checks if the backend is reachable
  async checkConnection(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);
      const response = await fetch(`${API_BASE_URL}/health`, { 
        method: 'GET', 
        signal: controller.signal 
      });
      clearTimeout(timeoutId);
      return response.ok;
    } catch (e) {
      return false;
    }
  },

  async handleFetchError(error: any, context: string) {
    const isHttps = window.location.protocol === 'https:';
    
    console.group(`🚨 Bloomview Connection Failed: ${context}`);
    console.error("Technical Error:", error);
    
    if (isHttps) {
      console.warn("CRITICAL: You are on an HTTPS site trying to reach an HTTP local server. This is 'Mixed Content'.");
      console.warn("FIX: Look at your browser address bar. Click the 'Site Settings' or 'Lock' icon and 'Allow Insecure Content'.");
    } else {
      console.warn("FIX: Ensure you have run 'node server.js' in your terminal and that port 5000 is open.");
    }
    console.groupEnd();
    
    return null;
  },

  async saveLead(data: Omit<Lead, 'id' | 'status' | 'timestamp'>): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch (e) {
      await this.handleFetchError(e, "Submit Lead");
      return false;
    }
  },

  async getLeads(passcode: string): Promise<Lead[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/leads`, {
        headers: { 'Authorization': `Bearer ${passcode}` }
      });
      if (!response.ok) return [];
      return await response.json();
    } catch (e) {
      await this.handleFetchError(e, "Fetch Leads");
      return [];
    }
  },

  async getAnalytics(passcode: string): Promise<AnalyticsData | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics`, {
        headers: { 'Authorization': `Bearer ${passcode}` }
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (e) {
      await this.handleFetchError(e, "Fetch Analytics");
      return null;
    }
  },

  async updateLeadStatus(id: string, status: Lead['status'], passcode: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${passcode}`
        },
        body: JSON.stringify({ status }),
      });
      return response.ok;
    } catch (e) {
      await this.handleFetchError(e, "Update Lead Status");
      return false;
    }
  },

  async deleteLead(id: string, passcode: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${passcode}` }
      });
      return response.ok;
    } catch (e) {
      await this.handleFetchError(e, "Delete Lead");
      return false;
    }
  },

  async subscribe(email: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      return response.ok;
    } catch (e) {
      await this.handleFetchError(e, "Newsletter Subscribe");
      return false;
    }
  }
};