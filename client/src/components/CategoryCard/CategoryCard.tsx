import './CategoryCard.scss'

interface Props {
    text?: string
    image?: string
}
function CategoryCard({ text, image }: Props){
    return(
    <div className='category-card-wrapper d-flex flex-column justify-content-center'>
        <h5 className='fw-bold'>{text}</h5>
        <img className='mx-auto' src={image} />
    </div>
    )
}

export default CategoryCard