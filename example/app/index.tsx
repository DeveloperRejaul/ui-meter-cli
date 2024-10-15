/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/rtk/store';
import Rtk from '@/components/rtk';

export default function Index() {
  return (
    <Provider store={store}>
      <Rtk />
    </Provider>
  );
}
