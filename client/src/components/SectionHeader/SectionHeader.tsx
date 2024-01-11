import './SectionHeader.scss'
import { LogoImage } from '../../assets/images/index'

interface Props {
    title: string
}
function SectionHeader({ title }: Props) {
    return (<div className='section-header-wrapper fw-bold text-start'>
        <img src={LogoImage} className='mx-2' />
        <span>{title}</span>
    </div>)
}

export default SectionHeader