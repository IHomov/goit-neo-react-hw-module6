
import { FaUser, FaPhone } from 'react-icons/fa'
import styles from './Contact.module.css'

const Contact = ({ id, name, number, onDelete }) => {
  return (
    <li className={styles.contact}>
      <div className={styles.info}>
        <p>
          <FaUser className={styles.icon} /> {name}
        </p>
        <p>
          <FaPhone className={styles.icon} /> {number}
        </p>
      </div>
      <button
        className={styles.deleteBtn}
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </li>
  )
}

export default Contact