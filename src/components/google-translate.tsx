"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Mic, Volume2, Globe } from "lucide-react";

// Expanded list of languages with ISO codes for each language
const languages = [
  { name: "English", code: "en" },
  { name: "EN Spanish", code: "es" },

  { name: "EN French", code: "fr" },
  { name: "EN German", code: "de" },
  { name: "EN Chinese", code: "zh" },
  { name: "EN Japanese", code: "ja" },
  { name: "EN Korean", code: "ko" },
  { name: "EN Italian", code: "it" },
  { name: "EN Portuguese", code: "pt" },
  { name: "EN Russian", code: "ru" },
  { name: "EN Dutch", code: "nl" },
  { name: "EN Hindi", code: "hi" },
];

export default function Translate() {
  const [inputText, setInputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en"); // Default to English
  const [darkMode, setDarkMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Speech-to-Text
  const handleSpeechToText = () => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition)
      return alert("Speech Recognition not supported in this browser.");

    const recognition = new SpeechRecognition();
    recognition.lang = sourceLanguage; // Set language
    recognition.interimResults = false;

    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };
    recognition.onerror = (event) =>
      console.error("Speech Recognition Error:", event.error);
  };

  // Text-to-Speech
  const handleSpeak = (text: string, language: string) => {
    const synth = window.speechSynthesis;
    if (!synth) return alert("Speech Synthesis not supported in this browser.");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language; // Set language dynamically based on selected language

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    synth.speak(utterance);
  };

  return (
    <div
      className={`w-full min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-white"
      } text-black dark:text-white`}
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Globe className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-normal">Translate</span>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 flex flex-col items-center">
        {/* Center Image */}
        <img
          src="/text-to-speech.png" // Replace with your image source
          alt="Translate"
          className="w-20 h-20 mb-4 animate-pulse"
        />

        {/* Left Section */}
        <div className="w-full max-w-lg">
          {/* Language Selector */}
          <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Source Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            className={`w-full min-h-[200px] mt-2 p-4 resize-none border ${
              darkMode ? "border-gray-200" : "border-gray-300"
            }`}
            placeholder="Enter text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <Button onClick={handleSpeechToText}>
              <Mic className="mr-2" /> Speech to Text
            </Button>
            <Button
              onClick={() => handleSpeak(inputText, sourceLanguage)}
              className={`relative flex items-center justify-center p-2 rounded-lg ${
                isSpeaking ? "bg-wave bg-cover bg-center" : ""
              }`}
            >
              <Volume2 className="mr-2" />
              Speak
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
