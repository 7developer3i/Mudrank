import React from 'react';
import Chart from 'chart.js/auto';

const UserChart = () => {
  const chartRef = React.createRef();
  let chartInstance = null;

  React.useEffect(() => {
    const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Users',
          data: [200, 350, 320, 420, 290, 480, 350],
          borderColor: 'rgba(75, 192, 192, 1)', // Teal color
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
    <div className="max-w-md w-full bg-white rounded-lg shadow p-4 md:p-6" style={{height:"65vh"}}>
      <div className="flex justify-between mb-5">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 pb-2">32.4k</h5>
          <p className="text-base font-normal text-gray-500">Users this week</p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 text-center">
          12%
          <svg
            className="w-3 h-3 ml-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
          </svg>
        </div>
      </div>
      <div>
        <canvas ref={chartRef} width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default UserChart;
