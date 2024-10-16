import React from 'react';
import { Provider } from 'react-redux';
import { Text, View } from 'react-native';
import { store } from '@/rtk/store';
import Input from '@/components/input';

export default function Index() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Input />
      </View>
    </Provider>
  );
}
