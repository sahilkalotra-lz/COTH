import { AppConfig, Article, database } from './index';
import { GPIConfigResponse } from '../../types/gpi-config';
import NetInfo from '@react-native-community/netinfo';

/**
 * Offline Data Service
 * Handles local data storage and synchronization for offline functionality
 */
export class OfflineDataService {
  /**
   * Save GPI configuration to local database
   */
  static async saveAppConfig(config: GPIConfigResponse): Promise<void> {
    try {
      await database.write(async () => {
        // Deactivate all existing configs
        const existingConfigs = await database.collections.get<AppConfig>('app_configs').query().fetch();
        for (const existingConfig of existingConfigs) {
          await existingConfig.update((config) => {
            config.isActive = false;
          });
        }

        // Create new active config
        await database.collections.get<AppConfig>('app_configs').create((newConfig) => {
          newConfig.configData = JSON.stringify(config);
          newConfig.version = config.about?.hash || 'unknown';
          newConfig.isActive = true;
          newConfig.lastSync = Date.now();
        });

        console.log('✅ App config saved to local database');
      });
    } catch (error) {
      console.error('❌ Error saving app config:', error);
      throw error;
    }
  }

  /**
   * Get the latest GPI configuration from local database
   */
  static async getAppConfig(): Promise<GPIConfigResponse | null> {
    try {
      const activeConfig = await database.collections
        .get<AppConfig>('app_configs')
        .query()
        .fetch();

      if (activeConfig.length > 0) {
        const config = activeConfig[0].parsedConfig;
        console.log('📱 Retrieved app config from local database');
        return config;
      }

      console.log('📱 No app config found in local database');
      return null;
    } catch (error) {
      console.error('❌ Error retrieving app config:', error);
      return null;
    }
  }

  /**
   * Check if we have a valid cached config
   */
  static async hasValidCachedConfig(): Promise<boolean> {
    try {
      const activeConfig = await database.collections
        .get<AppConfig>('app_configs')
        .query()
        .fetch();

      if (activeConfig.length === 0) return false;

      const config = activeConfig[0];
      const configData = config.parsedConfig;
      
      // Check if config is valid and not too old (24 hours)
      const isRecent = config.lastSync && (Date.now() - config.lastSync) < 24 * 60 * 60 * 1000;
      const isValid = configData && configData.application && configData.Tabs;

      return !!(isValid && isRecent);
    } catch (error) {
      console.error('❌ Error checking cached config:', error);
      return false;
    }
  }

  /**
   * Save article to local database
   */
  static async saveArticle(articleData: {
    title: string;
    content: string;
    excerpt?: string;
    author?: string;
    category?: string;
    tags?: string[];
    featuredImage?: string;
    externalId: string;
    isPublished?: boolean;
  }): Promise<void> {
    try {
      await database.write(async () => {
        // Check if article already exists
        const existingArticles = await database.collections
          .get<Article>('articles')
          .query()
          .fetch();

        if (existingArticles.length > 0) {
          // Update existing article
          const article = existingArticles[0];
          await article.update((updatedArticle:any) => {
            updatedArticle.title = articleData.title;
            updatedArticle.content = articleData.content;
            updatedArticle.excerpt = articleData.excerpt;
            updatedArticle.author = articleData.author;
            updatedArticle.category = articleData.category;
            updatedArticle.featuredImage = articleData.featuredImage;
            updatedArticle.isPublished = articleData.isPublished ?? true;
            updatedArticle.lastSync = Date.now();
            if (articleData.tags) {
              updatedArticle.setTags(articleData.tags);
            }
          });
        } else {
          // Create new article
          await database.collections.get<Article>('articles').create((newArticle) => {
            newArticle.title = articleData.title;
            newArticle.content = articleData.content;
            newArticle.excerpt = articleData.excerpt;
            newArticle.author = articleData.author;
            newArticle.category = articleData.category;
            newArticle.featuredImage = articleData.featuredImage;
            newArticle.isPublished = articleData.isPublished ?? true;
            newArticle.isFavorite = false;
            newArticle.externalId = articleData.externalId;
            newArticle.lastSync = Date.now();
            if (articleData.tags) {
              newArticle.setTags(articleData.tags);
            }
          });
        }

        console.log('✅ Article saved to local database');
      });
    } catch (error) {
      console.error('❌ Error saving article:', error);
      throw error;
    }
  }

  /**
   * Get articles from local database
   */
  static async getArticles(limit: number = 50, offset: number = 0): Promise<Article[]> {
    try {
      const articles = await database.collections
        .get<Article>('articles')
        .query()
        .fetch();

      console.log(`📱 Retrieved ${articles.length} articles from local database`);
      return articles;
    } catch (error) {
      console.error('❌ Error retrieving articles:', error);
      return [];
    }
  }


  /**
   * Check network connectivity
   */
  static async isOnline(): Promise<boolean> {
    try {
      const netInfo = await NetInfo.fetch();
      return netInfo.isConnected ?? false;
    } catch (error) {
      console.error('❌ Error checking network status:', error);
      return false;
    }
  }

}

export default OfflineDataService;
