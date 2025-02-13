import Events from './Events'; 
import Header from './components/Header';
import Details from './Details';
import { useState } from "react";

function App() {
  const [page, setPage] = useState('events'); // Changement de 'posts' à 'events'

  const handlePageChange = (page) => {
    setPage(page);
  }

  return (
    <>
      <div className="max-w-6xl mx-auto min-h-screen border-x">
        <header className='flex justify-between items-center p-4 bg-neutral-300'>
          {page === 'details' ? <Header setPage={handlePageChange} /> : <Header setPage={handlePageChange} />}
        </header>

        <main className='p-4'> 
          {page === 'details' ? <Details /> : <Events setPage={setPage} />}
        </main>
      </div>
    </>
  );
}

export default App;