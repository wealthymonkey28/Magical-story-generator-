import React, { useState, useEffect } from 'react';
import WizardQuill from './components/WizardQuill';
import InteractiveStoryApp from './components/InteractiveStoryApp';
import SplashScreen from './components/SplashScreen';
import './App.css';

const App = () => {
  const [mode, setMode] = useState('splash'); // 'splash', 'quill', 'interactive'
  const [generatedStories, setGeneratedStories] = useState([]);

  useEffect(() => {
    // Auto-transition from splash screen after 3 seconds
    const timer = setTimeout(() => setMode('quill'), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleStoryGenerated = (newStory) => {
    setGeneratedStories((prev) => [...prev, newStory]);
    setMode('interactive'); // Switch to word-search mode after generating a story
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      {mode === 'splash' ? (
        <SplashScreen />
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
              🪶 The Little Wizard's Quill ✨
            </h1>
            <p className="text-gray-600">Create magical stories or explore them with word games!</p>
          </div>
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setMode('quill')}
              className={`px-4 py-2 rounded-lg ${mode === 'quill' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Generate Story
            </button>
            <button
              onClick={() => setMode('interactive')}
              className={`px-4 py-2 rounded-lg ${mode === 'interactive' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Play Word Search
            </button>
          </div>
          {mode === 'quill' ? (
            <WizardQuill onStoryGenerated={handleStoryGenerated} />
          ) : (
            <InteractiveStoryApp generatedStories={generatedStories} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;