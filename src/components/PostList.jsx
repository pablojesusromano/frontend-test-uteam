import { useState } from "react"
import Post from "./Post"

function PostList({ posts, setPosts }) {
    const [successMessage, setSuccessMessage] = useState(null)

    const handleSuccess = (id) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id))
        setSuccessMessage('¡Post eliminado exitosamente!')
        setTimeout(() => setSuccessMessage(null), 3000)
    }

    return (
        <div className="PostList">
            { successMessage && 
                <span className="success-message">{successMessage}</span>
            }
            {
                posts.map((post) => {
                    const { id, title } = post
                    return <Post key={id} title={title} id={id} onDeleteSuccess={handleSuccess} />
                })
            }
        </div>
    )
}

export default PostList