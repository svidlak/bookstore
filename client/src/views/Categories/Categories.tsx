import { Link } from 'react-router-dom'
import { CategoryCard } from '../../components'
import { useCategories } from '../../hooks'

function Categories() {
    const { categories } = useCategories()

    return (
        <div>
            <h2 className='fw-bold'>Categories</h2>
            <div className='d-flex justify-content-evenly mt-5'>
                {
                    categories.map(({ name, image }, index) => {
                        return (
                            <Link
                                to={`/category/${name.toLowerCase()}`}
                                key={name + index}
                                state={{ categoryName: name }}
                            >
                                <CategoryCard text={name} image={image} />
                            </Link>)
                    })
                }
            </div>
        </div>
    )
}

export default Categories