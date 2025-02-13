import Posts from './Posts'
import Details from './Details'
import { useState } from "react"
function App() {
  const [page, setPage] = useState('posts')

  const handlePageChange = (page) => {
    setPage(page)
  }

  return (
    <>
      <div className="max-w-6xl mx-auto min-h-screen border-x">
        <header className='flex justify-between items-center p-4 bg-neutral-300'>
          <h1 
            className='cursor-pointer'
            onClick={() => setPage('posts')}
            >  REACT PROJECT </h1>
          <span> PANIER </span>
        </header>

        <main className='p-4'> 
          {page === 'details' ? <Details /> : <Posts setPage={setPage} />}
        </main>
      </div>
    </>
  )
}

export default App
