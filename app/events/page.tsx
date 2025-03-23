"use client";

import { useState, useCallback, useMemo } from "react";
import { Container, Title, Card, Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { v4 as uuidv4 } from "uuid";
import { Event, ActivityItem } from "@/lib/types";
import { eventsData } from "@/lib/data";
import EventCard from "@/components/EventCard";

export default function EventsPage() {
    const [events] = useState<Event[]>([...eventsData]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activities, setActivities] = useLocalStorage<ActivityItem[]>("proof-protocol-activities", []);

    // Use memoized visible events to prevent unnecessary re-renders
    const visibleEvents = useMemo(() => {
        // Only show the top 3 cards for better performance
        return events.slice(currentIndex, currentIndex + 3);
    }, [events, currentIndex]);

    const handleSwipe = useCallback((direction: "left" | "right", choice?: "yes" | "no", amount?: string) => {
        if (currentIndex >= events.length) return;
        
        const currentEvent = events[currentIndex];
        
        // Create new activity based on swipe direction
        const newActivity: ActivityItem = {
            id: uuidv4(),
            eventId: currentEvent.id,
            eventTitle: currentEvent.title,
            direction,
            timestamp: Date.now(),
            imageUrl: currentEvent.imageUrl,
            ...(direction === "right" && choice && amount ? { amount, choice } : {})
        };

        // Update activities with the new one
        setActivities(prev => [newActivity, ...prev]);

        // Move to next card after a short delay
        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
        }, 300);
    }, [currentIndex, events, setActivities]);

    const handleReset = useCallback(() => {
        setCurrentIndex(0);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <div className="border-b">
                <Container>
                    <div className="py-4 flex items-center justify-between">
                        <Link href="/" className="flex items-center text-sm font-medium">
                            <ArrowLeft size={16} className="mr-2" />
                            Home
                        </Link>
                        <Title className="text-xl mb-0">Events</Title>
                        <Link href="/activity" className="text-sm font-medium">
                            Activity
                        </Link>
                    </div>
                </Container>
            </div>

            <Container className="py-6">
                <div className="relative h-[600px] w-full max-w-md mx-auto">
                    {currentIndex < events.length ? (
                        <div className="card-stack">
                            {visibleEvents.map((event, index) => (
                                <div
                                    key={event.id}
                                    className="absolute w-full transition-all duration-300"
                                    style={{
                                        zIndex: 3 - index,
                                        opacity: 1 - (index * 0.15),
                                        transform: `scale(${1 - (index * 0.05)}) translateY(${index * 8}px)`,
                                        pointerEvents: index === 0 ? 'auto' : 'none',
                                    }}
                                >
                                    {index === 0 ? (
                                        <EventCard 
                                            event={event} 
                                            onSwipe={handleSwipe} 
                                        />
                                    ) : (
                                        <Card className="overflow-hidden shadow-lg">
                                            <div className="relative h-48 overflow-hidden">
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center"
                                                    style={{ backgroundImage: `url(${event.imageUrl})` }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                                <div className="absolute bottom-0 left-0 p-4 text-white">
                                                    <h3 className="text-xl font-bold">{event.title}</h3>
                                                </div>
                                            </div>
                                        </Card>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-lg text-gray-500 mb-4">No more events to show</p>
                            <Button onClick={handleReset} className="px-6">
                                Start Over
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
