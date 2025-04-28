import Post from "./Post"

function PostList({ posts }) {
    return (
        <div className="PostList">
            {
                posts.map((post) => {
                    const { id, title } = post
                    return <Post key={id} title={title} id={id} />
                })
            }
        </div>
    )
}

export default PostList