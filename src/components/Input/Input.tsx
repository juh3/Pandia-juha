import React from 'react'
import styles from './Input.module.css'
import { InputType } from '../../types/types'

interface IInputProps
  extends React.InputHTMLAttributes<
    HTMLInputElement | HTMLSelectElement
  > {
  label: string
  type: InputType
  name: string
  cta?: string
  options?: string[]
  defaultOption?: string
  radioValue?: string
  file?: File | null
  error?: string | undefined
}

const Input: React.FC<IInputProps> = ({
  label,
  type,
  options,
  name,
  cta,
  radioValue,
  file,
  defaultOption,
  error,
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
            <input
              className={`${styles.TextInput} ${
                error ? styles.ErrorInput : ''
              }`}
              value={props.value}
              {...props}
            />
            {error && (
              <span className={styles.ErrorText}>{error}</span>
            )}
          </>
        )

      case InputType.select:
        return (
          <>
            <label htmlFor={name} className={styles.InputLabel}>
              {label}
            </label>

            <select
              className={`${styles.Select} ${
                error ? styles.ErrorInput : ''
              }`}
              value={props.value}
              {...props}
            >
              <option disabled value="">
                {defaultOption}
              </option>
              {options?.map((option, index) => (
                <option
                  key={index}
                  className={styles.SelectOption}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>
            {error && (
              <span className={styles.ErrorText}>{error}</span>
            )}
          </>
        )

      case InputType.checkbox:
        return (
          <div className={styles.CheckboxContainer}>
            <input
              type="checkbox"
              className={`${styles.Checkbox} ${
                error ? styles.ErrorInput : ''
              }`}
              {...props}
            />
            <label htmlFor={name} className={styles.CheckboxLabel}>
              {label}
            </label>
            {error && (
              <span className={styles.ErrorText}>{error}</span>
            )}
          </div>
        )

      case InputType.radio:
        return (
          <>
            <label className={styles.InputLabel}>{label}</label>
            <div className={styles.RadioContainer}>
              {options?.map((option, index) => (
                <label
                  htmlFor={name + option}
                  key={index}
                  className={styles.RadioMask}
                >
                  <input
                    type="radio"
                    className={`${styles.Radio} ${
                      error ? styles.ErrorInput : ''
                    }`}
                    checked={radioValue === option}
                    value={option}
                    id={option}
                    {...props}
                  />
                  <span> {option}</span>
                </label>
              ))}
              {error && (
                <span className={styles.ErrorText}>{error}</span>
              )}
            </div>
          </>
        )

      case InputType.upload:
        return (
          <>
            <label className={styles.InputLabel}>{label}</label>
            <label
              htmlFor={name}
              className={`${styles.FileMask} ${
                error ? styles.ErrorInput : ''
              }`}
            >
              <input
                type="file"
                className={styles.FileInput}
                {...props}
              />
              <span>{file ? <p>{file.name}</p> : cta}</span>
            </label>
            {error && (
              <span className={styles.ErrorText}>{error}</span>
            )}
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
