"use client";

import { karla, masonryGridImages } from "@/lib/utils";
import { ExpandableImage } from "./expandable-image";

export default function MasonryGrid() {
    return (
        <div className="w-full md:w-1/2 min-h-[100%] h-auto bg-black/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-4 p-4 pt-5 overflow-y-scroll">
            {masonryGridImages.map((image, index) => (
                <ExpandableImage imageUrl={image.src} alt={image.alt} key={index} />
            ))}
        </div>
    );
}