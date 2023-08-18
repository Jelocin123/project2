import React, { useEffect, useState } from 'react';
import useRequestData from '../../hooks/useRequestData';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

import './SliderService.scss';

const SliderService = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    makeRequest("http://localhost:5023/reviews");
  }, []);

  useEffect(() => {
    if (data) {
      setReviews(data);
    }
  }, [data]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handleButtonClickPost = () => {
    navigate('/admin/postreview');
  };

  const handleButtonClickPut = () => {
    const currentReview = reviews[activeIndex];
    navigate('/admin/retreview', { state: {id: currentReview._id, content: currentReview.content, author: currentReview.author } });
  };

  const handleButtonClickDel = () => {
    const currentReview = reviews[activeIndex];
    navigate('/admin/delreview', { state: {id: currentReview._id, content: currentReview.content, author: currentReview.author } });
  };

  return (
    <>
      <div className="slider-container">
        <div className='header_review'>
          <h1 className='text-center'>Kundeudtaleser</h1>
          <hr className='mx-auto' />
        </div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <>
            {reviews.length > 0 && (
              <div>
                <div className="slider-content">
                  <p className="slider-text p-5 pt-0 pb-0">"{reviews[activeIndex].content}"</p>
                  <p className="slider-author">- {reviews[activeIndex].author}</p>
                </div>
              </div>
            )}
            {reviews.length > 1 && (
              <div className="slider-dots">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className={`dot ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => handleDotClick(index)}
                  ></div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div className='row justify-content-center'>

      <button onClick={handleButtonClickPost} className="btn btn-primary col-1 mt-3">Post dit review</button>

      <button onClick={handleButtonClickPut} className="btn btn_orange col-1 mt-3 ms-2">Ret dit review</button>

      <button onClick={handleButtonClickDel} className="btn btn-danger col-1 mt-3 ms-2">Slet dit review</button>

      </div>
    </>
  );
};

export default SliderService;
