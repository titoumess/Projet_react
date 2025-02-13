import { useEffect, useState } from "react"

export default function Posts({ setPage }) {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/posts')
        .then((response) => response.json())
        .then((json) => setPosts(json))
      }, [])

    return (
        <div className="grid grid-cols-4 gap-4">
            {posts &&
                posts.map((post) => (
                    <a 
                        onClick={() => setPage('details')}
                        key={post.id} 
                        className="border border-neutral-200 p-4"
                    >
                        <span className="bg-neutral-600 square h-32 w-full inline-block"></span>
                        {post.title || 'No title'} - {post.views || 0}
                    </a>
            ))}
        </div>
    )
}