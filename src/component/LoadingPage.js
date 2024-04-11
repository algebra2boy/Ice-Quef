import React from 'react';
import { View } from 'react-native';
import { BasePage } from '../style/BasePage';
import { KolynTextLabel } from './KolynTextLabel';

export function LoadingPage({ text }) {
  return (
    <BasePage
      components={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <KolynTextLabel text={text} />
        </View>
      }
    />
  );
}
