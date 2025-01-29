import React, { useState, useEffect } from 'react';
import { Activity, Calendar, TrendingUp, Timer, Coffee, Sun, Sunset, Moon, Settings, User } from 'lucide-react';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
      <div className="text-3xl font-mono font-bold mb-4">{formatTime(time)}</div>
      <div className="space-x-4">
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={() => setTime(0)}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const MealPlan = () => {
  const meals = {
    breakfast: { calories: 400, protein: 25, carbs: 45, fats: 15 },
    lunch: { calories: 600, protein: 35, carbs: 65, fats: 20 },
    dinner: { calories: 500, protein: 30, carbs: 55, fats: 18 },
    snacks: { calories: 300, protein: 15, carbs: 35, fats: 12 }
  };

  return (
    <div className="space-y-4">
      {Object.entries(meals).map(([meal, macros]) => (
        <div key={meal} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold capitalize">{meal}</h3>
            <span className="text-gray-500">{macros.calories} kcal</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-blue-50 p-2 rounded">
              Protein: {macros.protein}g
            </div>
            <div className="bg-green-50 p-2 rounded">
              Carbs: {macros.carbs}g
            </div>
            <div className="bg-yellow-50 p-2 rounded">
              Fats: {macros.fats}g
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const WorkoutCustomization = () => {
  const [preferences, setPreferences] = useState({
    difficulty: 'intermediate',
    duration: 45,
    focus: 'strength',
    equipment: ['dumbbells', 'bodyweight']
  });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Difficulty Level</label>
        <select 
          value={preferences.difficulty}
          onChange={(e) => setPreferences({...preferences, difficulty: e.target.value})}
          className="w-full p-2 border rounded-lg"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Workout Duration (minutes)</label>
        <input 
          type="range" 
          min="15" 
          max="90" 
          step="15"
          value={preferences.duration}
          onChange={(e) => setPreferences({...preferences, duration: parseInt(e.target.value)})}
          className="w-full"
        />
        <div className="text-center">{preferences.duration} minutes</div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Workout Focus</label>
        <select 
          value={preferences.focus}
          onChange={(e) => setPreferences({...preferences, focus: e.target.value})}
          className="w-full p-2 border rounded-lg"
        >
          <option value="strength">Strength Training</option>
          <option value="cardio">Cardio</option>
          <option value="flexibility">Flexibility</option>
          <option value="hiit">HIIT</option>
        </select>
      </div>
    </div>
  );
};

const EnhancedAIFitnessCoach = () => {
  const [activeTab, setActiveTab] = useState('workout');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">AI Fitness Coach</span>
            </div>
            <div className="flex items-center space-x-6">
              <Timer className="h-6 w-6 text-gray-500" />
              <Settings className="h-6 w-6 text-gray-500" />
              <User className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex space-x-4 mb-6">
                <button 
                  onClick={() => setActiveTab('workout')}
                  className={`px-4 py-2 rounded-lg ${activeTab === 'workout' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                >
                  Workout
                </button>
                <button 
                  onClick={() => setActiveTab('customize')}
                  className={`px-4 py-2 rounded-lg ${activeTab === 'customize' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                >
                  Customize
                </button>
                <button 
                  onClick={() => setActiveTab('nutrition')}
                  className={`px-4 py-2 rounded-lg ${activeTab === 'nutrition' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                >
                  Nutrition
                </button>
              </div>

              {activeTab === 'workout' && (
                <div>
                  <Timer />
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-4">Current Workout</h3>
                    {/* Workout content here */}
                  </div>
                </div>
              )}

              {activeTab === 'customize' && (
                <WorkoutCustomization />
              )}

              {activeTab === 'nutrition' && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Daily Meal Plan</h3>
                  <MealPlan />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Daily Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Calories Burned</span>
                  <span className="font-semibold">450 kcal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Time</span>
                  <span className="font-semibold">45 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Water Intake</span>
                  <span className="font-semibold">1.5L / 2.5L</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Upcoming Workouts</h3>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">HIIT Cardio</div>
                  <div className="text-sm text-gray-500">Tomorrow - 08:00 AM</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Strength Training</div>
                  <div className="text-sm text-gray-500">Wed - 07:30 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAIFitnessCoach;
