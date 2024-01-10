import './Cover.scss'

import { CoverImage } from '../../assets/images'

function Cover() {
    return (
        <div className='cover-wrapper d-flex'>
            <div className='text-start'>
                <h1 className='lh-base'>Discover a vast collection of top quality books for all genres</h1>
                <h4 className='mt-3'>Search books by title, author or genre</h4>
            </div>
            <img src={CoverImage} />
        </div>
    )
}

export default Cover