import styles from './Preloader.module.css';

import preloader from '../../assets/preloader.svg';

const Preloader = () => (
  <div className={styles.preloader}>
    <img src={preloader} alt='preloader' />
  </div>
);

export default Preloader;
