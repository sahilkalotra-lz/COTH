import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useNetworkStatus from '../../hooks/useNetworkStatus';

/**
 * Offline indicator component
 * Shows when the app is in offline mode
 */
const OfflineIndicator: React.FC = () => {
  const { isOnline, connectionType } = useNetworkStatus();

  if (isOnline) {
    return null; // Don't show anything when online
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        📱 Offline Mode - Using cached data
      </Text>
      {connectionType && (
        <Text style={styles.subText}>
          Connection: {connectionType}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFA500',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FF8C00',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  subText: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 2,
  },
});

export default OfflineIndicator;
