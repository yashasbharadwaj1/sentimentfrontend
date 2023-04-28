import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div>
            <div style={{ marginBottom: "10px" }}>
                <Link to="/sentimentfrontend/">Home</Link>
            </div>

            <div style={{ marginBottom: "10px" }}>
                <Link to="/sentimentfrontend/Allverdicts">All Verdicts</Link>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <Link to="/sentimentfrontend/Filtersentimentbymovie">
                    Filter by Movie
                </Link>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <Link to="/sentimentfrontend/FiltersentimentbyIndustry">
                    Filter by Industry
                </Link>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <Link to="/sentimentfrontend/FiltersentimentbyHero">
                    Filter by Hero
                </Link>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <Link to="/sentimentfrontend/FiltersentimentbyHeroine">
                    Filter by Heroine
                </Link>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <Link to="/sentimentfrontend/Filterdatabyverdict">
                    Filter by Verdict
                </Link>
            </div>
        </div>
    );
};
export default Nav;