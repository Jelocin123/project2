import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const PriceChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    if (data && data.records) {
      const labels = data.records.map((record) => record.HourDK);
      const spotPricesDKK = data.records.map((record) => record.SpotPriceDKK);
      const spotPricesEUR = data.records.map((record) => record.SpotPriceEUR);

      const ctx = chartRef.current.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Spot Price (DKK)',
              data: spotPricesDKK,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 1,
            },
            {
              label: 'Spot Price (EUR)',
              data: spotPricesEUR,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }


    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <div className="chart-container" style={{ width: '1300px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PriceChart;
