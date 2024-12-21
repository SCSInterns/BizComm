import React, { useState, useEffect } from 'react';
import axiosInstance from "../../utils/axiosInstance";
import "./rightgraphsec.css";
import Chart from 'chart.js/auto';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RightgraphSec = () => {
  const [chart, setChart] = useState(null);
  const [timePeriod, setTimePeriod] = useState('week');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [messageCount, setMessageCount] = useState([]);

  const fetchLabels = (period) => {
    if (period === 'week') {
      return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    } else if (period === 'month') {
      return Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    } else if (period === 'year') {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    } else {
      return []; // For selected year, labels will be dynamically set based on data
    }
  };

  // const fetchData = async (period) => {
  //   try {
  //     const response = await axiosInstance.get(`/dashboard/message-count/${period}`);
  //     setMessageCount(response.data.messageCount);
  //   } catch (error) {
  //     console.error(`Error fetching ${period} message count:`, error);
  //     toast.error(`Error fetching ${period} message count: ${error.message}`);
  //   }
  // };

  // useEffect(() => {
  //   const fetchDataAndRenderChart = async () => {
  //     try {
  //       const response = await axiosInstance.get(`/dashboard/message-count/${timePeriod}`);
  //       setMessageCount(response.data.messageCount);
  //     } catch (error) {
  //       console.error(`Error fetching ${timePeriod} message count:`, error);
  //       toast.error(`Error fetching ${timePeriod} message count: ${error.message}`);
  //     }
  //   };

  //   fetchDataAndRenderChart();
  // }, [timePeriod, selectedYear]);

  // useEffect(() => {
  //   if (chart !== null) {
  //     chart.destroy();
  //   }

  //   const ctx = document.getElementById('line-chart')?.getContext('2d');
  //   if (ctx && messageCount.length > 0) {
  //     const newChart = new Chart(ctx, {
  //       type: 'line',
  //       data: {
  //         labels: fetchLabels(timePeriod),
  //         datasets: [
  //           {
  //             label: 'Messages Sent',
  //             data: messageCount,
  //             fill: false,
  //             borderColor: 'rgba(0, 0, 0, 1)',
  //             tension: 0.01,
  //             pointStyle: 'circle',
  //             pointBackgroundColor: 'rgba(108, 99, 255, 1)',
  //             pointBorderColor: 'rgba(108, 99, 255, 1)',
  //             pointRadius: 4,
  //           },
  //         ],
  //       },
  //       options: {
  //         scales: {
  //           x: {
  //             grid: {
  //               color: "rgba(0, 0, 0, 0)",
  //             },
  //             title: {
  //               display: true,
  //               text: 'Period',
  //               color: 'rgba(108, 99, 255, 1)'
  //             },
  //             ticks: {
  //               color: 'rgba(0, 0, 0, 1)'
  //             },
  //           },
  //           y: {
  //             grid: {
  //               color: "rgba(78, 78, 78, 0.2)",
  //             },
  //             title: {
  //               display: true,
  //               text: 'Number of Messages',
  //               color: 'rgba(108, 99, 255, 1)'
  //             },
  //             ticks: {
  //               color: 'rgba(0, 0, 0, 1)'
  //             },
  //           },
  //         },
  //       },
  //     });
  //     setChart(newChart);
  //   }

  //   return () => {
  //     if (chart !== null) {
  //       chart.destroy();
  //     }
  //   };
  // }, [messageCount, timePeriod]);

  const changeTimePeriod = (period) => {
    if (period === 'year') {
      setTimePeriod('year');
    } else {
      setTimePeriod(period);
      setSelectedYear(2024); // Reset selected year when selecting 'Week' or 'Month'
    }
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <div className="graph-container">
      <div className="btndashcon">
        <div className="last-data">
          <div className={`last-week ${timePeriod === 'week' ? 'active' : ''}`} onClick={() => changeTimePeriod('week')}>Last Week</div>
          <div className={`last-month ${timePeriod === 'month' ? 'active' : ''}`} onClick={() => changeTimePeriod('month')}>Last Month</div>
          <div className={`last-year ${timePeriod === 'year' ? 'active' : ''}`} onClick={() => changeTimePeriod('year')}>Last Year</div>
        </div>
        {timePeriod === 'year' && (
          <div className="btn-group">
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="select-year"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        )}
      </div>
      <canvas id="line-chart" className="canvas"></canvas>
    </div>
  );
};

export default RightgraphSec;
