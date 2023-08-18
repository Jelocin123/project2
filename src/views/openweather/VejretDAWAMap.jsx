import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import useRequestData from '../../hooks/useRequestData';
import LeafletMap from '../../components/leaflet/LeafLetMap';
import './vejretdawamap.scss'

const VejretDAWAMap = () => {
  const [zipCode, setZipCode] = useState('8500');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataDAWA, isLoading: isLoadingDAWA, error: errorDAWA, makeRequest: makeRequestDAWA } = useRequestData();

  useEffect(() => {
    makeRequest(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},dk&units=metric&lang=da&appid=28453e9e7b6704d61073f3cecac18658`
    );
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setZipCode(value);
    if (value.length > 0) {
      makeRequestDAWA('https://api.dataforsyningen.dk/postnumre/autocomplete?q=' + value);
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleOptionClick = (selectedZipCode) => {
    setZipCode(selectedZipCode);
    setIsDropdownOpen(false);
    makeRequest(
      `https://api.openweathermap.org/data/2.5/weather?zip=${selectedZipCode},dk&units=metric&lang=da&appid=28453e9e7b6704d61073f3cecac18658`
    );
  };

  const handleDropdownBlur = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div>
      

      {isLoading && !data && <Loader />}
      {error && <Error />}

      {data && (
        
          <div className='row justify-content-center mb-5 pt-5'>
            <div className='col-3 me-5 info_box'>
              <h2>
                {data.name}{' '}
                <img
                  src={'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'}
                  alt="Weather Icon"
                />
              </h2>
              <ul>
                <li>Temperatur: {Math.round(data.main.temp)}&deg; C</li>
                <li>Luftfugtighed: {data.main.humidity} %</li>
                <li>Vindhastighed: {Math.round(data.wind.speed)} m/s</li>
                <li>Vindretning: {data.wind.deg}&deg;</li>
                <li>
                  Sol op &#127749; : kl.{' '}
                  {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </li>
                <li>
                  Sol ned &#127751; : kl.{' '}
                  {new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </li>
              </ul>
            </div>
            <div className='col-2'>
              {data && <LeafletMap coordinates={[data.coord.lat, data.coord.lon]} />}
            </div>
          </div>
      )}
      <div className='row justify-content-center'>
      <h1 className='text-center'>Vejret lige nu i forskellige byer</h1>

      <input
        type="text"
        value={zipCode}
        onChange={handleInputChange}
        autoComplete="off"
        placeholder="Indtast et postnummer og få vejret!"
        className='col-2'
      />
      </div>
      
      <div className='text-center' onBlur={handleDropdownBlur}>
        <ul className='list-unstyled'>
          {isDropdownOpen &&
            dataDAWA &&
            dataDAWA.map((a) => (
              <li key={a.postnummer.nr} onClick={() => handleOptionClick(a.postnummer.nr)}>
                {a.tekst}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default VejretDAWAMap;
