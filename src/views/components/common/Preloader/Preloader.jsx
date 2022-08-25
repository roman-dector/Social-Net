import styles from './Preloader.module.css';

import preloader from '../../../assets/preloader.svg';


const Preloader = ({width = 150}) => {
  return (
    <div className={styles.preloader}>
      <img src={preloader} alt='preloader' width={width}/>
    </div>
  )
}

export default Preloader
