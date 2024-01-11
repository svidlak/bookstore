import Button from 'react-bootstrap/esm/Button'
import { DiscountLabel } from '..'
import './PromotionCard.scss'

interface Props {
    subtitle: string
    image: string
    discount: string
    title: string
}

function PromotionCard({ title, subtitle, image, discount }: Props) {
    return (
        <div className='promotion-card-wrapper d-flex flex-column justify-content-center py-3'>
            <span className='fs-5 fw-bold'>{title}</span>
            <span className='subtitle'>{subtitle}</span>
            <DiscountLabel discount={discount} />
            <img className='mx-auto my-4' src={image} />
            <div className='center-text p-2'>
                <Button variant='danger'>Buy now</Button>
            </div>
        </div>
    )
}

export default PromotionCard