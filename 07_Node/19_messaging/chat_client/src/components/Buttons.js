import styles from "@/styles/buttons.module.css";


function ContainedButton({ children, onClick = () => { }, color = "black", backgroundColor = "lightgray", disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.contained}
      style={{
        color: color,
        backgroundColor: backgroundColor
      }}
    >
      {children}
    </button>
  )
}

export { ContainedButton }