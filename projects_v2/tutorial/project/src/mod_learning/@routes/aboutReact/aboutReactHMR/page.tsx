import {useEffect, useRef, useState} from "react";
import imgLogo from "./logo.png";

// Note: currently a bug affects React HMR and this sample doesn't work anymore.

export default function() {
    const myText = "I can change this text while the state remain.";

    return <BouncingImage title={myText} />
}

function BouncingImage({title}: {title: string}) {
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>(0);

    const [position] = useState({ x: 100, y: 100 });
    const [velocity] = useState({ x: 3, y: 2 });

    const positionRef = useRef(position);
    const velocityRef = useRef(velocity);

    useEffect(() => {
        const animate = () => {
            if (!imageRef.current || !containerRef.current) return;

            const container = containerRef.current;
            const image = imageRef.current;
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            const imageWidth = image.clientWidth;
            const imageHeight = image.clientHeight;

            positionRef.current.x += velocityRef.current.x;
            positionRef.current.y += velocityRef.current.y;

            if (positionRef.current.x + imageWidth >= containerWidth || positionRef.current.x <= 0) {
                velocityRef.current.x = -velocityRef.current.x;
                positionRef.current.x = Math.max(0, Math.min(positionRef.current.x, containerWidth - imageWidth));
            }

            if (positionRef.current.y + imageHeight >= containerHeight || positionRef.current.y <= 0) {
                velocityRef.current.y = -velocityRef.current.y;
                positionRef.current.y = Math.max(0, Math.min(positionRef.current.y, containerHeight - imageHeight));
            }

            image.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden"
        >
            <img
                ref={imageRef}
                src={imgLogo}
                alt="B"
                className="absolute"
                style={{ willChange: 'transform' }}
            />

            <div className="absolute top-4 left-4 bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg shadow-md">
                <p className="text-sm font-medium text-gray-700">
                    Jopi & React HMR
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Jopi supports hot module replacement (HMR) for React components.<br/>
                    The browser refresh, while your React component state is restored.
                </p>
                <p className="text-xs text-red-500 mt-2">{title}</p>
            </div>
        </div>
    );
}