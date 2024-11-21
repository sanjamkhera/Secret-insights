'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Sparkle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  text: string;
  isUser: boolean;
}

const examplePrompts = [
  "Explain retrograde motion in astrology",
  "How does Jupiter affect one's fortune?",
  "Significance of the 12 houses in a natal chart?",
  "Describe the personality traits of a Scorpio?"
];

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = { text, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulating AI response
    setTimeout(() => {
      const aiMessage: Message = { text: `AI response to: "${text}"`, isUser: false };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="text-white shadow-lg font-sans border-black-400 border-2 max-w-sm mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform mt-8">
      <CardHeader className="pb-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3 font-cursive leading-relaxed text-white">Cosmic AI Chat</h1>
        </div>
      </CardHeader>

      <CardContent className="px-6 relative">
        {messages.length === 0 && (
          <div className="grid grid-cols-1 gap-4 mb-6">
            {examplePrompts.map((prompt, index) => (
              <Button
                key={index}
                onClick={() => handleSendMessage(prompt)}
                className="bg-purple-800 hover:bg-purple-700 text-white text-left p-4 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {prompt}
              </Button>
            ))}
          </div>
        )}

        <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3/4 p-3 rounded-2xl ${message.isUser ? 'bg-purple-700' : 'bg-blue-700'}`}>
                <div className="flex items-center mb-1">
                  {message.isUser ? <User size={16} className="mr-2" /> : <Bot size={16} className="mr-2" />}
                  <span className="font-bold">{message.isUser ? 'You' : 'Cosmic AI'}</span>
                </div>
                <p>{message.text}</p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about the cosmos..."
            className="flex-grow bg-purple-900 border-purple-700 text-white rounded-xl"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={() => handleSendMessage()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? <Sparkle className="animate-spin" /> : <Send />}
          </Button>
        </div>
      </CardContent>

      <CardFooter className="justify-center pb-4">
        <p className="text-sm font-cursive leading-relaxed text-white text-center">
          Explore the wisdom of the universe through AI
        </p>
      </CardFooter>
    </Card>
  );
};

export default AIChat;