import React, { useEffect, useState } from 'react';
import useRequestData from '../../hooks/useRequestData';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './energidato.scss';
import PriceChart from '../../components/PriceChart';

const EnergiDato = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [priceArea, setPriceArea] = useState('');
  const [date, setDate] = useState(null);

  const handleSubmit = () => {
    if (date && priceArea) {
      const formattedDate = formatDate(date);
      const apiUrl = `https://api.energidataservice.dk/dataset/Elspotprices?offset=0&start=${formattedDate}T00:00&end=${formattedDate}T23:59&filter=%7B%22PriceArea%22:[%22${priceArea}%22]%7D&sort=HourUTC%20DESC&timezone=dk`;
      makeRequest(apiUrl);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handlePriceAreaChange = (e) => {
    setPriceArea(e.target.value);
  };

  const june2023 = new Date(2023, 5, 1);

  const isFormValid = priceArea && date;

  return (
    <div className='row m-0 ms-5 pt-5'>
      <section className='col-lg-4 col-12 p-0'>
        <input
          type="text"
          value={priceArea}
          placeholder="Pris område"
          onChange={handlePriceAreaChange}
        />

        <select
          className='p-1 ms-2'
          value={priceArea}
          onChange={handlePriceAreaChange}
          required
        >
          <option value="">Vælg pris område</option>
          <option value="dk1">DK1</option>
          <option value="dk2">DK2</option>
        </select>
      </section>
      <section className='col-lg-4 col-12 p-0'>
        <DatePicker
          selected={date}
          onChange={(selectedDate) => setDate(selectedDate)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          minDate={june2023}
          maxDate={new Date(2023, 5, 30)}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          required
        />
        <button
          className='ms-2 btn_send'
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Søg..
        </button>
      </section>
      <div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error message={error} />
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Hour (UTC)</th>
                <th>Hour (DK)</th>
                <th>Price Area</th>
                <th>Spot Price (DKK)</th>
                <th>Spot Price (EUR)</th>
              </tr>
            </thead>
            <tbody>
              {data?.records
                .filter((record) => record.HourDK.includes(formatDate(date)))
                .map((record, index) => (
                  <tr key={index}>
                    <td>{record.HourUTC}</td>
                    <td>{record.HourDK}</td>
                    <td>{record.PriceArea}</td>
                    <td>{record.SpotPriceDKK}</td>
                    <td>{record.SpotPriceEUR}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          
        )}
        <div className="col-lg-10 offset-lg-1">
            {data && (
            <PriceChart data={data} />
         )}
        </div>
      </div>
      
    </div>
  );
};

export default EnergiDato;
