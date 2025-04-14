import styles from "@/styles/forms.module.css";

function FormField({ 
  name, label, type = 'text', 
  placeholder, register, 
  rules, errors, ...rest 
}) {
  return (
    <div className={styles.authInput}>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        {...rest}
      />
      {errors[name] && (<p className={styles.errorMessage}>{errors[name].message}</p>
      )}
    </div>
  );
}

export { FormField };
