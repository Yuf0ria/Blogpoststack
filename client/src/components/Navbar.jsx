import { NavLink } from 'react-router-dom'

export default function Navbar(){
    return(
        <div>
            <nav className="navbar">
                <NavLink to="/" end>Base</NavLink>
                <NavLink to="/projects">Quests</NavLink>
                <NavLink to="/blog">Journal</NavLink>
                <NavLink to="/commission">Commissions</NavLink>
            </nav>
        </div>
    )
}

/*Commenting so I won't get confused:

Home - Base
Projects - Quests
Blogs -  journal
Commission - Commissions

can't be bothered with renaming every file, maybe next time.*/