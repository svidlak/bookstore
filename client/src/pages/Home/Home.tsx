import { Cover, Categories, Promotions, BooksList } from '../../views'
import { useBooks } from '../../hooks'

function Home() {
  const { books } = useBooks({ limit: 6 })

  return (
    <>
      <Cover />
      <Categories />
      <div className='main-section d-flex'>
        <div className='w-25 px-4'>
          <Promotions />
        </div>
        <div className='w-75 px-4'>
          <BooksList books={books} header='New Releases' />
        </div>
      </div>
    </>
  )
}

export default Home