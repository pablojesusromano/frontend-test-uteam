import { useContext, useState } from "react"
import Post from "./Post"
import { PostsContext } from "../contexts/PostsContext"

function PostList({ posts }) {
    const [successMessage, setSuccessMessage] = useState(null)
    const { removePost } = useContext(PostsContext)

    const handleSuccess = (id) => {
        removePost(id)
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