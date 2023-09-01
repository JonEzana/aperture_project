import { CreatorProfile } from "./CreatorProfile";
import "./Footer.css";

export const Footer = () => {
    const Colin = {name: "Colin Sung", github: "https://github.com/colinsung0714", linkedin: ""};
    const Vivian = {name: "Vivian Li", github: "https://github.com/Vivi355", linkedin: ""};
    const Ludia = {name: "Ludia Park", github: "https://github.com/lypark5", linkedin: ""};
    const Jon = {name: "Jon Ezana", github: "https://github.com/JonEzana", linkedin: ""};

    const creators = [Colin, Vivian, Ludia, Jon];

    return (
        <div className="footer-body">
            <div className="footer-content">
                <div className="technologies footer">
                    <h3>Technologies Used:</h3>
                    <span className="technology-icons">
                        <i className="fab fa-aws"></i>
                        <i className="fab fa-js-square"></i>
                        <i className="fab fa-react"></i>
                        <i className="fab fa-html5"></i>
                        <i className="fab fa-css3"></i>
                        <i className="fab fa-python"></i>
                    </span>
                </div>
                <div className="creators footer">
                    <h3>Meet the Developers:</h3>
                    <span className="creator-profiles">
                        {creators.map(creator =>
                            <CreatorProfile creator={creator}/>
                        )}
                    </span>
                </div>
            </div>
        </div>
    )
}
