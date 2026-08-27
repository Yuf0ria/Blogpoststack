import { NavLink } from 'react-router-dom'

export default function Navbar(){
    return(
        <div>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/Inquire">Inquire</NavLink>
            </nav>
        </div>
    )
}