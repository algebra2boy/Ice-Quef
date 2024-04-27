import { View } from 'react-native';
import { BasePage } from '../style/BasePage';
import { KolynTextLabel } from './KolynTextLabel';

/**
 * Resembles a loading page, used to filling in the loading
 * data gap.
 * 
 * @param { string } text The text to be displayed 
 * @returns { ReactElement } The loading page
 */
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
