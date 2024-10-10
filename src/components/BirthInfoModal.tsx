import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Calendar } from 'lucide-react';

interface BirthInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  birthDate: string;
  setBirthDate: (date: string) => void;
  birthTime: string;
  setBirthTime: (time: string) => void;
  birthPlace: string;
  setBirthPlace: (place: string) => void;
}

const BirthInfoModal: React.FC<BirthInfoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  birthDate,
  setBirthDate,
  birthTime,
  setBirthTime,
  birthPlace,
  setBirthPlace
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 text-white border-purple-800 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-2">Your Cosmic Origins</DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            To create your personalized astrological profile, we need the exact details of your birth. This information allows us to calculate your unique natal chart and unlock the celestial insights that have been waiting for you since the moment you were born.
          </DialogDescription>
        </DialogHeader>
        <Card className="bg-transparent border-none">
          <CardContent className="space-y-4 mt-4">
            <div className="flex items-center space-x-2">
              <Calendar className="text-purple-400" size={20} />
              <Input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="flex-grow bg-purple-900 border-purple-700 text-white rounded-xl text-sm placeholder-gray-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-purple-400" size={20} />
              <Input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="flex-grow bg-purple-900 border-purple-700 text-white rounded-xl text-sm placeholder-gray-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-purple-400" size={20} />
              <Input
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                placeholder="Birth Place (e.g., New York, USA)"
                className="flex-grow bg-purple-900 border-purple-700 text-white rounded-xl text-sm placeholder-gray-400"
              />
            </div>
          </CardContent>
        </Card>
        <Button 
          onClick={onSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 text-sm mt-4"
        >
          Unveil My Cosmic Blueprint
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BirthInfoModal;