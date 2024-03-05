import styles from './Form.module.css';
import Input from '../Input/Input';
import { InputType } from '../../types/types';
import React, { useState } from 'react';
import Button from '../Button/Button';
import { song_options, key_options } from '../../utils/options';
import { KaraokeSchema } from './Schema';

const Form = () => {
  const [name, setName] = useState('');
  const [song, setSong] = useState('');
  const [allowSave, setAllowSave] = useState(false);
  const [songKey, setSongKey] = useState('0');
  const [picture, setPicture] = useState<null | File>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSong(event.target.value);
  };

  const handleSaveChange = () => {
    setAllowSave(!allowSave);
  };

  const handleSongKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSongKey(event.target.value);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setPicture(selectedFiles?.[0]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      name,
      song,
      songKey,
      allowSave,
    };
    try {
      console.log(formData);
      const res = KaraokeSchema.parse(formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.FormContainer}>
      <h3>Ilmoittautumislomake</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type={InputType.text}
          label={'Nimi tai nimimerkki*'}
          onChange={handleNameChange}
          name="name"
          required
        />
        <Input
          type={InputType.upload}
          label={'Kasvokuva'}
          cta={'+ Tuo kasvokuva'}
          onChange={handleUpload}
          file={picture}
          name="picture"
          accept="image/"
        />

        <Input
          type={InputType.select}
          label={'Biisi*'}
          options={song_options}
          name="song"
          defaultOption="Valitse alta"
          onChange={handleSongChange}
          value={song}
          required
        />
        <Input
          type={InputType.radio}
          label={'Sävellaji*'}
          name="songKey"
          radioValue={songKey}
          onChange={handleSongKeyChange}
          required
        />
        <Input
          type={InputType.checkbox}
          label={'Sallin tietojeni tallennuksen karaokejärjestelmään'}
          onChange={handleSaveChange}
          name="savetodatabase"
          checked={allowSave}
        />
        <Button type="submit">Ilmoittaudu</Button>
      </form>
    </div>
  );
};

export default Form;
