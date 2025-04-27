import { useEffect, useState } from 'react';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

const supabaseUrl = 'https://ssrooxlflakfldbsgjcn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcm9veGxmbGFrZmxkYnNnamNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDg3MzUsImV4cCI6MjA2MDIyNDczNX0.53bFYWiNJvoCreZ5JOr34ZKBRLjFWA5FSfD3xIJqzhI';
const supabase = createClient(supabaseUrl, supabaseKey);

let tables = null;
let clickTable = null;
let eClickData = [0,0,0,0,0,0];

function MemeGenerator() {
  const [feelingsMap, setFeelingsMap] = useState({});
  const [memeUrl, setMemeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [feelingsClickData, setClickData] = useState({})
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        tables = await Promise.all([
          supabase.from('happy_table').select('*'),
          supabase.from('angry_table').select('*'),
          supabase.from('sad_table').select('*'),
          supabase.from('cool_table').select('*'),
          supabase.from('mind_blown_table').select('*'),
          supabase.from('sleepy_table').select('*'),
        ]);
  
        const [happy, angry, sad, cool, mindBlown, sleepy] = tables.map(t => t.data || []);

        const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)] || { top_text: "load", bottom_text: "error" };
  
        setFeelingsMap({
          '😄': getRand(happy),
          '😡': getRand(angry),
          '😢': getRand(sad),
          '😎': getRand(cool),
          '🤯': getRand(mindBlown),
          '😴': getRand(sleepy),
        });

        clickTable = await Promise.all([
          supabase.from('emotion_data').select('*')
        ]);

        const [eData] = clickTable.map(c => c.data || []);

        setClickData({
          '😄': 0,
          '😡': 1,
          '😢': 2,
          '😎': 3,
          '🤯': 4,
          '😴': 5,
        })

        eClickData[0] = eData[0].happy_clicks;
        eClickData[1] = eData[0].angry_clicks;
        eClickData[2] = eData[0].sad_clicks;
        eClickData[3] = eData[0].cool_clicks;
        eClickData[4] = eData[0].mind_blown_clicks;
        eClickData[5] = eData[0].sleepy_clicks;

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleEmojiClick = async (emoji) => {
    const [happy, angry, sad, cool, mindBlown, sleepy] = tables.map(t => t.data || []);

    const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)] || { top_text: "load", bottom_text: "error" };

    setFeelingsMap({
      '😄': getRand(happy),
      '😡': getRand(angry),
      '😢': getRand(sad),
      '😎': getRand(cool),
      '🤯': getRand(mindBlown),
      '😴': getRand(sleepy),
    });

    try{
      if (feelingsClickData[emoji] == 0){
        eClickData[0] = eClickData[0] + 1;
        const { error } = await supabase.from('emotion_data').update({ happy_clicks: eClickData[0] }).eq('id', 1);
      }
      else if (feelingsClickData[emoji] == 1){
        eClickData[1] = eClickData[1] + 1;
        const { error } = await supabase.from('emotion_data').update({ angry_clicks: eClickData[1] }).eq('id', 1); 
      }
      else if (feelingsClickData[emoji] == 2){
        eClickData[2] = eClickData[2] + 1;
        const { error } = await supabase.from('emotion_data').update({ sad_clicks: eClickData[2] }).eq('id', 1); 
      }
      else if (feelingsClickData[emoji] == 3){
        eClickData[3] = eClickData[3] + 1;
        const { error } = await supabase.from('emotion_data').update({ cool_clicks: eClickData[3] }).eq('id', 1); 
      }
      else if (feelingsClickData[emoji] == 4){
        eClickData[4] = eClickData[4] + 1;
        const { error } = await supabase.from('emotion_data').update({ mind_blown_clicks: eClickData[4] }).eq('id', 1); 
      }
      else if (feelingsClickData[emoji] == 5){
        eClickData[5] = eClickData[5] + 1;
        const { error } = await supabase.from('emotion_data').update({ sleepy_clicks: eClickData[5] }).eq('id', 1); 
      }
    }
    catch (err) {
      console.error("Value Update Error:", err);
    }

    const quote = feelingsMap[emoji];
    if (!quote) return;
  
    setLoading(true);
  
    try {
      const res = await fetch('https://api.memegen.link/templates');
      const templates = await res.json();
      const id = templates[Math.floor(Math.random() * templates.length)].id;
  
      const meme = `https://api.memegen.link/images/${id}/${encodeURIComponent(quote.top_text)}/${encodeURIComponent(quote.bottom_text)}.png`;
      setMemeUrl(meme);
    } catch (err) {
      console.error('Meme error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Pick Your Mood:</h3>
      <div style={{ fontSize: '80px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {Object.keys(feelingsMap).map((emoji) => (
          <span
            key={emoji}
            onClick={() => handleEmojiClick(emoji)}
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
          >
            {emoji}
          </span>
        ))}
      </div>

      {loading && <p>Generating meme...</p>}
      {memeUrl &&     <Container>
      <Row>
        <Col xl={100} lg={100}>
          <Image src={memeUrl} thumbnail />
        </Col>
      </Row>
    </Container>}
    </div>
  );
}

export default MemeGenerator;