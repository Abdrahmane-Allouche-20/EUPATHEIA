'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { status } = useSession()
 
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute "></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-[#2D3142] mb-6">
              IGNAVIA
            </h1>
            <p className="text-xl md:text-2xl text-[#2D3142]/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your mindset with the power of positive quotes. 
              <span className="block mt-2 font-medium bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent">
                Ignite your inner fire and conquer laziness.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              {status==='unauthenticated' || status === 'loading' ? 
                <Link href="/auth/signin">
                  <button className="bg-gradient-to-r from-yellow-400 to-red-400 backdrop-blur-sm  text-white font-bold py-4 px-8 rounded-full border border-white/30 transition-all duration-300 transform hover:scale-105">
                    Join Community
                  </button>
                </Link>
              :<Link href="/quotes">
                <button className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Explore Quotes
                </button>
              </Link>}
            </div>
          </div>
        </div>
        
        {/* Floating Animation Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </section>

      {/* What is Ignavia Section */}
      <section className="py-20 bg-white/10 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D3142] mb-6">
              What is <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Ignavia</span>?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-[#2D3142] mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-orange-500 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">!</span>
                  </div>
                  The Problem
                </h3>
                <p className="text-[#2D3142]/80 leading-relaxed">
                  <strong className="text-red-300">Ignavia</strong> is a Latin word meaning <em>"laziness"</em> or <em>"lack of energy"</em>. 
                  It represents that inner voice that holds us back, the procrastination that stops us from achieving our dreams, 
                  and the mental fog that clouds our potential.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-w[#2D3142]hite mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  Our Solution
                </h3>
                <p className="text-[#2D3142]/80 leading-relaxed">
                  Our platform helps you <strong className="text-green-300">conquer ignavia</strong> through the power of positive quotes, 
                  community support, and daily inspiration. We believe that the right words at the right time can 
                  <em className="text-blue-300">ignite your inner fire</em> and transform your mindset.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-[#2D3142] mb-4">Ignite Your Potential</h4>
                  <p className="text-[#2D3142]/90 italic text-lg leading-relaxed">
                    "The spark of motivation lives within you. Sometimes it just needs the right words to set it ablaze."
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-30 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D3142] mb-6">
              How We Help You <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">Overcome</span>
            </h2>
            <p className="text-xl text-[#2D3142]/80 max-w-3xl mx-auto">
              Our platform provides powerful tools to help you break free from the chains of procrastination and laziness.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2D3142] mb-4">Curated Quotes</h3>
              <p className="text-[#2D3142]/80 leading-relaxed">
                Access thousands of inspiring quotes categorized by mood and theme. Find the perfect words to motivate you when you need them most.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2D3142] mb-4">Community Support</h3>
              <p className="text-[#2D3142]/80 leading-relaxed">
                Join a community of like-minded individuals on their journey to overcome procrastination and achieve their goals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2D3142] mb-4">Personal Growth</h3>
              <p className="text-[#2D3142]/80 leading-relaxed">
                Create and share your own quotes, track your progress, and build habits that lead to lasting positive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white/5 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-white/20 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D3142] mb-8">
              Our <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Mission</span>
            </h2>
            <p className="text-xl text-[#2D3142]/90 leading-relaxed mb-8">
              To help every person overcome their inner <em className="text-red-300 font-semibold">ignavia</em> and unlock their true potential
              through the transformative power of positive thinking, community support, and daily inspiration.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg text-[#2D3142]/80">
              <span className="bg-white/30 px-4 py-2 rounded-full border border-white/20">#MotivationMatters</span>
              <span className="bg-white/30 px-4 py-2 rounded-full border border-white/20">#ConquerLaziness</span>
              <span className="bg-white/30 px-4 py-2 rounded-full border border-white/20">#IgniteYourFire</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2D3142] mb-6">
            Ready to <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">Ignite</span> Your Journey?
          </h2>
          <p className="text-xl text-[#2D3142]/80 mb-10 max-w-2xl mx-auto">
            Join thousands of people who have already started their journey from ignavia to inspiration. 
            Your transformation begins with a single quote.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">

            
          {status==='unauthenticated' || status === 'loading' ? 
             <Link href="/auth/signin">
                <button className="bg-gradient-to-r from-green-300 to-cyan-300 hover:from-blue-400 hover:to-cyan-400 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Join the Community
                </button>
              </Link>
             : 
              <Link href="/quotes/create">
                <button className="bg-gradient-to-r from-green-300 to-cyan-300 hover:from-blue-400 hover:to-cyan-400 backdrop-blur-sm hover:bg-white/30 text-[#2D3142] font-bold py-4 px-8 rounded-full border border-white/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Share Your Wisdom
                </button>
              </Link>
              
            }
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="py-16 bg-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-[#2D3142]/90 italic leading-relaxed">
            "The only way to overcome ignavia is to take the first step. 
            <span className="block mt-4 font-semibold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Let your journey begin today."
            </span>
          </blockquote>
          <cite className="text-[#2D3142]/70 mt-6 block">— The Ignavia Team</cite>
        </div>
      </section>
    </div>
  )
}