import styles from '../Music.module.scss'

import * as yup from 'yup'

import {
  ChangeEventHandler,
  FC,
  useState,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from 'react'
import { useForm, UseFormRegister } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FieldErrorMessage,
  FormErrorMessage,
} from '../../../components/Login/LoginForm'

import { saveMusicFile } from '../../../../redux/ducks/music/operations'
import { useDispatch } from 'react-redux'

type DropzoneFileType = {
  name: string
  file: File | null
}

const DropzoneContext = createContext<any>(null)

type AddMusicPopupDataType = {
  songName: string
}

export const AddMusicPopup: FC<{
  setIsActive: Dispatch<SetStateAction<boolean>>
}> = props => {
  const dispatch = useDispatch()

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
      dispatch(saveMusicFile(data.songName, audioFile.file, pictureFile.file))
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
