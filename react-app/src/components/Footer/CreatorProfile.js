export const CreatorProfile = ({creator}) => {
    return  (
        <div className="creator-card">
            <em>{creator.name}</em>
            <a href={creator.github} className="github-links"><i className="fab fa-github"></i></a>
        </div>
    )
}
