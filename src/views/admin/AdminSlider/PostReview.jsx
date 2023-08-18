import React, { useState } from 'react';
import useRequestData from '../../../hooks/useRequestData';
import Error from '../../../components/Error';
import Loader from '../../../components/Loader';
import './postreview.scss'

const PostReview = () => {
  const { isLoading, error, makeRequest } = useRequestData();
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content || !author) {
      alert('Husk at udfylde begge felter');
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
      const response = await makeRequest(
        'http://localhost:5023/reviews/admin',
        requestOptions.headers,
        null,
        'POST',
        reviewData
      );

      

      setContent('');
      setAuthor('');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="text-center">
            <h1>Post et review</h1>
          </div>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Error />
          ) : isSubmitted ? (
            <p className="text-center">Tak for dit review!:)</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className='mb-3 ms-1' htmlFor="content">Review:</label>
                <textarea
                  className="form-control bg_border"
                  id="content"
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Skriv dit review"
                  required
                  style={{ resize: 'none' }}
                />
              </div>
              <div className="form-group">
                <label className='mb-3 mt-3 ms-1' htmlFor="author">Dit navn:</label>
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
                <button type="submit" className="btn bg_btn btn-primary">
                  POST REVIEW
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostReview;
