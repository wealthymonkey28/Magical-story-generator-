import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import './WizardQuill.css';

const storyTemplates = [
  {
    pattern: /[a-z]{4,}/i,
    generator: (input) => ({
      id: Date.now(),
      title: `The Enchanted Tale of ${input.charAt(0).toUpperCase() + input.slice(1)}`,
      icon: '🪶',
      difficulty: 'Medium',
      content: `In the mystical land of ${input.charAt(0).toUpperCase() + input.slice(1)}, there lived a curious creature named Whiskers. Every morning, Whiskers ventured into the enchanted forest, searching for the legendary Crystal of Understanding.\n\nOne day, while following a trail of shimmering letters that spelled "${input}", Whiskers discovered a hidden grove where words grew on trees like fruit. The ancient Tree of Stories whispered, "Those who find meaning in chaos possess the greatest magic of all."\n\nWhiskers learned that even random combinations of letters held secret messages, waiting to be discovered by the brave.`,
      targetWords: ['mystical', 'creature', 'enchanted', 'forest', 'legendary', 'crystal', 'understanding', 'hidden', 'grove', 'words', 'trees', 'magic', 'secret', 'messages', 'brave'],
      color: 'from-indigo-400 to-purple-500'
    })
  },
  {
    pattern: /\d/,
    generator: (input) => ({
      id: Date.now(),
      title: `Captain Nova's Cosmic Code: ${input}`,
      icon: '🚀',
      difficulty: 'Hard',
      content: `Captain Nova's spaceship received a mysterious transmission: "${input}". The ship's AI couldn't decode it, but Nova knew better—sometimes the most important messages come disguised as random noise.\n\nAs Nova input the sequence into the Galactic Archive, the letters and numbers revealed coordinates to a lost planet where creativity was born.\n\nThe journey would be perilous, but Nova understood that within every string of characters lay infinite possibilities.`,
      targetWords: ['spaceship', 'mysterious', 'transmission', 'decode', 'messages', 'galactic', 'archive', 'coordinates', 'planet', 'creativity', 'journey', 'perilous', 'infinite', 'possibilities'],
      color: 'from-blue-400 to-cyan-500'
    })
  },
  {
    pattern: /.*/,
    generator: (input) => ({
      id: Date.now(),
      title: `Luna's Laboratory of ${input}`,
      icon: '🔬',
      difficulty: 'Easy',
      content: `In Professor Luna's Laboratory of Lost Languages, the string "${input}" appeared on her quantum typewriter.\n\nAs Luna studied the mysterious characters, she realized they were a greeting from a civilization that spoke through creative chaos. Each letter was a window into a world of pure imagination.\n\nLuna typed back her own string, beginning the first conversation between worlds that spoke the language of wonder.`,
      targetWords: ['laboratory', 'mysterious', 'characters', 'greeting', 'civilization', 'creative', 'chaos', 'imagination', 'conversation', 'worlds', 'wonder', 'language'],
      color: 'from-pink-400 to-red-500'
    })
  }
];

const WizardQuill = ({ onStoryGenerated }) => {
  const [input, setInput] = useState('');
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    if (!input.trim()) {
      alert('Please enter some text first! 🤔');
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    const template = storyTemplates.find(t => t.pattern.test(input)) || storyTemplates[storyTemplates.length - 1];
    const newStory = template.generator(input);
    setStory(newStory);
    onStoryGenerated(newStory); // Pass to parent for InteractiveStoryApp
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">🪶 The Little Wizard's Quill ✨</h1>
        <p className="subtitle">
          Transform random keystrokes into magical stories! Type anything—gibberish or random characters—and watch AI create enchanting tales.
        </p>
      </div>
      <div className="input-section">
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generateStory()}
            placeholder="Type random characters... e.g., kjhgfd, asdfgh"
            maxLength="200"
            className="input-field"
          />
        </div>
        <button
          onClick={generateStory}
          disabled={loading || !input.trim()}
          className="generate-btn"
        >
          {loading ? 'Consulting the Quill...' : '✨ Reveal the Hidden Story ✨'}
        </button>
      </div>
      <div className="examples">
        <h3>Try these examples:</h3>
        <div className="example-buttons">
          {['kjhgfdsa', 'Hdfclife', 'qqwweerr', 'zxcvbnm', '123abc', 'mmmkkk'].map((example) => (
            <button
              key={example}
              onClick={() => setInput(example)}
              className="example-btn"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
      {loading && (
        <div className="loading active">
          <div className="spinner"></div>
          Consulting the quill... ✨
        </div>
      )}
      {story && (
        <div className="story-output active">
          <h2 className="story-title">
            <span>🪶</span>
            <span>{story.title}</span>
          </h2>
          <div className="story-content">{story.content}</div>
        </div>
      )}
    </div>
  );
};

export default WizardQuill;
