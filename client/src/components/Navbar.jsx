import { NavLink } from 'react-router-dom'

export default function Navbar(){
    return(
        <div>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/projects">Projects</NavLink>
            </nav>
        </div>
    )
}