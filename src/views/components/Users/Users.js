import styles from './Users.module.css'
import ReactTooltip from 'react-tooltip';


const Users = props => {
  return (
    <div className={styles.user}>
      <div>
        <h1 data-tip data-for='hint'>Users</h1>

        <ReactTooltip
          id='hint'
          type='info'
          delayShow={50}
          backgroundColor='#41c3e0a7'
          arrowColor='#41c3e0a7'
        >
          <span>Double click to edit</span>
        </ReactTooltip>
      </div>
    </div>
  )
}

export default Users
