import React, { useEffect, useState } from 'react';
import useRequestData from '../../hooks/useRequestData';
import Error from '../../components/Error';
import Loader from '../../components/Loader';

const EnergiData = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();

  

  useEffect(() => {
    makeRequest("https://api.energidataservice.dk/dataset/Elspotprices?offset=0&start=2023-03-02T00:00&end=2023-03-03T00:00&filter=%7B%22PriceArea%22:[%22dk1%22]%7D&sort=HourUTC%20DESC&timezone=dk");
  }, []);

  return (
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
            {data?.records.map((record, index) => (
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
    </div>
  );
};

export default EnergiData;
