import React from 'react'
import styles from './Input.module.css'
import { InputType } from '../../types/types'
import { key_options } from '../../utils/options'

interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  type: InputType
  name: string
  cta?: string
  options?: string[]
  defaultOption?: string
}

const Input: React.FC<IInputProps> = ({
  label,
  type,
  options,
  name,
  cta,
  defaultOption,
  ...props
}) => {
  const renderInputField = () => {
    switch (type) {
      case InputType.text:
        return (
          <>
            <label htmlFor={name} className={styles.InputLabel}>
              {label}
            </label>
            <input className={styles.TextInput} {...props} />
          </>
        )

      case InputType.select:
        return (
          <>
            <label htmlFor={name} className={styles.InputLabel}>
              {label}
            </label>

            <select
              className={styles.Select}
              value={props.value || ''}
              {...props}
            >
              {' '}
              <option disabled value="">
                {defaultOption}
              </option>
              {options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        )

      case InputType.checkbox:
        return (
          <div className={styles.CheckboxContainer}>
            <input
              type="checkbox"
              className={styles.Checkbox}
              {...props}
            />
            <label htmlFor={name} className={styles.CheckboxLabel}>
              {label}
            </label>
          </div>
        )

      case InputType.radio:
        return (
          <>
            <label className={styles.InputLabel}>{label}</label>
            <div className={styles.RadioContainer}>
              {key_options.map((option, index) => (
                <label
                  htmlFor={name}
                  key={index}
                  className={styles.RadioLabel}
                >
                  <input
                    type="radio"
                    className={styles.Radio}
                    name={props.name}
                    value={props.value || ''}
                    {...props}
                  />
                  <span> {option}</span>
                </label>
              ))}
            </div>
          </>
        )

      case InputType.upload:
        return (
          <>
            <label className={styles.InputLabel}>{label}</label>
            <label htmlFor={name} className={styles.FileLabel}>
              <input
                type="file"
                className={styles.FileInput}
                {...props}
              />
              <span>{cta}</span>
            </label>
          </>
        )
      default:
        break
    }
  }

  return (
    <div className={styles.InputContainer}>
      <>{renderInputField()}</>
    </div>
  )
}

export default Input
