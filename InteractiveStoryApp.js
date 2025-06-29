import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';
import {
  Book,
  Search,
  RotateCcw,
  Lightbulb,
  Star,
  Heart,
} from 'lucide-react';

const InteractiveStoryApp = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameMode, setGameMode] = useState('search'); // 'search' or 'quiz'

  const spellingCorrections = {
    'bewtiful': 'beautiful',
    'beutiful': 'beautiful',
    'beautifull': 'beautiful',
    'frend': 'friend',
    'freind': 'friend',
    'friedn': 'friend',
    'happi': 'happy',
    'hapy': 'happy',
    'happpy': 'happy',
    'litle': 'little',
    'littel': 'little',
    'litttle': 'little',
    'magik': 'magic',
    'majic': 'magic',
    'magick': 'magic',
    'castl': 'castle',
    'castel': 'castle',
    'castell': 'castle',
    'prinses': 'princess',
    'princes': 'princess',
    'princcess': 'princess',
    'adventur': 'adventure',
    'adventrue': 'adventure',
    'advnture': 'adventure',
    'forrest': 'forest',
    'froest': 'forest',
    'forets': 'forest',
    'animel': 'animal',
    'anamal': 'animal',
    'animall': 'animal',
    'vilage': 'village',
    'village': 'village',
    'villege': 'village',
    'mountin': 'mountain',
    'montain': 'mountain',
    'moutain': 'mountain',
    'treasur': 'treasure',
    'tresure': 'treasure',
    'treasre': 'treasure',
    'dragn': 'dragon',
    'drago': 'dragon',
    'draggon': 'dragon',
    'wizar': 'wizard',
    'wizerd': 'wizard',
    'wisard': 'wizard',
    'kindom': 'kingdom',
    'kingdm': 'kingdom',
    'kingdon': 'kingdom',
    'secrt': 'secret',
    'secert': 'secret',
    'secrect': 'secret',
    'journy': 'journey',
    'jurney': 'journey',
    'journi': 'journey',
    'mystri': 'mystery',
    'mistery': 'mystery',
    'mysterey': 'mystery',
    'rainbo': 'rainbow',
    'ranbow': 'rainbow',
    'rainboe': 'rainbow',
    'gardn': 'garden',
    'garde': 'garden',
    'gardne': 'garden',
  };

  const stories = [
    {
      id: 1,
      title: 'The Magic Forest Adventure',
      icon: '🌲',
      difficulty: 'Easy',
      content: `Once upon a time, in a beautiful magic forest, there lived a little rabbit named Luna. The forest was full of wonderful animals and colorful flowers. One sunny morning, Luna decided to go on an adventure to find the secret rainbow treasure hidden deep in the forest.

      She met a wise old owl who told her, “Follow the path of golden leaves, and you will find what you seek.” Luna hopped along the path, making friends with a friendly squirrel and a singing bird. Together, they discovered a magical clearing where the rainbow treasure sparkled in the sunlight.

      The treasure was not gold or jewels, but a beautiful garden where all the forest animals could play together happily forever.`,
      targetWords: [
        'beautiful',
        'magic',
        'forest',
        'little',
        'rabbit',
        'animals',
        'flowers',
        'adventure',
        'secret',
        'rainbow',
        'treasure',
        'golden',
        'friends',
        'magical',
        'garden',
        'happy',
      ],
      color: 'from-green-400 to-blue-500',
    },
    {
      id: 2,
      title: 'Princess and the Castle Mystery',
      icon: '👑',
      difficulty: 'Medium',
      content: `In a faraway kingdom, Princess Aria lived in a magnificent castle on top of a high mountain. The castle had many secret rooms and hidden passages. One day, the princess discovered that her favorite magical crown had disappeared from the royal treasure room.

      She decided to solve this mystery herself. With the help of her loyal friend, a clever wizard named Merlin, they searched every room in the castle. They found strange clues: golden footprints, mysterious notes, and magical sparkles in the air.

      After a long journey through the castle’s secret passages, they discovered that a playful dragon had borrowed the crown to decorate his cave for a surprise party. The dragon wanted to celebrate the princess’s birthday! Princess Aria was so happy that she invited the dragon to live in the castle and become the royal party planner.`,
      targetWords: [
        'kingdom',
        'princess',
        'castle',
        'mountain',
        'secret',
        'magical',
        'crown',
        'treasure',
        'mystery',
        'wizard',
        'clues',
        'golden',
        'journey',
        'dragon',
        'surprise',
        'birthday',
        'party',
      ],
      color: 'from-purple-400 to-pink-500',
    },
  ];

  const correctSpelling = useCallback((word) => {
    const lowerWord = word.toLowerCase();
    return spellingCorrections[lowerWord] || word;
  }, []);

  const findWordInStory = useCallback(
    (searchWord, story) => {
      if (!story) return false;
      const correctedWord = correctSpelling(searchWord);
      const storyText = story.content.toLowerCase();
      const targetWords = story.targetWords.map((w) => w.toLowerCase());
      return (
        storyText.includes(correctedWord.toLowerCase()) ||
        targetWords.includes(correctedWord.toLowerCase())
      );
    },
    [correctSpelling]
  );

  const handleSearch = useCallback(() => {
    if (!searchTerm.trim() || !selectedStory) return;

    const correctedWord = correctSpelling(searchTerm.trim());
    const wordExists = findWordInStory(correctedWord, selectedStory);

    setAttempts((prev) => prev + 1);

    if (wordExists && !foundWords.includes(correctedWord.toLowerCase())) {
      setFoundWords((prev) => [...prev, correctedWord.toLowerCase()]);
      setScore((prev) => prev + 10);
      if (correctedWord.toLowerCase() !== searchTerm.toLowerCase()) {
        alert(
          `Great! I found "${correctedWord}" in the story! (I corrected "${searchTerm}" to "${correctedWord}")`
        );
      }
    }
    setSearchTerm('');
  }, [searchTerm, selectedStory, correctSpelling, findWordInStory, foundWords]);

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), [
    handleSearch,
  ]);

  const resetGame = useCallback(() => {
    setFoundWords([]);
    setScore(0);
    setAttempts(0);
    setSearchTerm('');
  }, []);

  const toggleGameMode = useCallback(() => {
    setGameMode((prev) => (prev === 'search' ? 'quiz' : 'search'));
  }, []);

  const progressPercentage = useMemo(() => {
    if (!selectedStory) return 0;
    return Math.round((foundWords.length / selectedStory.targetWords.length) * 100);
  }, [foundWords.length, selectedStory]);

  const getHints = useCallback(() => {
    if (!selectedStory) return [];
    return selectedStory.targetWords
      .filter((word) => !foundWords.includes(word.toLowerCase()))
      .slice(0, 3);
  }, [selectedStory, foundWords]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Book className="text-purple-600" />
            Interactive Story Explorer
          </h1>
          <button
            onClick={toggleGameMode}
            className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          >
            Switch to {gameMode === 'search' ? 'Quiz' : 'Search'} Mode
          </button>
          <p className="text-gray-600 mt-2">Discover hidden words in magical stories!</p>
        </div>

        {!selectedStory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className={`cursor-pointer transform hover:scale-105 transition-all duration-300 rounded-xl p-6 bg-gradient-to-br ${story.color} text-white shadow-lg hover:shadow-xl`}
              >
                <div className="text-4xl mb-4 text-center">{story.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-center">{story.title}</h3>
                <div className="flex items-center justify-between text-sm opacity-90">
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded">
                    {story.difficulty}
                  </span>
                  <span>{story.targetWords.length} words to find</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className={`rounded-xl p-6 bg-gradient-to-br ${selectedStory.color} text-white shadow-lg mb-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-3xl">{selectedStory.icon}</span>
                    {selectedStory.title}
                  </h2>
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg transition-colors"
                  >
                    ← Back
                  </button>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <p className="text-lg leading-relaxed whitespace-pre-line">
                    {selectedStory.content}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && debouncedHandleSearch()}
                      placeholder="Type a word from the story... (spelling help included!)"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
                      aria-label="Search for a word in the story"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={!searchTerm.trim()}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Search size={20} />
                    Search
                  </button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800 flex items-center gap-2">
                    <Lightbulb size={16} />
                    <strong>Spelling Help:</strong> Don’t worry about perfect spelling! I can help correct common misspellings.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Star className="text-yellow-500" />
                  Game Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span className="font-bold text-purple-600">{score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Words Found:</span>
                    <span className="font-bold text-green-600">
                      {foundWords.length}/{selectedStory.targetWords.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attempts:</span>
                    <span className="font-bold text-blue-600">{attempts}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    {progressPercentage}% Complete
                  </p>
                </div>
                <button
                  onClick={resetGame}
                  className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw size={16} />
                  Reset Game
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart className="text-red-500" />
                  Found Words
                </h3>
                <div className="flex flex-wrap gap-2">
                  {foundWords.length > 0 ? (
                    foundWords.map((word, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {word}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No words found yet. Start searching!</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="text-yellow-500" />
                  Hints
                </h3>
                <div className="space-y-2">
                  {getHints().length > 0 ? (
                    getHints().map((hint, index) => (
                      <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                          Try looking for: <strong>{hint}</strong>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      {foundWords.length === selectedStory.targetWords.length
                        ? '🎉 Congratulations! You found all the words!'
                        : 'Keep searching for more words!'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveStoryApp;
