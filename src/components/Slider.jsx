import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import Banner1 from "../assets/banner 1.jpg";
import Banner2 from "../assets/banner 2.jpg";
import Banner3 from "../assets/banner 3.jpg";

const ShineSlider = () => {
  const slides = [
    {
      title: "Shine'sAestheticFind🌷",
      subtitle: "ShinePicks",
      content:
        "Curated by Shine — For the Aligned & Ambitious. A space for clarity, creation, and elevation. Explore things that inspire your inner glow from ideas to aesthetics. Your vibe, your vision, your value. 🌸",
      image: Banner1,
    },
    {
      title: "Shine'sAestheticFind🌷",
      subtitle: "Step Into Alignment",
      content:
        "You were born to align, not hustle. I create with intention, grow with discipline, and share with love. 🌷 Explore tools, habits, and mindsets that changed my life — and will change yours too.",
      image: Banner2,
    },
    {
      title: "Shine'sAestheticFind🌷",
      subtitle: "Save Time. Shop Smart. Stay Inspired",
      content:
        "From workspace tools to wellness finds — I only share what I truly love. Think of me as your creative bestie who saves you hours of scrolling.",
      image: Banner3,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto pt-8 pb-0">
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white py-8 px-6 rounded-xl shadow-md">
                {/* Left: Text */}
                <div className="space-y-3">
                  <h3 className="text-pink-600 font-bold text-lg">{slide.title}</h3>
                  <h2 className="text-2xl font-semibold text-gray-800">{slide.subtitle}</h2>
                  <p className="text-gray-600">{slide.content}</p>
                </div>

                {/* Right: Image */}
                <div>
                  <img
                    src={slide.image}
                    alt={slide.subtitle}
                    className="w-full h-96 object-cover rounded-lg shadow"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-pink-200 p-2 rounded-full shadow hover:bg-pink-300" />
        <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-pink-200 p-2 rounded-full shadow hover:bg-pink-300" />
      </Carousel>
    </div>
  );
};

export default ShineSlider;
