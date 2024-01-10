import './UploadImage.scss'
import { useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { UploadIcon } from '../../assets/icons'

type DragProps = {
    onDrop: (e: any) => void
    onDragEnter: (e: any) => void
    onDragLeave: (e: any) => void
    onDragOver: (e: any) => void
    onDragStart: (e: any) => void
}

interface Props {
    uploadImage: (file: File) => void
}

function UploadImage({ uploadImage }: Props) {
    const maxNumber = 1
    const [images, setImages] = useState([])

    const onChange = (imageList: any) => {
        setImages(imageList)
        uploadImage(imageList[0].file)
    }

    function NoImage({ onImageUpload, dragProps }: { onImageUpload: () => void, dragProps: DragProps }) {
        return (
            <div
                className='upload-image-container'
                onClick={onImageUpload}
                {...dragProps}
            >
                <img src={UploadIcon} />
                <p className='mt-4'>Drag and drop or Click to Upload</p>
            </div>
        )
    }

    function UpdateImage({ onImageUpdate, imageList }: { onImageUpdate: (index: number) => void, imageList: ImageListType }) {
        return (<div
            onClick={() => onImageUpdate(0)}
            className='image-item'
            style={{ backgroundImage: `url(${imageList[0]['data_url']})` }}
        >
        </div>)
    }

    return (
        <div className='App'>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey='data_url'
            >
                {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                    <div className='upload-image-wrapper'>
                        {
                            imageList.length === 0 ?
                                <NoImage onImageUpload={onImageUpload} dragProps={dragProps} />
                                :
                                <UpdateImage onImageUpdate={() => onImageUpdate(0)} imageList={imageList} />
                        }
                    </div>
                )}
            </ImageUploading>
        </div>
    )
}

export default UploadImage