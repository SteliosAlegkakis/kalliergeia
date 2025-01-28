import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface RoundButtonProps {
  onPress: () => void;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  onPress
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { width: 60, height: 60, borderRadius: 30, backgroundColor: '#A7C957' }]}
    >
      <MaterialIcons name="add" size={40} color='white' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default RoundButton;
