import React from "react";
import { Radar } from 'react-chartjs-2';
import EmotionData from "../emotionData";


function PieChart({chartData}) {
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
                max: EmotionData.maximum,
            },

          }
        }}
      />
    </div>
  );
}
export default PieChart;