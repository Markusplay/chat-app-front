import React, { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.css';
interface InputWithIconsProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input: React.FC<InputWithIconsProps> = ({
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <div className={styles.input_wrapper}>
      {leftIcon && (
        <span className={`${styles.input_icon} ${styles.left_icon}`}>
          {leftIcon}
        </span>
      )}
      <input
        style={leftIcon ? { padding: '10px 35px' } : { padding: '10px 15px' }}
        className={styles.input_field}
        {...props}
      />
      {rightIcon && (
        <span className={`${styles.input_icon} ${styles.right_icon}`}>
          {rightIcon}
        </span>
      )}
    </div>
  );
};

export default Input;
