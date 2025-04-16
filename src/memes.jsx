import { useEffect, useState } from 'react';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://ssrooxlflakfldbsgjcn.supabase.co';
const supabaseKey = 'YeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcm9veGxmbGFrZmxkYnNnamNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDg3MzUsImV4cCI6MjA2MDIyNDczNX0.53bFYWiNJvoCreZ5JOr34ZKBRLjFWA5FSfD3xIJqzhI';
const supabase = createClient(supabaseUrl, supabaseKey);

function MemeGenerator() {
  const [feelingsMap, setFeelingsMap] = useState({});
  const [memeUrl, setMemeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tables = await Promise.all([
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleEmojiClick = async (emoji) => {
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
      {memeUrl && <img src={memeUrl} alt="Generated Meme" style={{ marginTop: '20px', maxWidth: '90%' }} />}
    </div>
  );
}

export default MemeGenerator;