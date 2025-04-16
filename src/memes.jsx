import { useEffect, useState } from 'react';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://ssrooxlflakfldbsgjcn.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

function MemeGenerator() {
  const [feelingsMap, setFeelingsMap] = useState({});
  const [memeUrl, setMemeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [happy, angry, sad, cool, mindBlown, sleepy] = await Promise.all([
          supabase.from('happy_table').select('*'),
          supabase.from('angry_table').select('*'),
          supabase.from('sad_table').select('*'),
          supabase.from('cool_table').select('*'),
          supabase.from('mind_blown_table').select('*'),
          supabase.from('sleepy_table').select('*'),
        ]);

        const getRand = (table) => table.data[Math.floor(Math.random() * table.data.length)];

        setFeelingsMap({
          '😄': [getRand(happy).top_text, getRand(happy).bottom_text],
          '😡': [getRand(angry).top_text, getRand(angry).bottom_text],
          '😢': [getRand(sad).top_text, getRand(sad).bottom_text],
          '😎': [getRand(cool).top_text, getRand(cool).bottom_text],
          '🤯': [getRand(mindBlown).top_text, getRand(mindBlown).bottom_text],
          '😴': [getRand(sleepy).top_text, getRand(sleepy).bottom_text],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEmojiClick = async (emoji) => {
    const [topText, bottomText] = feelingsMap[emoji] || ['Top', 'Bottom'];
    setLoading(true);

    try {
      const res = await fetch('https://api.memegen.link/templates');
      const templates = await res.json();
      const id = templates[Math.floor(Math.random() * templates.length)].id;
      const meme = `https://api.memegen.link/images/${id}/${encodeURIComponent(topText)}/${encodeURIComponent(bottomText)}.png`;
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