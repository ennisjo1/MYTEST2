import { useState } from 'react';

const feelingsMap = {
  '😄': ["Feeling great", "Life's good!"],
  '😡': ["I'm mad", "Don't talk to me"],
  '😢': ["So sad", "Need a hug"],
  '😎': ["Too cool", "For this code"],
  '🤯': ["Mind blown", "Can't believe it"],
  '😴': ["So sleepy", "Need coffee"],
};

function MemeGenerator() {
  const [memeUrl, setMemeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmojiClick = async (emoji) => {
    const [topText, bottomText] = feelingsMap[emoji];
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
      <div style={{ fontSize: '2rem', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {Object.keys(feelingsMap).map((emoji) => (
          <span
            key={emoji}
            onClick={() => handleEmojiClick(emoji)}
            style={{
              fontSize: '2.5rem',
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