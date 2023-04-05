import classNames from 'classnames';
import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import styles from './Button.module.scss';


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string,
  variant: "primary" | 'secondary',
  children: string;
  full?:boolean
  active?:boolean
  icon?: ReactElement | false;
}

const Button:React.FC<ButtonProps> = ({className, variant,children, active, full, icon,  ...rest}, ref) => {
  return (
    <button className={classNames(styles.button, styles[variant], className, {full, active})} {...rest} {...ref}>
      {icon && <span className={styles.buttonIcon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;