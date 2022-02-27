import styles from './ProfileInfo.module.css';

import default_avatar from '../../../assets/default_avatar.jpg';
import Preloader from '../../common/Preloader';
import { useForm } from 'react-hook-form';

const ProfileInfo = props => {
  let {
    photos,
    fullName,
    lookingForAJob,
    lookingForAJobDescription,
    aboutMe,
    contacts,
  } = props.userProfileInfo;
  return (
    <div className={styles.profileInfo}>
      <div className={styles.profilePhotoContainer}>
        <ProfilePhoto
          photo={photos?.large ? photos?.large : default_avatar}
          onChangePhoto={props.onChangePhoto}
        />

        {props.isFetchingProfileStatus ? (
          <Preloader />
        ) : (
          <span className={styles.userProfileStatus}>
            {props.userProfileStatus}
          </span>
        )}
      </div>
      <div className={styles.personalInfo}>
        <h3>Personal info</h3>
        <p>
          <b>Name: </b>
          {fullName}
        </p>
        <p>
          <b>Looking for a job: </b>
          {lookingForAJob ? 'Yes' : 'No'}
        </p>
        {lookingForAJob ? (
          <p>
            <b>Looking for a job description: </b> <br />
            {lookingForAJobDescription}
          </p>
        ) : null}
        <p>
          <b>About me: </b> <br />
          {aboutMe}
        </p>
      </div>

      <MyContacts contacts={contacts} />
    </div>
  );
};

const Contact = ({ title, value }) => {
  return (
    <p>
      <b>{title}: </b>
      {value}
    </p>
  );
};

const MyContacts = ({ contacts }) => (
  <div className={styles.contacts}>
    <h3>My contacts: </h3>
    {contacts
      ? Object.entries(contacts).map((e, i) => {
          return !e[1] ? null : <Contact key={i} title={e[0]} value={e[1]} />;
        })
      : null}
  </div>
);

const ChangePhoto = props => (
  <div className={styles.changePhotoContainer}>
    <label>
      <input type={'file'} onChange={props.onChangePhoto} />
      <span>Choose file</span>
    </label>
  </div>
);

const ProfilePhoto = props => {
  return (
    <div className={styles.profilePhoto}>
      <img src={props.photo} alt='user avatar' />
      <ChangePhoto onChangePhoto={props.onChangePhoto} />
    </div>
  );
};

const ProfileStatus = () => {};

export default ProfileInfo;
