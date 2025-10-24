import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

/**
 * Hook to monitor network connectivity status
 */
export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [connectionType, setConnectionType] = useState<string | null>(null);
  const [isInternetReachable, setIsInternetReachable] = useState<boolean | null>(null);

  useEffect(() => {
    // Get initial network state
    const getInitialState = async () => {
      try {
        const state = await NetInfo.fetch();
        setIsConnected(state.isConnected);
        setConnectionType(state.type);
        setIsInternetReachable(state.isInternetReachable);
      } catch (error) {
        console.error('Error getting initial network state:', error);
      }
    };

    getInitialState();

    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
      setIsInternetReachable(state.isInternetReachable);
      
      console.log(`🌐 Network status changed: ${state.isConnected ? 'Connected' : 'Disconnected'} (${state.type})`);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isConnected,
    connectionType,
    isInternetReachable,
    isOnline: isConnected === true && isInternetReachable === true,
  };
};

export default useNetworkStatus;
