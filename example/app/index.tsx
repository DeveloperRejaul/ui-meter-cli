import React from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { store } from '@/rtk/store';
import Switch from '@/components/switch';

export default function Index() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Switch
          size={50}
          onChange={(value) => {
            console.log(value);
          }}
        />
      </View>
    </Provider>
  );
}
