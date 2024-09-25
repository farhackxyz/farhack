/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { masonryGridImages } from "../hackathons/farhack-at-farcon-2024/page";

export function HomeCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full h-auto max-h-[100%] mt-[5%] mb-[5%] overflow-hidden">
      <Carousel setApi={setApi} className="w-full" plugins={[ Autoplay({ delay: 3000 })]} opts={{loop: true}}>
        <CarouselContent>
          {masonryGridImages.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="h-full !border-none">
                <CardContent className="flex flex-col h-full items-center justify-start p-0">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-[75%] w-full object-cover"
                  />
                  <div className="mt-4 text-center text-sm">{image.alt}</div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="p-2 bg-white text-black rounded-full" />
      </Carousel>
    </div>
  );
}