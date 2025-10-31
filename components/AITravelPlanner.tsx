import React, { useState } from 'react';
import { getTravelPlan } from '../services/geminiService';
import { marked } from 'marked';

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 9a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM9 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6H6a1 1 0 010-2h1V3a1 1 0 011-1zm3 1a1 1 0 100-2 1 1 0 000 2zm-3 8a1 1 0 100-2 1 1 0 000 2zm6-4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
);


export const AITravelPlanner: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetPlan = async () => {
    if (!prompt.trim()) {
      setError('Please enter a query to get a travel plan.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResponse('');
    const plan = await getTravelPlan(prompt);
    const html = marked(plan);
    setResponse(html as string);
    setIsLoading(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <SparklesIcon />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">AI Travel Planner</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Need inspiration? Ask our AI assistant for travel ideas in Telangana.
      </p>

      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Suggest a 2-day spiritual trip from Hyderabad'"
          className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
          rows={3}
        />
        <div className="flex flex-wrap gap-2 text-sm">
            <button onClick={() => handleSuggestionClick('Weekend getaway from Hyderabad')} className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full transition-colors">Weekend from Hyderabad</button>
            <button onClick={() => handleSuggestionClick('Best temples to visit in Warangal')} className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full transition-colors">Temples in Warangal</button>
            <button onClick={() => handleSuggestionClick('Hidden waterfalls in Telangana')} className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full transition-colors">Hidden Waterfalls</button>
        </div>
        <button
          onClick={handleGetPlan}
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-colors"
        >
          {isLoading ? 'Thinking...' : 'Get Suggestion'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {isLoading && (
          <div className="mt-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Generating your personalized travel plan...</p>
          </div>
      )}
      
      {response && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-700/50 border dark:border-slate-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Your Travel Plan:</h3>
          <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert" dangerouslySetInnerHTML={{ __html: response }} />
        </div>
      )}
    </div>
  );
};