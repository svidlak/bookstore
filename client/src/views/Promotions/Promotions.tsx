import { CountdownTimer, PromotionCard, SectionHeader } from '../../components'
import { FeaturedImage, NewArrivalsImage } from '../../assets/images'

function Promotions() {
    return (
        <div>
            <div className='mb-5'>
                <SectionHeader title='Promotions' />
            </div>
            <div>
                <PromotionCard title='Featured' subtitle='by Best Authors' image={FeaturedImage} discount='30' />
            </div>
            <div className='mt-4'>
                <PromotionCard title='New Arrivals' subtitle='Discover the latest' image={NewArrivalsImage} discount='25' />
            </div>
            <div className='mt-4'>
                <CountdownTimer title='Special Offer' subtitle='Ends soon' />
            </div>
        </div>
    )
}

export default Promotions