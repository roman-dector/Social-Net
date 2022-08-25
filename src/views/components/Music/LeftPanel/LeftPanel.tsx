import styles from '../Music.module.scss'

import * as yup from 'yup'
import { MusicItem } from '../../../../redux/ducks/music/types'

import {
  ChangeEventHandler,
  FC,
  useState,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from 'react'
import { useForm, UseFormRegister, FieldError } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FieldErrorMessage,
  FormErrorMessage,
} from '../../../components/Login/LoginForm'

type DropzoneFileType = {
  name: string
  file: File | null
}

const DropzoneContext = createContext<any>(null)

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
}

const AddMusicPopup: FC<{
  onChangeAudio: ChangeEventHandler<HTMLInputElement>
  setIsActive: Dispatch<SetStateAction<boolean>>
}> = props => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<AddMusicPopupDataType>({
    resolver: yupResolver(yup.object({ songName: yup.string().required() })),
    mode: 'onSubmit',
  })

  const [formError, setFormError] = useState({ type: '', message: '' })
  const [audioFile, setAudioFile] = useState<DropzoneFileType>({
    name: '',
    file: null,
  })

  const [pictureFile, setPictureFile] = useState<DropzoneFileType>({
    name: '',
    file: null,
  })

  const onSubmit = (data: AddMusicPopupDataType) => {
    if (!audioFile.file) {
      setFormError({
        type: 'AudioNotFound',
        message: 'You should add some audio',
      })
    } else {
      console.log({
        songName: data.songName,
        audioFile: audioFile.file,
        pictureFile: pictureFile.file,
      })
      setFormError({ type: '', message: '' })
      setValue('songName', '')
      setAudioFile({ name: '', file: null })
      setPictureFile({ name: '', file: null })
    }
  }

  return (
    <div className={styles.addMusicPopup}>
      <form
        className={styles.addMusicPopupForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.nameContainer}>
          <label>Name:</label>
          <input {...register('songName')} type={'text'} />
          <FieldErrorMessage
            error={errors.songName}
            touched={touchedFields.songName}
            style={{ color: 'red' }}
          />
        </div>

        <DropzoneContext.Provider
          value={{
            audioFile,
            pictureFile,
            setAudioFile,
            setPictureFile,
            setFormError,
          }}
        >
          <Dropzone register={register} />
        </DropzoneContext.Provider>

        <FormErrorMessage error={formError} style={{ color: 'red' }} />

        <div className={styles.buttons}>
          <input
            type={'button'}
            value={'Close'}
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
  const context = useContext(DropzoneContext)

  return (
    <div className={styles.filesDropzone}>
      <div>
        <label>Audio file:</label>
        <FileInput
          setFile={context.setAudioFile}
          fileName={context.audioFile.name}
          acceptedFiles={['audio/mpeg']}
        />
      </div>

      <div>
        <label>Picture:</label>
        <FileInput
          setFile={context.setPictureFile}
          fileName={context.pictureFile.name}
          acceptedFiles={['image/jpeg', 'image/png']}
        />
      </div>
    </div>
  )
}

const FileInput: FC<{
  setFile: Dispatch<SetStateAction<DropzoneFileType>>
  fileName: string
  acceptedFiles: string[]
}> = props => {
  const [mediaError, setMediaError] = useState('')
  const [isDragActive, setIsDragActive] = useState(false)

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(true)
  }

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
  }

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]

    if (props.acceptedFiles.includes(file.type)) {
      props.setFile({ name: file.name, file })
      setMediaError('')
    } else {
      setMediaError('Incorrect file type')
    }

    setIsDragActive(false)
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files?.length) {
      const file = files[0]

      if (props.acceptedFiles.includes(file.type)) {
        props.setFile({ name: file.name, file: file })
        setMediaError('')
      } else {
        setMediaError('Incorrect file type')
      }
    }
  }

  let inputText

  if (mediaError) {
    inputText = <span style={{ color: 'red' }}>{mediaError}</span>
  } else if (props.fileName) {
    inputText = props.fileName
  } else {
    inputText = (
      <>
        Drop here
        <br />
        Click to select
      </>
    )
  }

  return (
    <div
      className={styles.FileInput}
      onDragStart={dragStartHandler}
      onDragOver={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDrop={onDropHandler}
    >
      <label>
        <input type={'file'} onChange={onSelectFile} />
        <span>{inputText}</span>
      </label>
    </div>
  )
}
