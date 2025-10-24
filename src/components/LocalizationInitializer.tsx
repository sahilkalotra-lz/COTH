import React, { useEffect } from 'react';
import { useLocalization } from '../hooks/useLocalization';

const LocalizationInitializer: React.FC = () => {
  const { initializeDefaultLanguage } = useLocalization();

  useEffect(() => {
    // Initialize default language when component mounts
    initializeDefaultLanguage();
  }, [initializeDefaultLanguage]);

  return null;
};

export default LocalizationInitializer;
