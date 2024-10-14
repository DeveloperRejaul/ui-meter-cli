import { View } from 'react-native';
import React from 'react';
import Button from './components/button';

export default function index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button isDisabled />
    </View>
  );
}