import { OfflineDataService } from '../database/offline-service';
import { fetchGPIConfig } from '../api/api';
import { GPIConfigResponse } from '../../types/gpi-config';

/**
 * Sync Service
 * Handles data synchronization between local database and remote API
 */
export class SyncService {
  private static isSyncing = false;

  /**
   * Sync app configuration
   */
  static async syncAppConfig(): Promise<boolean> {
    if (this.isSyncing) {
      console.log('🔄 Sync already in progress, skipping...');
      return false;
    }

    try {
      this.isSyncing = true;
      console.log('🔄 Starting app config sync...');

      const isOnline = await OfflineDataService.isOnline();
      if (!isOnline) {
        console.log('📱 Offline - skipping sync');
        return false;
      }

      // Check if we need to sync
      const hasValidCache = await OfflineDataService.hasValidCachedConfig();
      if (hasValidCache) {
        console.log('📱 Valid cached config exists, checking if sync needed...');
        
        // Get cached config to check refresh interval
        const cachedConfig = await OfflineDataService.getAppConfig();
        if (cachedConfig?.application?.refreshDataTimeInterval) {
          const refreshInterval = cachedConfig.application.refreshDataTimeInterval * 1000; // Convert to milliseconds
          const lastSync = cachedConfig.about?.LastUpdate;
          
          if (lastSync) {
            const lastSyncTime = new Date(lastSync).getTime();
            const timeSinceLastSync = Date.now() - lastSyncTime;
            
            if (timeSinceLastSync < refreshInterval) {
              console.log('📱 Config is still fresh, no sync needed');
              return true;
            }
          }
        }
      }

      // Fetch fresh config
      const freshConfig = await fetchGPIConfig();
      console.log('✅ App config sync completed');
      return true;

    } catch (error) {
      console.error('❌ App config sync failed:', error);
      return false;
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Sync all data
   */
  static async syncAll(): Promise<{ config: boolean; articles: boolean }> {
    console.log('🔄 Starting full sync...');
    
    const results = {
      config: false,
      articles: false,
    };

    try {
      // Sync app configuration
      results.config = await this.syncAppConfig();
      
      // TODO: Add article sync when article API is implemented
      // results.articles = await this.syncArticles();
      
      console.log('✅ Full sync completed:', results);
      return results;
    } catch (error) {
      console.error('❌ Full sync failed:', error);
      return results;
    }
  }

  /**
   * Force sync (ignores cache freshness)
   */
  static async forceSync(): Promise<boolean> {
    try {
      console.log('🔄 Force syncing app config...');
      
      const isOnline = await OfflineDataService.isOnline();
      if (!isOnline) {
        throw new Error('No internet connection available for force sync');
      }

      const freshConfig = await fetchGPIConfig();
      console.log('✅ Force sync completed');
      return true;
    } catch (error) {
      console.error('❌ Force sync failed:', error);
      return false;
    }
  }

  /**
   * Check if sync is needed
   */
  static async isSyncNeeded(): Promise<boolean> {
    try {
      const isOnline = await OfflineDataService.isOnline();
      if (!isOnline) {
        return false; // No sync needed if offline
      }

      const hasValidCache = await OfflineDataService.hasValidCachedConfig();
      if (!hasValidCache) {
        return true; // Sync needed if no valid cache
      }

      // Check if cached data is stale
      const cachedConfig = await OfflineDataService.getAppConfig();
      if (cachedConfig?.application?.refreshDataTimeInterval) {
        const refreshInterval = cachedConfig.application.refreshDataTimeInterval * 1000;
        const lastSync = cachedConfig.about?.LastUpdate;
        
        if (lastSync) {
          const lastSyncTime = new Date(lastSync).getTime();
          const timeSinceLastSync = Date.now() - lastSyncTime;
          return timeSinceLastSync >= refreshInterval;
        }
      }

      return false;
    } catch (error) {
      console.error('❌ Error checking sync status:', error);
      return false;
    }
  }

  /**
   * Get sync status information
   */
  static async getSyncStatus(): Promise<{
    isOnline: boolean;
    hasValidCache: boolean;
    isSyncNeeded: boolean;
    lastSyncTime?: string;
    nextSyncTime?: string;
  }> {
    try {
      const isOnline = await OfflineDataService.isOnline();
      const hasValidCache = await OfflineDataService.hasValidCachedConfig();
      const isSyncNeeded = await this.isSyncNeeded();
      
      let lastSyncTime: string | undefined;
      let nextSyncTime: string | undefined;

      if (hasValidCache) {
        const cachedConfig = await OfflineDataService.getAppConfig();
        if (cachedConfig?.about?.LastUpdate) {
          lastSyncTime = cachedConfig.about.LastUpdate;
          
          if (cachedConfig.application?.refreshDataTimeInterval) {
            const refreshInterval = cachedConfig.application.refreshDataTimeInterval * 1000;
            const nextSync = new Date(new Date(lastSyncTime).getTime() + refreshInterval);
            nextSyncTime = nextSync.toISOString();
          }
        }
      }

      return {
        isOnline,
        hasValidCache,
        isSyncNeeded,
        lastSyncTime,
        nextSyncTime,
      };
    } catch (error) {
      console.error('❌ Error getting sync status:', error);
      return {
        isOnline: false,
        hasValidCache: false,
        isSyncNeeded: false,
      };
    }
  }
}

export default SyncService;
