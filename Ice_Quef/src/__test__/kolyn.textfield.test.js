import React from 'react';
import renderer from 'react-test-renderer';
import { KolynTextfield } from '../component';
import { ThemeProvider } from '../style/AppTheme';

describe('Textfield', () => {
  it('puts text', async () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <KolynTextfield />
        </ThemeProvider>,
      )
      .toJSON();

    //console.log(tree);
  });
});
