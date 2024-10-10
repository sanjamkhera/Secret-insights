'use client'
import React, { useState, useEffect } from 'react';
import WeeklyHoroscope from '@/components/WeeklyHoroscope';
import NatalChart from '@/components/NatalChart';
import Compatibility from '@/components/Compatibility';
import CareerInsights from '@/components/CareerInsights';
import TarotCards from '@/components/TarotCards';
import AIChat from '@/components/AIChat';
import { ZodiacSign } from '@/types';
import { auth, db } from '@/utils/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserData } from '@/types/userData';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data() as UserData);
        }
      }
    };

    fetchUserData();
  }, []);

  const updateUserData = async (userId: string, data: Partial<UserData>) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, data);
    setUserData((prevData: UserData | null) => prevData ? { ...prevData, ...data } : null);
  };

  const handleSignSelect = (sign: ZodiacSign) => {
    console.log(sign);
    // Add any additional logic here when a sign is selected
  };

  if (!userData || !auth.currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Celestial Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeeklyHoroscope onSignSelect={handleSignSelect} />
        <NatalChart 
          userId={auth.currentUser.uid}
          userData={userData}
          updateUserData={updateUserData}
        />
        <Compatibility />
        <CareerInsights />
        <TarotCards />
        <AIChat />
      </div>
    </div>
  );
};

export default Dashboard;