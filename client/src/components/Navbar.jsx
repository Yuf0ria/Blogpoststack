import { NavLink } from 'react-router-dom'

export default function Navbar(){
    return(
        <nav>
            <NavLink to="/" end>Base</NavLink>
            <NavLink to="/projects">Quests</NavLink>
            <NavLink to="/blog">Journal</NavLink>
            <NavLink to="/commission">Commissions</NavLink>
        </nav>
    )
}