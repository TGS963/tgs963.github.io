import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const projects = [
    {
        name: "Upscayl Cloud - AI-Powered Image Upscaling Anywhere, Anytime",
        description: "A browser-based, AI-driven tool for enhancing image resolution and quality. It offers fast processing, multiple AI models, face enhancement, and video upscaling, all without requiring high-end hardware. Perfect for designers, photographers, and creatives, it’s a scalable solution for personal and commercial projects. Currently in beta, it’s accessible on any device with a browser.",
        link: "https://upscayl.org",
        image: "/upscayl-cloud.png",
    },
    {
        name: "Upscayl - AI-Powered Image Upscaling for Stunning Visuals",
        description: "Upscayl is an open-source, cross-platform software that leverages advanced AI algorithms to upscale and enhance low-resolution images. Perfect for photographers, designers, and enthusiasts, Upscayl transforms pixelated images into sharp, high-quality visuals with ease. Free, user-friendly, and community-driven, it’s the ultimate tool for image restoration and enhancement.",
        link: "https://upscayl.org",
        image: "/upscayl.png",
    },
    {
        name: "WriteDown.app - A Free and Open Source Markdown Note-Taking Platform",
        description: "WriteDown.app is a versatile and user-friendly tool that redefines the way we take notes and create content. Whether you're a developer, writer, or student, its combination of simplicity, functionality, and open-source flexibility makes it a standout choice for modern note-taking. Try it today and experience the future of Markdown-based writing!",
        link: "https://writedown.app",
        image: "/writedown.png",
    },
];

export const Projects = () => {
    const [current, setCurrent] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const nextSlide = () => setCurrent((prev) => (prev + 1) % projects.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + projects.length) % projects.length);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();
    };

    return (
        <div className="relative w-full overflow-hidden h-full">
            {/* Navigation Buttons */}
            <button
                type="button"
                onClick={prevSlide}
                className="absolute left-0 top-1/2 z-10 p-2 bg-green-100/50 dark:bg-green-900/50 rounded-r-lg"
            >
                <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
                type="button"
                onClick={nextSlide}
                className="absolute right-0 top-1/2 z-10 p-2 bg-green-100/50 dark:bg-green-900/50 rounded-l-lg"
            >
                <FiChevronRight className="w-6 h-6" />
            </button>

            {/* Project Cards */}
            <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {projects.map((project) => (
                    <div
                        key={project.name}
                        className="min-w-full flex flex-col gap-4 p-4"
                    >
                        <h2 className="text-xl font-semibold frutiger-metallic-text">{project.name}</h2>
                        <a
                            href={project.link}
                            className="block overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
                        >
                            <Image
                                src={project.image || '/placeholder.png'}
                                alt={project.name}
                                width={1280}
                                height={720}
                                className="w-full h-60 object-cover rounded-lg"
                                priority={true}
                            />
                        </a>
                        <div className='flex flex-col gap-6 justify-between'>
                            <p className="text-sm text-wrap frutiger-metallic-text">{project.description}</p>
                            <a
                                href={project.link}
                                className="block overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
                            >
                                <button
                                    type="button"
                                    className="p-2 bg-green-200 hover:bg-green-300 transition-all dark:bg-green-900/50 rounded-lg"
                                >
                                    Learn more
                                </button>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots Navigation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {projects.map((project, index) => (
                    <button
                        type="button"
                        key={project.name}
                        onClick={() => setCurrent(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            index === current ? 'bg-green-500' : 'bg-green-200 dark:bg-green-800'
                        }`}
                        aria-label={`Go to project ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};