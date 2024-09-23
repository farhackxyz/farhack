"use client";

export default function Error({ message = 'An error occured.' }: { message?: string }){
    return(
        <div className="flex items-center justify-center min-h-screen text-white text-2xl">
            <p>{message} <a href="/" className="underline">Return to home</a></p>
        </div>
    )
}