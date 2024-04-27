import React from 'react';
import '@testing-library/react-native/extend-expect'
import { KolynTextfield } from '../component';
import { ThemeProvider } from '../style/AppTheme';
import { Default } from '../views/'

test('', async () => {
  const component = (
    <ThemeProvider>
      <KolynTextfield />
    </ThemeProvider>
  );

  expect(component).toMatchSnapshot();
});
