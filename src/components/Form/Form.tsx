import styles from './Form.module.css'
import Input from '../Input/Input'
import { InputType } from '../../types/types'
import React, { ChangeEventHandler, useState } from 'react'
import Button from '../Button/Button'
import { song_options, key_options } from '../../utils/options'
import { KaraokeSchema } from '../../schemas/KaraokeSchema'
import { ZodError, ZodIssue } from 'zod'

const Form = () => {
  const [name, setName] = useState('')
  const [song, setSong] = useState('')
  const [allowSave, setAllowSave] = useState(false)
  const [songKey, setSongKey] = useState('0')
  const [picture, setPicture] = useState<null | File>(null)
  const [submitting, setSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<
    ZodIssue[] | null
  >(null)

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setValidationErrors(null)
    setName(event.target.value)
  }

  const handleSongChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setValidationErrors(null)

    setSong(event.target.value)
  }

  const handleSaveChange: ChangeEventHandler<
    HTMLInputElement
  > = () => {
    setValidationErrors(null)
    setAllowSave(!allowSave)
  }

  const handleSongKeyChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setValidationErrors(null)
    setSongKey(event.target.value)
  }

  const handleUpload: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { files } = event.target
    const selectedFiles = files as FileList
    setPicture(selectedFiles?.[0])
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    const formData = {
      name,
      song,
      songKey,
      allowSave,
      picture,
    }
    try {
      KaraokeSchema.parse(formData)
      setTimeout(() => {
        setSubmitting(false)
        setName('')
        setSong('')
        setSongKey('')
        setPicture(null)
      }, 3000)
      window.alert(JSON.stringify(formData))
    } catch (error) {
      if (error instanceof ZodError) {
        setTimeout(() => {
          setSubmitting(false)
        }, 1000)
        setValidationErrors(error.issues)
      }
    }
  }

  return (
    <div className={styles.FormContainer}>
      <h3>Ilmoittautumislomake</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type={InputType.text}
          label={'Nimi tai nimimerkki*'}
          onChange={handleNameChange}
          name="name"
          value={name}
          error={
            validationErrors?.find(
              (error) => error.path[0] === 'name'
            )?.message
          }
        />
        <Input
          type={InputType.upload}
          label={'Kasvokuva'}
          cta={'+ Tuo kasvokuva'}
          onChange={handleUpload}
          file={picture}
          name="picture"
          accept="image/"
          error={
            validationErrors?.find(
              (error) => error.path[0] === 'picture'
            )?.message
          }
        />

        <Input
          type={InputType.select}
          label={'Biisi*'}
          options={song_options}
          name="song"
          defaultOption="Valitse alta"
          onChange={handleSongChange}
          value={song}
          error={
            validationErrors?.find(
              (error) => error.path[0] === 'song'
            )?.message
          }
        />
        <Input
          type={InputType.radio}
          label={'Sävellaji*'}
          name="songKey"
          radioValue={songKey}
          onChange={handleSongKeyChange}
          options={key_options}
          error={
            validationErrors?.find(
              (error) => error.path[0] === 'songKey'
            )?.message
          }
        />
        <Input
          type={InputType.checkbox}
          label={'Sallin tietojeni tallennuksen karaokejärjestelmään'}
          onChange={handleSaveChange}
          name="savetodatabase"
          checked={allowSave}
          error={
            validationErrors?.find(
              (error) => error.path[0] === 'savetodatabase'
            )?.message
          }
        />
        <Button
          type="submit"
          isSubmitting={submitting}
          disabled={submitting}
        >
          Ilmoittaudu
        </Button>
      </form>
    </div>
  )
}

export default Form
