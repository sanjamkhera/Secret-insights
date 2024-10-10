'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // next provides built in router 
import { db, auth } from '../utils/firebase'; // import db and auth from firebase
import { setDoc, doc, updateDoc, getDoc } from 'firebase/firestore'; // import setDoc, doc, and updateDoc from firebase/firestore
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // User is only allowed to sign in with google or email
import { Card, CardHeader, CardContent } from "@/components/ui/card" // Need to create dialog here
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Star, Users, Briefcase, MessageCircle, Spade } from 'lucide-react';
import ZodiacWheel from './ZodiacWheel';
import Image from 'next/image';
import { toast } from 'react-toastify';
import BirthInfoModal from './BirthInfoModal';
import { FirebaseError } from "firebase/app"; // Import FirebaseError

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
    description: "Explore your connections with others."
  },
  {
    icon: <Briefcase className="text-green-300" size={28} />,
    title: "Career Insights",
    description: "Align your career with your destiny."
  },
  {
    icon: <MessageCircle className="text-purple-300" size={28} />,
    title: "AI Astro-Chat Bot",
    description: "Get instant answers to your questions."
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
  const [showBirthInfoModal, setShowBirthInfoModal] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isNewUser, setIsNewUser] = useState(false);

  // This is for the revolving features on the login page
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Once the user has signed in it will navigate to the dashboard 
  const handleNavigation = () => {
    setTimeout(() => router.push('/dashboard'), 2000); // 2 second delay
  };

  // Toggle between signUp and signIn based, if the user has an account or not
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user already exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        // New user
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: user.displayName
        });
        setIsNewUser(true);
        setShowBirthInfoModal(true);
      } else {
        // Existing user
        toast.success('Successfully signed in!');
        handleNavigation();
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Google sign-in failed. Please try again.');
      toast.error('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Store basic user info in Firebase
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name
      });
      toast.success('Successfully signed up!');
      setShowBirthInfoModal(true);  // Show birth info modal instead of navigating
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try signing in instead.');
        toast.error('This email is already in use. Please try signing in instead.');
      } else {
        console.error('Email sign-up error:', error);
        setError('Email sign-up failed. Please try again.');
        toast.error('Email sign-up failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully signed in!');
      handleNavigation();
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('Invalid credentials. Please try again.');
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBirthInfoSubmit = async () => {
    setIsLoading(true);
    try {
      if (!auth.currentUser) {
        throw new Error("No user is currently signed in");
      }

      await updateUserData(auth.currentUser.uid, {
        birthInfo: {
          date: birthDate,
          time: birthTime,
          place: birthPlace
        }
      });

      toast.success('Birth information saved successfully!');
      handleNavigation();
    } catch (error) {
      console.error('Error saving birth information:', error);
      toast.error('Failed to save birth information. Please try again.');
    } finally {
      setIsLoading(false);
      setShowBirthInfoModal(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateUserData = async (userId: string, data: any) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, data);
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  return (
    <Card className="bg-transparent bg-opacity-60 text-white shadow-lg font-sans border-black-400 border-2 max-w-sm mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform mt-6 pb-6 non-draggable">
      <CardHeader className="pb-2">
        <h1 className="text-3xl font-bold text-center">
          {isSignUp ? 'Join the world of stars' : 'Return to your constellation'}
        </h1>
      </CardHeader>

      <div className="bg-transparent bg-opacity-50 rounded-xl px-4">
        <h2 className="text-2xl font-cursive text-center text-white mb-8">
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
            <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailSignIn} className="space-y-4">
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-xl transition-all duration-300 ease-in-out text-sm flex items-center justify-center"
              >
                <Image src="/google.png" alt="Google" className="mr-2 w-5 h-5" width={20} height={20} />
                {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
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
              <a href="#" onClick={(e) => { e.preventDefault(); toggleAuthMode(); }} className="text-purple-400 hover:underline">
                {isSignUp ? 'Sign in' : 'Join now for FREE!'}
              </a>
            </p>
          </CardContent>

        </Card>
      </div>
      <BirthInfoModal
        isOpen={showBirthInfoModal}
        onClose={() => setShowBirthInfoModal(false)}
        onSubmit={handleBirthInfoSubmit}
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        birthTime={birthTime}
        setBirthTime={setBirthTime}
        birthPlace={birthPlace}
        setBirthPlace={setBirthPlace}
      />
    </Card>
  );
};

export default LoginComponent;