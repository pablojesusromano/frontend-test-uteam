import { Link } from 'react-router-dom'
import './Post.css'

function Post({ title, id }) {
    return (
        <Link to={`/posts/${id}`}>
            <div className="Post">
                <h2>{title}</h2>
            </div>
        </Link>
    )
}

export default Post