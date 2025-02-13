import Events from './Events'; 
import Header from './components/Header';
import Details from './Details';
import { useState } from "react";

function App() {
  const [page, setPage] = useState('events');
  const [eventId, setEventId] = useState(null);

  const handlePageChange = (page) => {
    setPage(page);
  }

  return (
    <>
      <div >
        <header>
          {page === 'details' ? <Header setPage={handlePageChange} /> : <Header setPage={handlePageChange} />}
        </header>

        <main className='p-4'> 
          {page === 'details' ? <Details setPage={setPage} eventId={eventId} /> : <Events setPage={setPage} setEventId={setEventId} />}
        </main>
      </div>
    </>
  );
}

export default App;