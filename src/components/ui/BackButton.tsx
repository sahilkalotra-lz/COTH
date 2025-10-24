import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';

interface BackButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  disabled = false
}) => {

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7}
      style={[styles.container, disabled && styles.disabled]}  >
      <View style={styles.chevron} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.BGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    width: 36 * 0.3,
    height: 36 * 0.3,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.blue,
    transform: [{ rotate: '45deg' }],
    marginLeft: 36 * 0.1,
  },
  disabled: {
    opacity: 0.5,
  },
});