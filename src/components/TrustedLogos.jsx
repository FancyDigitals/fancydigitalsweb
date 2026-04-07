"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function TrustedLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const logos = [
    { src: "/logos/al-amanah.jpg", name: "Partner 1" },
    { src: "/logos/feastbasket.jpg", name: "Partner 2" },
    { src: "/logos/marinetech.jpg", name: "Partner 3" },
    { src: "/logos/sibgahtullah.jpg", name: "Partner 4" },
    { src: "/logos/trade.jpg", name: "Partner 5" },
    { src: "/logos/tshirt.jpg", name: "Partner 6" },
  ];

  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-r from-[#075a01] to-[#0a8f01]">
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative py-12 sm:py-16">
        
        {/* Header */}
        <div className="text-center mb-10 px-4">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            Collaborating with{" "}
            <span className="text-yellow-300">Leading Organizations</span>
          </h2>
          
          <p className="text-white/70 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Proud to work alongside respected institutions and communities
          </p>
        </div>

        {/* Scrolling Logos - First Row (Left to Right) */}
        <div className="relative mb-6">
          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#075a01] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#0a8f01] to-transparent z-10"></div>
          
          <div className="overflow-hidden">
            <div className="flex animate-scroll-left gap-8 sm:gap-12 w-max">
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 group"
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-8 py-4 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="h-8 md:h-10 w-auto max-w-[120px] object-contain opacity-90 hover:opacity-100 transition duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling Logos - Second Row (Right to Left) */}
        <div className="relative">
          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#075a01] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#0a8f01] to-transparent z-10"></div>
          
          <div className="overflow-hidden">
            <div className="flex animate-scroll-right gap-8 sm:gap-12 w-max">
              {[...logos.reverse(), ...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 group"
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-8 py-4 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="h-8 md:h-10 w-auto max-w-[120px] object-contain opacity-90 hover:opacity-100 transition duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}