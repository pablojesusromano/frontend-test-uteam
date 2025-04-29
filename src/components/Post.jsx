import { Link } from 'react-router-dom'
import { deletePost } from '../services/JsonPlaceholder'
import Button from './Button'

function Post({ title, id, onDeleteSuccess }) {

    const handleDelete = async(id) => {
        try {
            const response = await deletePost(id)
            console.log(response)
            if(onDeleteSuccess) {
                onDeleteSuccess(id)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
            <div className="Post">
                <h2>{title}</h2>
                <div className='post-buttons'>
                    <Link to={`/posts/${id}`}>
                        <Button className='other-button'>Ver</Button>
                    </Link>
                    <Link to={`/posts/edit/${id}`}>
                        <Button className='other-button'>Edit</Button>
                    </Link>
                    <Button className='delete-button' onClick={() => handleDelete(id)}>Delete</Button>
                </div>
            </div>
    )
}

export default Post