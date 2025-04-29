import { useEffect, useState } from "react";
import { listPosts } from "../services/JsonPlaceholder";
import { PostsContext } from "./PostsContext";

export function PostsProvider({children}) {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchPosts = async () => {
        try {
            const response = await listPosts()
            const apiPosts = response.data

            const storedPosts = JSON.parse(localStorage.getItem('createdPosts')) || []
            const editedPosts = JSON.parse(localStorage.getItem('editedPosts')) || []
            const idEditedPosts = editedPosts.map(post => post.id)

            const filteredApiPosts = apiPosts.filter(post => !idEditedPosts.includes(parseInt(post.id)))

            setPosts([...storedPosts, ...editedPosts, ...filteredApiPosts])
            setError(null)
        } catch (error) {
            console.error("Error al obtener los posts", error.message)
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const addPost = (newPost) => {
        const storedPosts = JSON.parse(localStorage.getItem('createdPosts')) || []
        const maxId = storedPosts.length > 0 ? Math.max(...storedPosts.map(post => post.id)) : 100

        const postWithId = {
            ...newPost,
            id: maxId + 1
        }
        setPosts(prevPosts => [postWithId, ...prevPosts])
        localStorage.setItem('createdPosts', JSON.stringify([postWithId, ...storedPosts]))
    }

    const removePost = (id) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id))

        const storedPosts = JSON.parse(localStorage.getItem('createdPosts')) || []
        const editedPosts = JSON.parse(localStorage.getItem('editedPosts')) || []
        if(storedPosts.length > 0 && storedPosts.map(post => post.id).includes(parseInt(id))){
            const auxPosts = storedPosts.filter(post => post.id !== id)
            localStorage.setItem('createdPosts', JSON.stringify([...auxPosts]))
        }
        if(editedPosts.length > 0 && editedPosts.map(post => post.id).includes(parseInt(id))){
            const auxPosts = editedPosts.filter(post => post.id !== id)
            localStorage.setItem('editedPosts', JSON.stringify([...auxPosts]))
        }
    }

    const updatePost = (updatedPost, isStored) => {
        const storedPosts = JSON.parse(localStorage.getItem('createdPosts')) || []
        const editedPosts = JSON.parse(localStorage.getItem('editedPosts')) || []
        if(isStored) {
            const updatedStoredPosts = storedPosts.map(post => 
                post.id === updatedPost.id ? updatedPost : post
            )
            setPosts(prevPosts =>
                prevPosts.map(post => 
                    post.id === updatedPost.id ? updatedPost : post
                )
            )
            localStorage.setItem('createdPosts', JSON.stringify([...updatedStoredPosts]))
        } else {
            let updatedEditedPosts = []
            if(editedPosts.some(post => post.id === updatedPost.id)) {
                updatedEditedPosts = editedPosts.map(post => 
                    post.id === updatedPost.id ? updatedPost : post
                )
            } else {
                updatedEditedPosts = [updatedPost, ...editedPosts]
            }

            setPosts(prevPosts =>
                prevPosts.map(post => 
                    post.id === updatedPost.id ? updatedPost : post
                )
            )
            localStorage.setItem('editedPosts', JSON.stringify([...updatedEditedPosts]))
        }
    }

    const clearStoredPosts = () => {
        localStorage.removeItem('createdPosts')
        localStorage.removeItem('editedPosts')
        fetchPosts()
    }

    return (
        <PostsContext.Provider value={{ posts, setPosts, isLoading, error, fetchPosts, addPost, removePost, updatePost, clearStoredPosts }}>
            {children}
        </PostsContext.Provider>
    )
}