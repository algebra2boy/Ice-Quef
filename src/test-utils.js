import ContextApp from './views/ContextApp';
import { render } from '@testing-library/react-native';

const AllTheProviders = ({ children }) => {
  return <ContextApp>{children}</ContextApp>;
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
