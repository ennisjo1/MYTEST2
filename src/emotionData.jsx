import { useEffect, useState } from 'react';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "./components/PieChart";

const supabaseUrl = 'https://ssrooxlflakfldbsgjcn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcm9veGxmbGFrZmxkYnNnamNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDg3MzUsImV4cCI6MjA2MDIyNDczNX0.53bFYWiNJvoCreZ5JOr34ZKBRLjFWA5FSfD3xIJqzhI';
const supabase = createClient(supabaseUrl, supabaseKey);

Chart.register(CategoryScale);

let tableData = null

function EmotionData(){
    const [emotion_data, SetEmotionData] = useState({})
    const [chart_data, SetChartData] = useState([{}])

      useEffect(() => {
        const fetchData = async () => {
          try {
            tableData = await Promise.all([
              supabase.from('emotion_data').select('*'),
            ]);
      
            const [emoteData] = tableData.map(t => t.data || []);

            SetEmotionData({
                'happyClicks': emoteData[0].happy_clicks,
                'angryClicks': emoteData[0].angry_clicks,
                'sadClicks': emoteData[0].sad_clicks,
                'coolClicks': emoteData[0].cool_clicks,
                'mind_blownClicks': emoteData[0].mind_blown_clicks,
                'sleepyClicks': emoteData[0].sleepy_clicks,
            });

            SetChartData([
              {
                id: 1,
                emotion: 'Happy',
                clicks: emoteData[0].happy_clicks
              },
              {
                id: 2,
                emotion: 'Angry',
                clicks: emoteData[0].angry_clicks
              },
              {
                id: 3,
                emotion: 'Sad',
                clicks: emoteData[0].sad_clicks
              },
              {
                id: 4,
                emotion: 'Cool',
                clicks: emoteData[0].cool_clicks
              },
              {
                id: 5,
                emotion: 'Mind Blown',
                clicks: emoteData[0].mind_blown_clicks
              },
              {
                id: 6,
                emotion: 'Sleepy',
                clicks: emoteData[0].sleepy_clicks
              },
            ])

          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);

      const [chartData] = useState({
        labels: chart_data.map((data) => data.emotion), 
        datasets: [
          {
            label: "Emotion Clicks",
            data: chart_data.map((data) => parseInt(data.clicks)),
            backgroundColor: [
              "rgba(75,192,192,1)"
            ],
          }
        ]
      });

      return (
        <div>
          <PieChart chartData={chartData} />
        </div>
      );
}

export default EmotionData;