import { useState } from 'react';
import { Shield, Clock, Heart, Accessibility, Bell, Moon, Sun, Volume2 } from 'lucide-react';

export function SafetySettings() {
  const [maxTravelHours, setMaxTravelHours] = useState(4);
  const [restInterval, setRestInterval] = useState(2);
  const [notifications, setNotifications] = useState(true);
  const [largeText, setLargeText] = useState(false);
  const [voiceAlerts, setVoiceAlerts] = useState(true);

  const medicalConditions = [
    { id: 'diabetes', label: 'Diabetes', checked: false },
    { id: 'hypertension', label: 'Hypertension', checked: true },
    { id: 'heart', label: 'Heart Condition', checked: false },
    { id: 'mobility', label: 'Mobility Issues', checked: true },
    { id: 'vision', label: 'Vision Impairment', checked: false },
    { id: 'hearing', label: 'Hearing Impairment', checked: false },
  ];

  const accessibilityNeeds = [
    { id: 'wheelchair', label: 'Wheelchair Accessible', icon: Accessibility },
    { id: 'elevator', label: 'Elevator Access Required', icon: Accessibility },
    { id: 'groundfloor', label: 'Ground Floor Preference', icon: Accessibility },
    { id: 'handrails', label: 'Handrails Required', icon: Accessibility },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8" />
          <h2 className="text-white">Safety Settings</h2>
        </div>
        <p className="text-indigo-100">Customize your travel safety preferences and requirements</p>
      </div>

      {/* Travel Safety Rules */}
      <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
        <h3 className="text-gray-900 mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-indigo-600" />
          Geriatric Travel Rules
        </h3>

        <div className="space-y-6">
          {/* Max Travel Hours */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-700">Maximum Daily Travel Hours</label>
              <span className="text-indigo-600">{maxTravelHours} hours</span>
            </div>
            <input
              type="range"
              min="2"
              max="8"
              value={maxTravelHours}
              onChange={(e) => setMaxTravelHours(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-gray-600 text-sm mt-2">
              Recommended: 4-6 hours for senior travelers
            </p>
          </div>

          {/* Rest Intervals */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-700">Mandatory Rest Break Interval</label>
              <span className="text-indigo-600">Every {restInterval} hours</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              value={restInterval}
              onChange={(e) => setRestInterval(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-gray-600 text-sm mt-2">
              Recommended: Every 2 hours with 15-30 minute breaks
            </p>
          </div>

          {/* Time Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <Sun className="w-5 h-5 text-amber-600" />
                <span className="text-gray-900">Preferred Travel Time</span>
              </div>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-200 text-gray-900">
                <option>Early Morning (6 AM - 10 AM)</option>
                <option>Late Morning (10 AM - 12 PM)</option>
                <option>Early Afternoon (12 PM - 4 PM)</option>
              </select>
            </div>

            <div className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
              <div className="flex items-center gap-3 mb-2">
                <Moon className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-900">Avoid Night Travel</span>
              </div>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-200 text-gray-900">
                <option>Always (Recommended)</option>
                <option>After 8 PM</option>
                <option>After 10 PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
        <h3 className="text-gray-900 mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-600" />
          Medical Information
        </h3>

        <div className="space-y-4 mb-6">
          <p className="text-gray-600">Select any conditions that may require special considerations during travel:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {medicalConditions.map((condition) => (
              <label key={condition.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  defaultChecked={condition.checked}
                  className="w-5 h-5 accent-red-600"
                />
                <span className="text-gray-700">{condition.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-gray-700">Emergency Medication</label>
          <input
            type="text"
            placeholder="e.g., Insulin, Blood Pressure Medication"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900"
          />
        </div>
      </div>

      {/* Accessibility Requirements */}
      <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
        <h3 className="text-gray-900 mb-6 flex items-center gap-2">
          <Accessibility className="w-6 h-6 text-purple-600" />
          Accessibility Requirements
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {accessibilityNeeds.map((need) => {
            const Icon = need.icon;
            return (
              <label key={need.id} className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100">
                <input type="checkbox" className="w-5 h-5 accent-purple-600" />
                <Icon className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">{need.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
        <h3 className="text-gray-900 mb-6 flex items-center gap-2">
          <Bell className="w-6 h-6 text-green-600" />
          Notification & Alert Preferences
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-gray-900">Push Notifications</p>
                <p className="text-gray-600 text-sm">Get alerts for rest stops and safety updates</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-gray-900">Voice Alerts</p>
                <p className="text-gray-600 text-sm">Spoken alerts for important updates</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={voiceAlerts}
                onChange={(e) => setVoiceAlerts(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Accessibility className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-gray-900">Large Text Mode</p>
                <p className="text-gray-600 text-sm">Increase text size for better readability</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={largeText}
                onChange={(e) => setLargeText(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl hover:shadow-lg transition-all">
          Save Settings
        </button>
        <button className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all">
          Reset to Default
        </button>
      </div>
    </div>
  );
}
