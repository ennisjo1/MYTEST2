import { useState } from 'react';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://ssrooxlflakfldbsgjcn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcm9veGxmbGFrZmxkYnNnamNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDg3MzUsImV4cCI6MjA2MDIyNDczNX0.53bFYWiNJvoCreZ5JOr34ZKBRLjFWA5FSfD3xIJqzhI'
const supabase = createClient(supabaseUrl, supabaseKey)


let { data: happy_table, happy_error } = await supabase
  .from('happy_table')
  .select('*')

let { data: angry_table, angry_error } = await supabase
  .from('angry_table')
  .select('*')

let { data: sad_table, sad_error } = await supabase
  .from('sad_table')
  .select('*')

let { data: cool_table, cool_error } = await supabase
  .from('cool_table')
  .select('*')

let { data: mind_blown_table, mb_error } = await supabase
  .from('mind_blown_table')
  .select('*')

let { data: sleepy_table, sleepy_error } = await supabase
  .from('sleepy_table')
  .select('*')
          

let happy_rand = Math.floor(Math.random() * happy_table.length);
let angry_rand = Math.floor(Math.random() * angry_table.length);
let sad_rand = Math.floor(Math.random() * sad_table.length);
let cool_rand = Math.floor(Math.random() * cool_table.length);
let mind_blown_rand = Math.floor(Math.random() * mind_blown_table.length);
let sleepy_rand = Math.floor(Math.random() * sleepy_table.length);

let feelingsMap = {
  '😄': [happy_table[happy_rand].top_text, happy_table[happy_rand].bottom_text],
  '😡': [angry_table[angry_rand].top_text, angry_table[angry_rand].bottom_text],
  '😢': [sad_table[sad_rand].top_text, sad_table[sad_rand].bottom_text],
  '😎': [cool_table[cool_rand].top_text, cool_table[cool_rand].bottom_text],
  '🤯': [mind_blown_table[mind_blown_rand].top_text, mind_blown_table[mind_blown_rand].bottom_text],
  '😴': [sleepy_table[sleepy_rand].top_text, sleepy_table[sleepy_rand].bottom_text],
};

function RandomizeText() {
  happy_rand = Math.floor(Math.random() * happy_table.length);
  angry_rand = Math.floor(Math.random() * angry_table.length);
  sad_rand = Math.floor(Math.random() * sad_table.length);
  cool_rand = Math.floor(Math.random() * cool_table.length);
  mind_blown_rand = Math.floor(Math.random() * mind_blown_table.length);
  sleepy_rand = Math.floor(Math.random() * sleepy_table.length);

  feelingsMap = {
    '😄': [happy_table[happy_rand].top_text, happy_table[happy_rand].bottom_text],
    '😡': [angry_table[angry_rand].top_text, angry_table[angry_rand].bottom_text],
    '😢': [sad_table[sad_rand].top_text, sad_table[sad_rand].bottom_text],
    '😎': [cool_table[cool_rand].top_text, cool_table[cool_rand].bottom_text],
    '🤯': [mind_blown_table[mind_blown_rand].top_text, mind_blown_table[mind_blown_rand].bottom_text],
    '😴': [sleepy_table[sleepy_rand].top_text, sleepy_table[sleepy_rand].bottom_text],
  }
}

function MemeGenerator() {
  const [memeUrl, setMemeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmojiClick = async (emoji) => {
    const [topText, bottomText] = feelingsMap[emoji];
    RandomizeText();
    setLoading(true);

    try {
      const res = await fetch('https://api.memegen.link/templates');
      const templates = await res.json();

      const random = templates[Math.floor(Math.random() * templates.length)];
      const id = random.id;

      const top = encodeURIComponent(topText);
      const bottom = encodeURIComponent(bottomText);

      const meme = `https://api.memegen.link/images/${id}/${top}/${bottom}.png`;

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
            style={{
              fontSize: '80px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
          >
            {emoji}
          </span>
        ))}
      </div>

      {loading && <p>Generating meme...</p>}

      {memeUrl && (
        <div>
          <img
            src={memeUrl}
            alt="Generated Meme"
            style={{ marginTop: '20px', maxWidth: '90%', height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
}

export default MemeGenerator;