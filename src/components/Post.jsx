import { Link } from 'react-router-dom'
import { deletePost } from '../services/JsonPlaceholder'
import Button from './Button'

function Post({ title, id, onDeleteSuccess }) {

    const handleDelete = async(id) => {
        try {
            const response = await deletePost(id)
            console.log(response)
            if(onDeleteSuccess) {
                onDeleteSuccess()
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
                    <Button className='other-button'>Edit</Button>
                    <Button className='delete-button' onClick={handleDelete}>Delete</Button>
                </div>
            </div>
    )
}

export default Post