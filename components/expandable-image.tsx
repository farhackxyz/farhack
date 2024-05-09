"use client";

import { useState } from "react";

export const ExpandableImage = ({ imageUrl, alt }: { imageUrl: string; alt: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="relative">
            <div className="h-full object-contain cursor-pointer" onClick={handleImageClick}>
                <img src={`${imageUrl}`} alt={alt} className="w-full h-auto rounded-md" />
            </div>
            {isExpanded && (
                <div
                    className="fixed top-0 left-0 w-full h-full p-10 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setIsExpanded(false)}
                >
                    <img
                        src={`${imageUrl}`}
                        alt={alt}
                        width={700}
                        height={700}
                        className="max-h-[75vh] object-contain"
                    />
                </div>
            )}
        </div>
    );
};