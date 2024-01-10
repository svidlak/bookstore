import './NotFound.scss'
import { SadBookImage } from '../../assets/images'

function NotFound() {
    return (<div className='not-found-wrapper'>
        <img src={SadBookImage} />
        <h3>404 Content not found :(</h3>

    </div>)
}

export default NotFound