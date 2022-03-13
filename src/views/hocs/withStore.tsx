import { FC } from 'react'
import { Provider } from 'react-redux'
import store from '../../redux/store'

const withStore = (Component: FC) => (props: any) =>
  (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  )

export default withStore
