import React from 'react'
import styles from './Button.module.css'
import { PulseLoader } from 'react-spinners'

interface IButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting: boolean
  children: React.ReactNode
}

const Button: React.FC<IButton> = ({
  isSubmitting,
  children,
  ...props
}) => {
  return (
    <button
      className={styles.Button}
      disabled={isSubmitting}
      {...props}
    >
      {!isSubmitting ? (
        <>{children}</>
      ) : (
        <PulseLoader size={6} color="#fff" />
      )}
    </button>
  )
}

export default Button
