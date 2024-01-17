import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Chartone = () => {
    const chartRef = useRef(null);
    let chartInstance = null;
  
    useEffect(() => {
        const data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [
            {
              label: 'Line 1',
              data: [45000, 47000, 48000, 46000, 49000, 50000, 49000],
              borderColor: 'rgba(75, 192, 192, 1)', // Teal color
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Line 2',
              data: [48000, 49000, 47000, 50000, 49000, 48000, 50000],
              borderColor: 'rgba(255, 99, 71, 1)', // Tomato color
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Line 3',
              data: [46000, 47000, 48000, 47000, 49000, 48000, 49000],
              borderColor: 'rgba(255, 165, 0, 1)', // Orange color
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Line 4',
              data: [47000, 46000, 49000, 47000, 48000, 49000, 47000],
              borderColor: 'rgba(0, 0, 128, 1)', // Navy color
              borderWidth: 2,
              fill: false,
            },
          ],
        };
    
        const config = {
          type: 'line',
          data: data,
          options: {
            scales: {
              x: {
                type: 'category',
              },
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
            animation: {
              tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0.5,
                loop: true,
              },
            },
          },
        };
    
        if (chartInstance) {
          chartInstance.destroy();
        }
    
        const ctx = chartRef.current.getContext('2d');
        chartInstance = new Chart(ctx, config);
    
        return () => {
          if (chartInstance) {
            chartInstance.destroy();
          }
        };
      }, []);

  return (
    <>
    <canvas ref={chartRef} />
    <div className="" style={{margin:"0 150px"}}>
      <div className="max-w-xl bg-white rounded-lg shadow-lg p-8" >
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Cryptocurrency Price Chart</h1>
        <div className="mb-4">
          <div className="text-3xl font-bold text-indigo-600">Bitcoin (BTC)</div>
          <div className="text-gray-500">Last updated: 2023-11-08 12:00:00 UTC</div>
        </div>
        <div className="w-full h-64">
          <canvas ref={chartRef} width="400" height="200"></canvas>
        </div>
        <div className="mt-6">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md mr-4">
            Buy
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md">
            Sell
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Chartone;
