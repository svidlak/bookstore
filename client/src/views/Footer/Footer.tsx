import Seperator from '../../components/Seperator/Seperator'

function Footer() {
    return (
        <div className='pt-5'>
            <Seperator />
            <div className='d-flex justify-content-between py-4 text-start'>
                <div>All rights reserved to Max Svidlo</div>
                <div className='d-flex gap-3'>
                    <a href='https://github.com/svidlak/bookstore' target='_blank'>Github</a>
                    <a href='https://www.linkedin.com/in/max-svidlo' target='_blank'>Linkedin</a>
                </div>
            </div>
        </div>
    )
}

export default Footer