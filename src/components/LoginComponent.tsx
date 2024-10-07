'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Star, Users, Briefcase, MessageCircle, Spade } from 'lucide-react';
import ZodiacWheel from './ZodiacWheel'; 
import Image from 'next/image';

const features = [
  {
    icon: <Mail className="text-blue-300" size={28} />,
    title: "Daily Horoscope Email",
    description: "Personalized celestial insights in your inbox daily."
  },
  {
    icon: <Star className="text-yellow-300" size={28} />,
    title: "Natal Chart Analysis",
    description: "Discover your cosmic blueprint and life path."
  },
  {
    icon: <Users className="text-pink-300" size={28} />,
    title: "Compatibility Analysis",
    description: "Explore your astrological connections with others."
  },
  {
    icon: <Briefcase className="text-green-300" size={28} />,
    title: "Career Insights",
    description: "Align your career with your astrological destiny."
  },
  {
    icon: <MessageCircle className="text-purple-300" size={28} />,
    title: "AI Astro-Chat Bot",
    description: "Get instant answers to your cosmic questions."
  },
  {
    icon: <Spade className="text-orange-300" size={28} />,
    title: "Tarot Card Reading",
    description: "Digital tarot readings for mystical guidance."
  },
];

const LoginComponent: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000); // Change feature every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      if (email === '' && password === '') {
        router.push('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }, 1500);
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      alert('Google sign-in successful! (This is a placeholder)');
    }, 1500);
  };

  const handleAppleSignIn = () => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      alert('Apple sign-in successful! (This is a placeholder)');
    }, 1500);
  };

  return (
    <Card className="bg-transparent bg-opacity-60 text-white shadow-lg font-sans border-black-400 border-2 max-w-sm mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform mt-6 pb-6">
      <CardHeader className="pb-2">
        <h1 className="text-3xl font-bold text-center">
          {isSignUp ? 'Join the world of stars' : 'Return to your constellation'}
        </h1>
      </CardHeader>
      <div className="bg-transparent bg-opacity-50 rounded-xl px-4 ">
        <h2 className="text-xl font-bold text-center text-white mb-4">
          Free Cosmic Services
        </h2>
        <div className="relative h-24 overflow-hidden">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${index === currentFeature ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                }`}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-purple-800 p-2 rounded-full">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-300">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <ZodiacWheel />
      </div>
      <div className="w-full max-w-md mx-auto">
        <Card className="mb-6 bg-transparent border-none">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Button
                type="button"
                onClick={handleAppleSignIn}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold rounded-xl transition-all duration-300 ease-in-out text-sm flex items-center justify-center"
              >
                <Image src="/apple.png" alt="Apple" className="mr-2 w-5 h-5" />
                Sign up with Apple
              </Button>
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-xl transition-all duration-300 ease-in-out text-sm flex items-center justify-center"
              >
                <Image src="/google.png" alt="Google" className="mr-2 w-5 h-5" />
                Sign up with Google
              </Button>

              <div className="relative flex py-3 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>

              {isSignUp && (
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-purple-900 border-purple-700 text-white rounded-xl text-sm placeholder-gray-400"
                  placeholder="User Name"
                />
              )}
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-purple-900 border-purple-700 text-white rounded-xl text-sm placeholder-gray-400"
                placeholder="Email"
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-purple-900 border-purple-700 text-white rounded-xl text-sm placeholder-gray-400"
                placeholder="Password"
              />

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all duration-300 ease-in-out text-sm"
                disabled={isLoading}
              >
                {isLoading ? 'Aligning Stars...' : isSignUp ? 'Sign Up' : 'Enter Cosmic Realm'}
              </Button>
            </form>

            {error && (
              <div className="text-red-500 text-center mt-4 text-sm">
                {error}
              </div>
            )}

            <p className="text-center text-white text-sm mt-4">
              {isSignUp ? 'Already a member?' : 'Not in the constellation yet?'}
              {' '}
              <a href="#" onClick={toggleAuthMode} className="text-purple-400 hover:underline">
                {isSignUp ? 'Sign in' : 'Join now for FREE!'}
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </Card>
  );
};

export default LoginComponent;