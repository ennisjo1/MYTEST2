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
    const [chartData, setRealChartData] = useState({

    });
    const [load, setLoad] = useState(false);

      useEffect(() => {
        const fetchData = async () => {
          try {
            tableData = await Promise.all([
              supabase.from('emotion_data').select('*'),
            ]);
      
            const [emoteData] = tableData.map(t => t.data || []);

            setRealChartData({
              labels: [
                'Happy',
                'Angry',
                'Sad',
                'Cool',
                'Mind Blown',
                'Sleepy',
              ], 
              datasets: [
                {
                  label: "Emotion Clicks",
                  data: [
                    emoteData[0].happy_clicks, 
                    emoteData[0].angry_clicks, 
                    emoteData[0].sad_clicks, 
                    emoteData[0].cool_clicks,
                    emoteData[0].mind_blown_clicks,
                    emoteData[0].sleepy_clicks,
                  ],
                  backgroundColor: [
                    "#8A9CEA",
                  ],
                  borderColor: "black",
                  borderWidth: 2
                }
              ]
            })

            setLoad(true)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);

      return (
        <div>

          {load &&
          <PieChart chartData={chartData} />}
        </div>
      );
}

export default EmotionData;