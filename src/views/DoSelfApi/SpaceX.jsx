import { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader';

// Import request-hook
import useRequestData from '../../hooks/useRequestData';

const SpaceX = () => {
  // Initialize request-hook
  const { data, isLoading, error, makeRequest } = useRequestData();

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    makeRequest(`https://api.spacexdata.com/v3/history`);
  }, []);

  console.log(data, isLoading, error);

  const totalPages = Math.ceil((data ? data.length : 0) / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data ? data.slice(startIndex, endIndex) : [];

  return (
    <div>
      <h1>SpaceX History</h1>

      {isLoading && <Loader />}

      {error && <Error />}

      {data && (
        <>
          <div className='row justify-content-center' style={{ display: 'flex', gap: '2px' }}>
            <button
              className='btn col-1 me-4'  
              style={{ whiteSpace: 'nowrap' }}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              &lt;&lt; Previous Page
            </button>
            
            <button
              className='btn col-1'  
              style={{ whiteSpace: 'nowrap' }}
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next Page &gt;&gt;
            </button>
          </div>

          <div className="row">
            {currentData.map((event, i) => (
              <div className="col-lg-3 col-6 mt-3" key={i}>
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{event.details}</p>
                    {event.links.article && (
                      <a
                        href={event.links.article}
                        className="card-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Article
                      </a>
                    )}
                    {event.links.wikipedia && (
                      <a
                        href={event.links.wikipedia}
                        className="card-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Wikipedia
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SpaceX;
