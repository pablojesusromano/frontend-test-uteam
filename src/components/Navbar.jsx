import { Link } from "react-router-dom"
import Button from "./Button"

function Navbar() {
    return (
        <nav className="Navbar">
            <h1>Uteam Frontend Test</h1>
            <Link className="links" to="/">Home</Link>
            <Link style={{ marginLeft: '20px' }} to="/posts/create">
                <Button className="other-button">Crear Post</Button>
            </Link>
        </nav>
    )
}

export default Navbar