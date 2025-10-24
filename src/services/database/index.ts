import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { Platform } from 'react-native';

import schema from './schema';
import User from './models/User';
import AppConfig from './models/AppConfig';
import Article from './models/Article';

// Import migrations
// import migrations from './migrations';

// Check if we're in development with remote debugger
// JSI is not available when remote debugger is enabled or in certain environments
const shouldUseJSI = __DEV__ ? false : Platform.OS !== 'web';

console.log(`🍉 WatermelonDB: Using ${shouldUseJSI ? 'JSI' : 'asynchronous'} adapter`);

const adapter = new SQLiteAdapter({
  schema,
  // migrations,
  jsi: shouldUseJSI, // Enable JSI only when available
  onSetUpError: (error) => {
    console.error('❌ Database setup error:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [User, AppConfig, Article],
});

// Initialize database and handle setup
let isDatabaseInitialized = false;
let initializationPromise: Promise<void> | null = null;

export const initializeDatabase = async (): Promise<void> => {
  if (isDatabaseInitialized) {
    return;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    try {
      console.log('🍉 Initializing WatermelonDB...');
      await database.adapter.schema;
      
      // Wait a bit more to ensure collections are ready
      await new Promise<void>(resolve => setTimeout(resolve, 100));
      
      isDatabaseInitialized = true;
      console.log('✅ WatermelonDB initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize WatermelonDB:', error);
      isDatabaseInitialized = false;
      initializationPromise = null;
      throw error;
    }
  })();

  return initializationPromise;
};

export { User, AppConfig, Article };
