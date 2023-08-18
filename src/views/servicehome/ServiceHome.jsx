import React, { useEffect } from 'react';
import './ServiceHome.scss';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import useRequestData from '../../hooks/useRequestData';
import Parser from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit, AiFillDelete  } from 'react-icons/ai';

const ServiceHome = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataabout, makeRequest: makeRequestabout } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:5023/services");
  }, []);

  useEffect(() => {
    makeRequestabout("http://localhost:5023/aboutus");
  }, []);

  const handleButtonClick = () => {
    navigate('/admin/aboutus');
  };

  const navigate = useNavigate();


  return (
    <article className='row ms-lg-5 me-lg-5'>
      <section className='home_service col-lg-6 col-12 '>
        <h1 className='m-0 mt-3 text-center text-lg-start'>
          Velkommen til
          <span className='h1_span'> Viborg Haveservice</span>
          <hr className='mt-lg-0 mt-3'/>
        </h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <div>
            
            {dataabout && (
              <div>
                <p className='mt-5'>{Parser(dataabout.content)}</p>
              </div>
            )}
            <div className='row justify-content-lg-start justify-content-center p-5 p-lg-0 ps-lg-3 pt-0 pb-0'>
            <button 
              className='btn_ydelser mt-lg-5' 
              onClick={handleButtonClick}>
                SE ALLE YDELSER
            </button>
          </div>
          </div>
        )}
      </section>

      <section className="col-lg-6 col-12 image-grid ">
        {data &&
          data.slice(0, 2).map((service) => (
            <div  key={service._id} className="image-grid-item">
              <img
                src={"http://localhost:5023/images/" + service.image}
                alt={service.title}
                className='img-fluid mt-lg-0 mt-3'
              />
              <h2 className='mt-2'>{service.title}</h2>
              <p className='mt-lg-3'>{service.content}</p>
            </div>
          ))}
      </section>
    </article>
  );
};

export default ServiceHome;
