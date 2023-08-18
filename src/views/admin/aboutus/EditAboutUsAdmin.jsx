import React, { useEffect, useState, useRef } from 'react';
import useRequestData from '../../../hooks/useRequestData';
import Error from '../../../components/Error';
import Loader from '../../../components/Loader';
import './EditAboutUsAdmin.scss';
import { AiFillEdit } from 'react-icons/ai';

const AboutUs = () => {
  const [content, setContent] = useState('');
  const { data, isLoading, error, makeRequest } = useRequestData();
  const textareaRef = useRef(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    makeRequest('http://localhost:5023/aboutus');
    adjustTextareaHeight(); 
    window.addEventListener('resize', adjustTextareaHeight); 
    return () => {
      window.removeEventListener('resize', adjustTextareaHeight);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setContent(data.content);
      setTimeout(() => {
        if (textareaRef.current) { 
          adjustTextareaHeight();
        }
      }, 0);
    }
  }, [data]);

  const handleContentChange = (event) => {
    setContent(event.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSubmit = () => {
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    makeRequest(
      'http://localhost:5023/aboutus/admin',
      requestOptions.headers,
      null,
      'PUT',
      { content }
    );

    const confirmed = window.confirm('Er du sikker på at du vil rette about us?');
    if (confirmed) {
      setIsUpdated(true);
    }
  };

  return (
    <>
      <div className="row edit_about m-0 justify-content-lg-center">
        <h1 className="col-12 p-0 text-center m-0 p-lg-3 mt-4 mt-lg-0">
          Ret about us <AiFillEdit size="1.2em" />
        </h1>
        <div className="row justify-content-lg-center">
          <hr className="mt-5" />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <>
          <div className="row m-lg-5 mt-3 mb-lg-0 m-0 justify-content-lg-center">
            <textarea
              style={{ resize: 'none' }}
              id="content"
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              className="col-lg-6 pb-lg-3 overflow-hidden text_area"
            />
          </div>
          {isUpdated && (
            <p className="success-message text-center">About us er nu blevet rettet.</p>
          )}
          <div className="row justify-content-center">
            <button className="col-2 mt-2 btn_edit" onClick={handleSubmit}>
              Ret nu
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AboutUs;
