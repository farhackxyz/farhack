"use client";

import { masonryGridImages } from "@/lib/utils";
import { ExpandableImage } from "./expandable-image";
import { MasonryGridImage } from "@/lib/types";

const splitIntoTwoColumns = (images: MasonryGridImage[]) => {
    const half = Math.ceil(images.length / 2);
    return [images.slice(0, half), images.slice(half)];
};

export default function MasonryGrid() {
    const [leftColumn, rightColumn] = splitIntoTwoColumns(masonryGridImages);

    return (
        <div className="w-full md:w-1/2 min-h-[100%] h-auto bg-[#0c0c0c]/95 grid grid-cols-2 gap-4 p-4 pt-5 overflow-y-scroll">
            <div className="flex flex-col gap-8">
                {leftColumn.map((image, index) => (
                    <div key={index}>
                        <ExpandableImage
                            imageUrl={image.src}
                            alt={image.alt}
                        />
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-8">
                {rightColumn.map((image, index) => (
                    <div key={index}>
                        <ExpandableImage
                            imageUrl={image.src}
                            alt={image.alt}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}