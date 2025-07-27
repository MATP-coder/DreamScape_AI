"use client";

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * LoadingScreen
 *
 * Vollbild‑Overlay, das während der Bildgenerierung angezeigt wird. Zeigt ein
 * animiertes Logo, einen Fortschrittsbalken und zufällige Fakten über Träume.
 * Der Fortschritt läuft linear durch und endet nach der übergebenen Dauer
 * (default: 1500 ms). Beim Abschluss wird onComplete aufgerufen.
 *
 * @param {boolean} show Ob der Ladescreen sichtbar ist
 * @param {function} onComplete Callback nach Abschluss der Animation
 * @param {number} duration Gesamtdauer in Millisekunden
 */
export default function LoadingScreen({ show, onComplete = () => {}, duration = 2000 }) {
  const facts = [
    '95 % unserer Träume sind nach 5 Minuten vergessen.',
    'Jeder träumt – auch wenn man sich nicht daran erinnert.',
    'Farben und Gerüche können deine Traumstimmung beeinflussen.',
    'Albträume helfen dabei, Ängste zu verarbeiten.',
  ]
  const [fact, setFact] = useState('')
  useEffect(() => {
    if (show) {
      // Wähle zufälligen Fakt
      setFact(facts[Math.floor(Math.random() * facts.length)])
      // Timer für Abschluss
      const timer = setTimeout(() => {
        onComplete()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, facts, onComplete])

  if (!show) return null
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-lg text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="flex flex-col items-center space-y-6"
      >
        {/* Rotierendes Logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
          className="relative h-24 w-24"
        >
          <Image src="/logo.png" alt="DreamScape Logo" fill className="object-contain" />
        </motion.div>
        {/* Fortschrittsbalken */}
        <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
            className="h-full bg-brand rounded-full"
          />
        </div>
        <p className="text-sm italic text-center max-w-xs">{fact}</p>
      </motion.div>
    </div>
  )
}