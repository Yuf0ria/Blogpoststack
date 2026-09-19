import { NavLink } from 'react-router-dom'

export default function Navbar(){
    return(
        <div>
            <nav className="navbar">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/commission">Commission</NavLink>
            </nav>
        </div>
    )
}