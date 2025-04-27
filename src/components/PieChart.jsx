import React from "react";
import { Radar } from 'react-chartjs-2';


function PieChart({ chartData, maximum }) {
  return (
    <div className="chart-container">
      <Radar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display:false,
            },
          },
          scales: {
            r: {
                min: 0,
                max: maximum,
            },
          }
        }}
      />
    </div>
  );
}
export default PieChart;