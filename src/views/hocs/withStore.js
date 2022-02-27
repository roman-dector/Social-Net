import { Provider } from 'react-redux';
import store from '../../redux/store';

const withStore = Component => props =>
  (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );

export default withStore;
