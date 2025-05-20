import React from "react"
import { Sparkles, Heart, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <section className="w-full min-h-screen px-6 md:px-20 py-16 bg-gradient-to-b from-amber-50 via-rose-50 to-pink-100 text-gray-800">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        {/* Heading */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-rose-600">
            About Shine’s Aesthetic 🌷
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Shine’s Aesthetic Find is more than a brand — it’s a creative sanctuary.
            A curated space for the dreamers, the aligned, and the ambitious. A journey
            into inspiration, elevation, and expression.
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-rose-100">
            <Sparkles className="w-8 h-8 text-rose-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-rose-600">Our Vision</h3>
            <p>
              To spark light within every soul that seeks clarity and creativity. We believe your vibe is your compass.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-rose-100">
            <Lightbulb className="w-8 h-8 text-amber-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-amber-600">What We Curate</h3>
            <p>
              Ideas, aesthetics, and experiences that align with your inner glow — from inspiration boards to meaningful moments.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-rose-100">
            <Heart className="w-8 h-8 text-pink-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-pink-600">The Intention</h3>
            <p>
              To connect deeper with ourselves and others — to create spaces that feel like soft homes for your ideas.
            </p>
          </div>
        </div>

        {/* Closing Quote or Highlight */}
        <div className="mt-16">
          <blockquote className="italic text-xl md:text-2xl text-rose-500 font-medium max-w-3xl mx-auto">
            “Your vibe, your vision, your value. 🌸”
          </blockquote>
          <p className="text-sm mt-2 text-gray-500">– Shine Picks</p>
        </div>
      </div>
    </section>
  )
}
