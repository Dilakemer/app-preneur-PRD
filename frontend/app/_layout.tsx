import React from 'react';
import { Stack } from 'expo-router';
import { AraclarProvider } from '../hooks/useAraclar';

export default function RootLayout() {
  return (
    <AraclarProvider>
      <Stack />
    </AraclarProvider>
  );
}
