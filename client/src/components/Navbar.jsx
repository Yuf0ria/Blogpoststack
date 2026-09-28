import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseFlag, faSignHanging, faPenNib, faPaintBrush } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
    const links = [
        
        { to: '/', Icon: <FontAwesomeIcon icon={faHouseFlag}/>, label: 'Base', end: true },
        { to: '/projects', Icon: <FontAwesomeIcon icon={faSignHanging}/>, label: 'Quests' },
        { to: '/blog', Icon: <FontAwesomeIcon icon={faPenNib}/>, label: 'Journal' },
        { to: '/commission', Icon: <FontAwesomeIcon icon={faPaintBrush}/>, label: 'Commissions' },
    ],
    [open, setOpen] = useState(false),
    close = () => setOpen(false)

    return (
    <nav>
        <button
            className="hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                {open
                    ? <path d="M5 5l14 14M19 5L5 19" />
                    : <path d="M3 6h18M3 12h18M3 18h18" />
                }
            </svg>
        </button>

        <div className={open ? 'nav-links open' : 'nav-links'}>
            {links.map(l => (
                <NavLink key={l.to} to={l.to} end={l.end} onClick={close}>
                    {l.Icon } {l.label}
                </NavLink>
            ))}
        </div>

      
    </nav>
  )
}