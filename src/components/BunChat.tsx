import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bun';
  timestamp: Date;
}

interface BunChatProps {
  onClose: () => void;
}

export function BunChat({ onClose }: BunChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Bun, your AI travel companion. I'm here to help you plan safe and comfortable journeys across India. How can I assist you today?",
      sender: 'bun',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    'Plan a trip to Jaipur',
    'Find nearby hospitals',
    'Suggest rest stops',
    'Check safety score',
    'Emergency contacts',
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate Bun's response
    setTimeout(() => {
      const bunResponse = generateBunResponse(inputText);
      const bunMessage: Message = {
        id: messages.length + 2,
        text: bunResponse,
        sender: 'bun',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, bunMessage]);
    }, 1000);
  };

  const generateBunResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('jaipur') || input.includes('trip')) {
      return "I'd be happy to help you plan a safe trip to Jaipur! Based on your safety settings, I recommend: \n\n🚗 Travel Time: 5-6 hours with 2 rest stops\n🏥 4 hospitals along the route\n💊 6 pharmacies nearby\n🏨 3 senior-friendly accommodations\n\nWould you like me to generate a detailed route with all safety POIs marked?";
    } else if (input.includes('hospital') || input.includes('medical')) {
      return "I've found 3 hospitals within 20km of your current route:\n\n1. Max Hospital - 12 km (15 mins)\n2. Fortis Healthcare - 18 km (22 mins)\n3. Apollo Hospital - 25 km (30 mins)\n\nAll are equipped with emergency services and geriatric care. Would you like me to add any of these to your route?";
    } else if (input.includes('rest') || input.includes('stop')) {
      return "Based on your current journey, here are recommended rest stops:\n\n☕ Next Stop: Highway Dhaba - 15 mins ahead\n   • Clean restrooms\n   • Accessible seating\n   • Medical aid available\n\n🏨 Upcoming: Comfort Inn - 1.5 hours ahead\n   • Senior-friendly facilities\n   • On-site pharmacy\n\nShall I update your route to include these stops?";
    } else if (input.includes('safety') || input.includes('score')) {
      return "Your current route has a Safety Score of 95%! Here's the breakdown:\n\n✅ Travel time: Within limits (4 hrs/day)\n✅ Rest stops: Every 2 hours\n✅ Medical facilities: 8 hospitals nearby\n✅ Accessibility: All stays are wheelchair accessible\n⚠️ Weather: Light rain expected tomorrow\n\nYour route is optimized for safe senior travel!";
    } else if (input.includes('emergency') || input.includes('contact')) {
      return "Here are your emergency contacts:\n\n🚨 Emergency Services: 108\n👨‍⚕️ Medical Helpline: 102\n📞 Family Contact: +91 98765 43210\n👥 Caregiver: +91 98765 43211\n\nI can also activate emergency alerts to notify your family and the nearest hospital. Would you like me to set that up?";
    } else if (input.includes('reroute') || input.includes('change')) {
      return "I understand you need to change your route. What's the reason?\n\n1. 😴 Feeling tired - I'll find the nearest rest stop\n2. 🏥 Need medical attention - I'll locate the closest hospital\n3. 🌙 Want to end early - I'll find senior-friendly accommodation\n\nJust let me know, and I'll instantly reroute you to the safest option!";
    } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! It's wonderful to hear from you! I'm here to make your travel experience as safe and comfortable as possible. What would you like help with today? You can ask me about route planning, safety features, nearby facilities, or anything else related to your journey!";
    } else {
      return "I'm here to help with all your travel needs! I can assist you with:\n\n🗺️ Planning safe routes\n🏥 Finding medical facilities\n💊 Locating pharmacies\n🏨 Booking accessible stays\n🚨 Emergency assistance\n⚡ Dynamic re-routing\n\nWhat would you like to know more about?";
    }
  };

  const handleQuickAction = (action: string) => {
    setInputText(action);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 rounded-t-2xl text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-white flex items-center gap-2">
                  Bun AI Assistant
                  <Sparkles className="w-4 h-4" />
                </h3>
                <p className="text-indigo-100 text-sm">Your travel companion</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'bun'
                    ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                {message.sender === 'bun' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div
                className={`max-w-md p-4 rounded-2xl ${
                  message.sender === 'bun'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-2 ${message.sender === 'bun' ? 'text-gray-500' : 'text-indigo-200'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-3 bg-white border-t border-gray-200">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm whitespace-nowrap hover:bg-indigo-100 transition-all"
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-gray-200 rounded-b-2xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Bun anything about your journey..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
