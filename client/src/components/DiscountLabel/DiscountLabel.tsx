import './DiscountLabel.scss'

type Props = {
    discount: string
}
function DiscountLabel({ discount }: Props) {
    return (
        <div className='discount-label-wrapper'>
            <div className='discount-label'><p className='mt-2 fw-bold'>{discount}% <br />OFF</p></div>
        </div>
    )
}

export default DiscountLabel