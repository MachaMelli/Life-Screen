"use client";

import Image from "next/image";

interface LogoProps {
    className?: string;
    size?: number;
}

export default function Logo({ className = "", size = 40 }: LogoProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-lg ${className}`}
            style={{ width: size, height: size }}
        >
            <Image
                src="/logo.jpeg"
                alt="Life Screen Logo"
                fill
                className="object-cover"
            />
        </div>
    );
}
