import styles from './Form.module.css'
import Input from '../Input/Input'
import { InputType } from '../../types/types'
import { useState } from 'react'
import Button from '../Button/Button'
import { song_options, key_options } from '../../utils/options'
import { KaraokeSchema } from './Schema'

const Form = () => {
  const [name, setName] = useState('')
  const [song, setSong] = useState('')
  const [allowSave, setAllowSave] = useState(false)
  const [songKey, setSongKey] = useState('0')

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value)
  }

  const handleSongChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSong(event.target.value)
  }

  const handleSaveChange = () => {
    setAllowSave(!allowSave)
  }

  const handleSongKeyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSongKey(event.target.value)
  }

  const handleSubmit = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault()
    const formData = {
      name,
      song,
      songKey,
      allowSave,
    }
    try {
      console.log(formData)
      const res = KaraokeSchema.parse(formData)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.FormContainer}>
      <h3>Ilmoittautumislomake</h3>
      <div>
        <Input
          type={InputType.text}
          label={'Nimi tai nimimerkki*'}
          onChange={handleNameChange}
          required
        />
        <Input type={InputType.upload} label={'Kasvokuva'} />

        <Input
          type={InputType.select}
          label={'Biisi*'}
          options={song_options}
          defaultOption="Valitse alta"
          onChange={handleSongChange}
          value={song}
          required
        />
        <Input
          type={InputType.radio}
          label={'Sävellaji*'}
          name="key"
          options={key_options}
          value={songKey}
          onChange={handleSongKeyChange}
          required
        />
        <Input
          type={InputType.checkbox}
          label={'Sallin tietojeni tallennuksen karaokejärjestelmään'}
          onChange={handleSaveChange}
          checked={allowSave}
          required
        />
        <Button onClick={handleSubmit} type="submit">
          Ilmoittaudu
        </Button>
      </div>
    </div>
  )
}

export default Form
