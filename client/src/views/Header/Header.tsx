import './Header.scss'
import { Link, useLocation } from 'react-router-dom'

import { LogoImage } from '../../assets/images'
import Seperator from '../../components/Seperator/Seperator'
import { useMenuLinks } from '../../hooks'

function Header() {
    const menuLinks = useMenuLinks()
    const location = useLocation()

    return (
        <>
            <div className='header-wrapper d-flex flex-wrap justify-content-between'>
                <div>
                    {
                        menuLinks.map(({ name, route }, index) => {
                            const key = name + index
                            if (index === 0) {
                                return (<Link key={key} className='me-4' to={route}><img src={LogoImage} /></Link>)
                            }
                            return (
                                <Link
                                    key={key}
                                    className={`ms-5 ${location.pathname === route ? 'active' : null}`}
                                    to={route}>
                                    {name}
                                </Link>)
                        })
                    }
                </div>
            </div>
            <Seperator />
        </>
    )
}

export default Header