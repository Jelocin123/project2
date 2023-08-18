import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import useRequestData from '../../hooks/useRequestData';
import './Vejret.scss';

const Vejret = () => {
  const [zipCode, setZipCode] = useState('');
  const { data, isLoading, error, makeRequest } = useRequestData();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      makeRequest(
        `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},dk&units=metric&lang=da&appid=28453e9e7b6704d61073f3cecac18658`
      );
    }
  };

  useEffect(() => {}, [data]);

  return (
    <div>
      <div className="row p-0 m-0 justify-content-center">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Indtast et postnummer.."
          className="col-2 pb-2 pt-2"
        />
      </div>
      {isLoading && <Loader />}
      {error && <Error message={error} />}
      {data && (
        <article>
          <h2 className="text-center mt-2">{data.city.name}</h2>
          <div className="row m-0 p-5">
            {data.list.map((item, index) => (
              <div key={index} className="col-3 ">
                <ul className='weather_col p-4'>
                  <li>Dato og tid: {item.dt_txt}</li>
                  <li>Temperatur: {Math.round(item.main.temp)}&deg; C</li>
                  <li>Solopgang &#127749;: {new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                  <li>Solnegang &#127751;: {new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                  <li>Luftfugtighed: {item.main.humidity}</li>
                  <li>Lufttryk: {item.main.pressure}</li>
                  <li>Description: {item.weather[0].description}</li>
                    <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="Weather Icon" />
                </ul>
              </div>
            ))}
          </div>
        </article>
      )}
    </div>
  );
};

export default Vejret;
