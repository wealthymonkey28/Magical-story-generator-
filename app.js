// App.js
import React from 'react';
import InteractiveStoryApp from './InteractiveStoryApp';

function App() {
  return (
    <div className="App">
      <header className="bg-purple-100 p-4 text-center">
        <h1 className="text-3xl font-bold text-purple-800">The Little Wizard's Quill</h1>
        <p className="text-gray-600">Turn keystrokes into magical stories! 🪶✨</p>
      </header>
      <InteractiveStoryApp />
    </div>
  );
}

export default App;