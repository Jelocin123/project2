import React, { useState, useEffect } from 'react';
import useRequestData from '../../../hooks/useRequestData';
import Error from '../../../components/Error';
import Loader from '../../../components/Loader';
import './postreview.scss';
import { useLocation } from 'react-router-dom';

const RetReview = () => {
  
  const { isLoading, error, makeRequest } = useRequestData();
  const location = useLocation();
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = async () => {
    if (!content || !author) {
      alert('Husk at udfylde begge felter');
      return;
    }

    const { state } = location;
    const id = state && state.id; 

    if (!id) {
      alert('ID not found');
      return;
    }

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      
    };

    const reviewData = {
      content,
      author,
    };

    try {
      await makeRequest(`http://localhost:5023/reviews/admin/${id}`,
       requestOptions.headers,
        null,
        'PUT',
        reviewData
        
       );
      setAuthor('');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  useEffect(() => {
    const { state } = location;
    if (state && state.content && state.author) {
      setContent(state.content);
      setAuthor(state.author);
    }
  }, [location]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="text-center">
            <h1>Ret dit review</h1>
          </div>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Error />
          ) : isSubmitted ? (
            <p className="text-center">Tak for dit review!:)</p>
          ) : (
            <div>
              <div className="form-group">
                <label className="mb-3 ms-1" htmlFor="content">
                  Review:
                </label>
                <textarea
                  className="form-control bg_border"
                  id="content"
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Ret dit review"
                  required
                  style={{ resize: 'none' }}
                />
              </div>
              <div className="form-group">
                <label className="mb-3 mt-3 ms-1" htmlFor="author">
                  Dit navn:
                </label>
                <input
                  type="text"
                  className="form-control bg_border"
                  id="author"
                  value={author}
                  onChange={handleAuthorChange}
                  placeholder="Skriv dit navn"
                  required
                />
              </div>
              <div className="text-center mt-3">
                <button type="button" className="btn bg_btn" onClick={handleSubmit}>
                  RET REVIEW
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetReview;
