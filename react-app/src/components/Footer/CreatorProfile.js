import { NavLink } from "react-router-dom";

export const CreatorProfile = ({creator, creators}) => {
    return  (
        <NavLink to={creator.github} id='creator-item' key={creators.indexOf(creator)}>
            <p id='creator-name'>{creator.name}</p>
            <i id="github-icon" className="fab fa-github"></i>
        </NavLink>

    )
}
