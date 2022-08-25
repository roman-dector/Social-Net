import styles from '../Music.module.scss'

import { MusicItem } from '../../../../redux/ducks/music/types'

import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import { ChangeEventHandler, FC, useCallback, useState } from 'react'
import { useForm, UseFormRegister } from 'react-hook-form'

export const MusicList: FC<{
  musicList: MusicItem[]
  onChangeAudio: ChangeEventHandler<HTMLInputElement>
}> = props => {
  return (
    <div className={styles.musicList}>
      <AddMusicButton onChangeAudio={props.onChangeAudio} />

      <div>
        {props.musicList.map((item, idx) => (
          <AudioPlayer key={idx} audioFileUrl={item.audioUrl} />
        ))}
      </div>
    </div>
  )
}

const AudioPlayer: FC<{ audioFileUrl: string }> = props => {
  return (
    <audio controls>
      <source src={props.audioFileUrl} />
    </audio>
  )
}

export const AddMusicButton: FC<{
  onChangeAudio: ChangeEventHandler<HTMLInputElement>
}> = props => {
  const [isActive, setIsActive] = useState(false)

  return (
    <>
      <div
        className={styles.addMusicButton}
        onClick={() => {
          setIsActive(true)
        }}
      ></div>
      {isActive ? (
        <AddMusicPopup
          onChangeAudio={props.onChangeAudio}
          setIsActive={setIsActive}
        />
      ) : null}
    </>
  )
}

type AddMusicPopupDataType = {
  songName: string
  audioFile: File
  pictureFile: File
}

const AddMusicPopup: FC<{
  onChangeAudio: ChangeEventHandler<HTMLInputElement>
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}> = props => {
  const { register, handleSubmit } = useForm<AddMusicPopupDataType>()

  const onSubmit = (data: AddMusicPopupDataType) => {}

  return (
    <div className={styles.addMusicPopup}>
      <form
        className={styles.addMusicPopupForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.nameContainer}>
          <label>Name:</label>
          <input {...register('songName')} type={'text'} />
        </div>

        <Dropzone register={register} />

        <div className={styles.buttons}>
          <input
            type={'button'}
            value={'Cancel'}
            onClick={() => {
              props.setIsActive(false)
            }}
          />
          <input type={'submit'} value={'Accept'} />
        </div>
      </form>
    </div>
  )
}

const Dropzone: FC<{
  register: UseFormRegister<AddMusicPopupDataType>
}> = props => {
  const [mediaFiles, setMediaFile] = useState<{
    audioFile: File | null
    pictureFile: File | null
  }>({ audioFile: null, pictureFile: null })

  const [audioFileName, setAudioFileName] = useState<string | null>(null)
  const [pictureFileName, setPictureFileName] = useState<string | null>(null)

  const onDrop = useCallback(
    <T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      // @ts-ignore
      let fileInputName = event?.target?.previousElementSibling?.name

      if (fileInputName === 'audioFile') {
        setMediaFile({ ...mediaFiles, audioFile: acceptedFiles[0] })
        setAudioFileName(acceptedFiles[0].name)
      }
      if (fileInputName === 'pictureFile') {
        setMediaFile({ ...mediaFiles, pictureFile: acceptedFiles[0] })
        setPictureFileName(acceptedFiles[0].name)
      }
    },
    []
  )

  const onFileSelect = async (event: DropEvent) => {
    // @ts-ignore
    const fileList = event.dataTransfer
    // @ts-ignore
      ? event.dataTransfer?.files
    // @ts-ignore
      : event.target.files;
    console.log(fileList)
    return fileList
  }

  const { getRootProps, getInputProps } = useDropzone({onDrop, getFilesFromEvent: event => onFileSelect(event)})



  return (
    <div {...getRootProps()} className={styles.filesDropzone}>
      <div>
        <label>Audio file:</label>
        <FileInput {...getInputProps()} name={'audioFile'} textHolder={audioFileName}/>
      </div>

      <div>
        <label>Picture:</label>
        <FileInput {...getInputProps()} name={'pictureFile'} textHolder={pictureFileName}/>
      </div>
    </div>
  )
}

const FileInput: FC<{
  textHolder: string | null
  name: string
}> = ({ textHolder, ...props }) => {
  return (
    <div className={styles.FileInput}>
      <input {...props} onChange={e => {
        // @ts-ignore
        console.log(e?.target?.files[0])
        }}/>
      {textHolder ? (
        <span>{textHolder}</span>
      ) : (
        <span>
          Drop here
          <br />
          Click to select
        </span>
      )}
    </div>
  )
}
