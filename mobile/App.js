import React from 'react';
import { StyleSheet, StatusBar, YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Unrecognized WebSocket'])

import Routes from './src/routes'

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Routes />
    </>
  );
}
