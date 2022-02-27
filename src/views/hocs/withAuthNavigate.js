import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsUserAuthed } from '../../redux/ducks/auth/selectors';

const mapStateToProps = state => ({
  isUserAuthed: selectIsUserAuthed(state),
});

const withAuthNavigate = Component => {
  const ComponentContainer = props => {
    if (!props.isUserAuthed) return <Navigate replace to='/login' />;
    return <Component {...props} />;
  };

  return connect(mapStateToProps)(ComponentContainer);
};

export default withAuthNavigate;
