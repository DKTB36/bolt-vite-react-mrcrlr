import React, { useState } from 'react';
import { Calendar, Users, Utensils, DollarSign, Clock, Heart } from 'lucide-react';

const cuisineTypes = [
  'Italian', 'Mexican', 'Asian', 'Mediterranean', 'American', 'Indian',
  'Middle Eastern', 'French', 'Spanish', 'Greek'
];

const dietaryOptions = [
  'Standard', 'Vegetarian', 'Vegan', 'Keto', 'Gluten-Free', 'Custom'
];

const intentions = [
  { value: 'healthy', label: 'Healthy Eating' },
  { value: 'time-saving', label: 'Time-Saving' },
  { value: 'budget', label: 'Budget-Friendly' },
  { value: 'family', label: 'Family-Friendly' },
  { value: 'gourmet', label: 'Gourmet' },
  { value: 'quick', label: 'Quick Prep' }
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const PreferencesForm = () => {
  const [formData, setFormData] = useState({
    cuisines: [],
    diet: 'Standard',
    customDiet: '',
    householdSize: 2,
    mealSchedule: {},
    deliveryDay: '',
    intention: '',
    budget: 150,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleCuisineChange = (cuisine: string) => {
    setFormData(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter(c => c !== cuisine)
        : [...prev.cuisines, cuisine]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
      {/* Cuisine Preferences */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Utensils className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Cuisine Preferences</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {cuisineTypes.map(cuisine => (
            <label
              key={cuisine}
              className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all
                ${formData.cuisines.includes(cuisine)
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-gray-200 hover:border-indigo-200'}`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={formData.cuisines.includes(cuisine)}
                onChange={() => handleCuisineChange(cuisine)}
              />
              <span>{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dietary Preferences */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Heart className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Dietary Preferences</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {dietaryOptions.map(diet => (
            <label
              key={diet}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all
                ${formData.diet === diet
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-gray-200 hover:border-indigo-200'}`}
            >
              <input
                type="radio"
                name="diet"
                value={diet}
                checked={formData.diet === diet}
                onChange={e => setFormData(prev => ({ ...prev, diet: e.target.value }))}
                className="hidden"
              />
              <span>{diet}</span>
            </label>
          ))}
        </div>
        {formData.diet === 'Custom' && (
          <input
            type="text"
            placeholder="Describe your dietary preferences..."
            className="mt-3 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.customDiet}
            onChange={e => setFormData(prev => ({ ...prev, customDiet: e.target.value }))}
          />
        )}
      </div>

      {/* Household Size */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Users className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Household Size</h2>
        </div>
        <input
          type="number"
          min="1"
          max="10"
          value={formData.householdSize}
          onChange={e => setFormData(prev => ({ ...prev, householdSize: parseInt(e.target.value) }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Meal Schedule */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Clock className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Meal Schedule</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2"></th>
                {daysOfWeek.map(day => (
                  <th key={day} className="p-2 text-sm font-medium text-gray-600">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mealTypes.map(meal => (
                <tr key={meal}>
                  <td className="p-2 font-medium text-gray-700">{meal}</td>
                  {daysOfWeek.map(day => (
                    <td key={`${meal}-${day}`} className="p-2">
                      <label className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          onChange={e => {
                            const checked = e.target.checked;
                            setFormData(prev => ({
                              ...prev,
                              mealSchedule: {
                                ...prev.mealSchedule,
                                [`${meal}-${day}`]: checked
                              }
                            }));
                          }}
                        />
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delivery Day */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Calendar className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Preferred Delivery Day</h2>
        </div>
        <input
          type="date"
          value={formData.deliveryDay}
          onChange={e => setFormData(prev => ({ ...prev, deliveryDay: e.target.value }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Budget */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <DollarSign className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Weekly Budget</h2>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={formData.budget}
            onChange={e => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-lg font-semibold text-gray-700">${formData.budget}</span>
        </div>
      </div>

      {/* Intention */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Heart className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Your Goal</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {intentions.map(({ value, label }) => (
            <label
              key={value}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all
                ${formData.intention === value
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-gray-200 hover:border-indigo-200'}`}
            >
              <input
                type="radio"
                name="intention"
                value={value}
                checked={formData.intention === value}
                onChange={e => setFormData(prev => ({ ...prev, intention: e.target.value }))}
                className="hidden"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setFormData({
            cuisines: [],
            diet: 'Standard',
            customDiet: '',
            householdSize: 2,
            mealSchedule: {},
            deliveryDay: '',
            intention: '',
            budget: 150,
          })}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Reset Form
        </button>
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Submit Preferences
        </button>
      </div>
    </form>
  );
};

export default PreferencesForm;