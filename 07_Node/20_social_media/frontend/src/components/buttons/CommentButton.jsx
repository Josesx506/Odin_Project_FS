import styles from '@/styles/buttons/cmtbtn.module.css';
import { FaRegComment } from "react-icons/fa";

export default function CommentButton({ comments }) {
  return (
    <div className={styles.cmpStyle} >
      <FaRegComment /> <span>{comments}</span>
    </div>
  )
}
