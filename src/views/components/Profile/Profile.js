import styles from './Profile.module.css';

import React, { useEffect } from 'react';
import { compose } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import withAuthNavigate from '../../hocs/withAuthNavigate';
import {
  getUserProfileInfo,
  getUserStatus,
  updateLoggedUserPhoto,
} from '../../../redux/ducks/profile/operations';
import {
  selectUserProfileInfo,
  selectUserProfileStatus,
  selectIsFetchingProfileInfo,
  selectIsFetchingProfileStatus,
} from '../../../redux/ducks/profile/selectors';
import { selectLoggedUserId } from '../../../redux/ducks/auth/selectors';
import {
  toggleIsFetchingProfileInfo,
  toggleIsFetchingProfileStatus,
} from '../../../redux/ducks/profile/actions';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import Preloader from '../common/Preloader';

const Profile = props => {
  let urlParams = useParams();

  useEffect(async () => {
    let userId;
    urlParams.userId
      ? (userId = urlParams.userId)
      : (userId = props.loggedUserId);

    props.toggleIsFetchingProfileInfo(true);
    await props.getUserProfileInfo(userId);
    props.toggleIsFetchingProfileInfo(false);

    props.toggleIsFetchingProfileStatus(true);
    await props.getUserStatus(userId);
    props.toggleIsFetchingProfileStatus(false);
  }, [urlParams]);

  const onChangePhoto = e => {
    if (e.target.files.length)
      props.updateLoggedUserPhoto(e.target.files[0]);
  };

  return (
    <div className={styles.profile}>
      {props.isFetchingProfileInfo ? (
        <Preloader />
      ) : (
        <ProfileInfo
          userProfileInfo={props.userProfileInfo}
          userProfileStatus={props.userProfileStatus}
          isFetchingProfileStatus={props.isFetchingProfileStatus}
          onChangePhoto={onChangePhoto}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  userProfileInfo: selectUserProfileInfo(state),
  userProfileStatus: selectUserProfileStatus(state),
  loggedUserId: selectLoggedUserId(state),
  isFetchingProfileInfo: selectIsFetchingProfileInfo(state),
  isFetchingProfileStatus: selectIsFetchingProfileStatus(state),
});

export default compose(
  withAuthNavigate,
  connect(mapStateToProps, {
    getUserProfileInfo,
    getUserStatus,
    updateLoggedUserPhoto,
    toggleIsFetchingProfileInfo,
    toggleIsFetchingProfileStatus,
  })
)(Profile);
