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

            setPosts([...storedPosts, ...apiPosts])
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
        const auxPosts = storedPosts.filter(post => post.id !== id)
        localStorage.setItem('createdPosts', JSON.stringify([...auxPosts]))
    }

    const updatePost = (updatedPost) => {
        setPosts(prevPosts =>
            prevPosts.map(post => 
                post.id === updatedPost.id ? updatedPost : post
            )
        )
        const storedPosts = JSON.parse(localStorage.getItem('createdPosts')) || []
        const updatedStoredPosts = storedPosts.map(post => 
            post.id === updatedPost.id ? updatedPost : post
        )
        localStorage.setItem('createdPosts', JSON.stringify(updatedStoredPosts))
    }

    const clearStoredPosts = () => {
        localStorage.removeItem('createdPosts')
        fetchPosts()
    }

    return (
        <PostsContext.Provider value={{ posts, setPosts, isLoading, error, fetchPosts, addPost, removePost, updatePost, clearStoredPosts }}>
            {children}
        </PostsContext.Provider>
    )
}