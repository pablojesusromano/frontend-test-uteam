import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="Navbar">
            <h1>Uteam Frontend Test</h1>
            <Link className="links" to="/">Home</Link>
            <Link className="CreatePostLink" to="/posts/create">Crear Post</Link>
        </nav>
    )
}

export default Navbar