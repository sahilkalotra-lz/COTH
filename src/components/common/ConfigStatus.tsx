import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import useAppConfig from '../../hooks/useAppConfig';

/**
 * Example component demonstrating how to use the GPI configuration
 * This component shows the current configuration status and allows manual refresh
 */
const ConfigStatus: React.FC = () => {
  const {
    config,
    isLoading,
    error,
    lastUpdated,
    isInitialized,
    refreshConfig,
    getAvailableLanguages,
    getTabsConfig,
    isSubscriptionEnabled,
    areAdsEnabled,
    getVersionInfo,
  } = useAppConfig();

  const handleRefresh = async () => {
    try {
      await refreshConfig();
    } catch (error) {
      console.error('Failed to refresh config:', error);
    }
  };

  const formatLastUpdated = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    return new Date(timestamp).toLocaleString();
  };

  if (!isInitialized && isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.loadingText}>Loading configuration...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GPI Configuration Status</Text>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Status: {isInitialized ? '✅ Initialized' : '❌ Not Initialized'}
        </Text>
        <Text style={styles.infoText}>
          Last Updated: {formatLastUpdated(lastUpdated)}
        </Text>
        <Text style={styles.infoText}>
          Subscription: {isSubscriptionEnabled() ? '✅ Enabled' : '❌ Disabled'}
        </Text>
        <Text style={styles.infoText}>
          Ads: {areAdsEnabled() ? '✅ Enabled' : '❌ Disabled'}
        </Text>
      </View>

      {config && (
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Configuration Details:</Text>
          
          <Text style={styles.detailText}>
            Languages: {getAvailableLanguages().length} available
          </Text>
          <Text style={styles.detailText}>
            Tabs: {getTabsConfig().length} configured
          </Text>
          
          {getVersionInfo() && (
            <Text style={styles.detailText}>
              Version: {getVersionInfo()?.targetVersion} (min: {getVersionInfo()?.minimumVersion})
            </Text>
          )}
          
          <Text style={styles.detailText}>
            Base URL: {config.application?.baseUrl}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.refreshButtonText}>Refresh Configuration</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  loadingText: {
    marginLeft: 8,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#FFE6E6',
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
  },
  infoContainer: {
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  detailText: {
    fontSize: 13,
    marginBottom: 4,
    color: '#666',
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConfigStatus;
