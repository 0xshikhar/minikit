"use client";

import { motion, useAnimation, PanInfo } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check, DollarSign, X, ArrowLeft } from "lucide-react";
import { useState, useRef, useCallback, memo } from "react";
import { Event } from "@/lib/types";
import { Slider } from "./ui/slider";

interface EventCardProps {
    event: Event;
    onSwipe: (direction: "left" | "right", choice?: "yes" | "no", amount?: string) => void;
}

const EventCard = memo(({ event, onSwipe }: EventCardProps) => {
    const controls = useAnimation();
    const [amount, setAmount] = useState("50");
    const [showAttestScreen, setShowAttestScreen] = useState(false);
    const [selectedChoice, setSelectedChoice] = useState<"yes" | "no" | null>(null);
    const [leverage, setLeverage] = useState(1);
    const cardRef = useRef<HTMLDivElement>(null);

    // Calculate possible return
    const possibleReturn = parseFloat(amount) * leverage;

    const handleDragEnd = useCallback(async (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 100;

        if (!showAttestScreen) {
            // First screen - swipe left to skip, right to attest
            if (info.offset.x > threshold) {
                // Swiped right - show attest screen
                await controls.start({ x: "100vw", opacity: 0 });
                setShowAttestScreen(true);
                setTimeout(() => {
                    controls.start({ x: 0, opacity: 1 });
                }, 300);
            } else if (info.offset.x < -threshold) {
                // Swiped left - skip
                await controls.start({ x: "-100vw", opacity: 0 });
                onSwipe("left");
            } else {
                // Reset position
                controls.start({ x: 0 });
            }
        } else {
            // Second screen - swipe left to reject, right to submit
            if (info.offset.x > threshold && selectedChoice && amount) {
                // Swiped right - submit
                await controls.start({ x: "100vw", opacity: 0 });
                onSwipe("right", selectedChoice, amount);
            } else if (info.offset.x < -threshold) {
                // Swiped left - reject/back
                await controls.start({ x: "-100vw", opacity: 0 });
                setTimeout(() => {
                    setShowAttestScreen(false);
                    setSelectedChoice(null);
                    controls.start({ x: 0, opacity: 1 });
                }, 300);
            } else {
                // Reset position
                controls.start({ x: 0 });
            }
        }
    }, [showAttestScreen, selectedChoice, amount, controls, onSwipe]);

    const formatDate = useCallback((date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }, []);

    const handleSkip = useCallback(async () => {
        await controls.start({ x: "-100vw", opacity: 0 });
        onSwipe("left");
    }, [controls, onSwipe]);

    const handleAttest = useCallback(async () => {
        await controls.start({ x: "100vw", opacity: 0 });
        setShowAttestScreen(true);
        setTimeout(() => {
            controls.start({ x: 0, opacity: 1 });
        }, 300);
    }, [controls]);

    const handleBack = useCallback(async () => {
        await controls.start({ x: "-100vw", opacity: 0 });
        setTimeout(() => {
            setShowAttestScreen(false);
            setSelectedChoice(null);
            controls.start({ x: 0, opacity: 1 });
        }, 300);
    }, [controls]);

    const handleSubmit = useCallback(async () => {
        if (selectedChoice && amount) {
            await controls.start({ x: "100vw", opacity: 0 });
            onSwipe("right", selectedChoice, amount);
        }
    }, [selectedChoice, amount, controls, onSwipe]);

    const handleAmountPreset = useCallback((preset: string) => {
        setAmount(preset);
    }, []);

    const handleChoiceSelect = useCallback((choice: "yes" | "no") => {
        setSelectedChoice(choice);
    }, []);

    const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    }, []);

    const handleLeverageChange = useCallback((value: number[]) => {
        setLeverage(value[0]);
    }, []);

    return (
        <motion.div
            ref={cardRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial={{ opacity: 1, x: 0 }}
            className="absolute w-full touch-manipulation"
            style={{ touchAction: "pan-y" }}
        >
            {!showAttestScreen ? (
                // First screen - Event details
                <Card className="overflow-hidden shadow-lg">
                    <div className="relative h-48 overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${event.imageUrl})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <p className="text-sm opacity-80">Ends: {formatDate(event.endDate)}</p>
                        </div>
                    </div>

                    <CardContent className="p-4">
                        <p className="text-sm text-gray-600 mb-4">{event.description}</p>

                        <div className="flex justify-between mb-2">
                            <div className="text-center">
                                <div className="text-sm text-gray-500">Yes</div>
                                <div className="font-bold">{(event.odds.yes * 100).toFixed(0)}%</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-500">No</div>
                                <div className="font-bold">{(event.odds.no * 100).toFixed(0)}%</div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between p-4">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleSkip}
                            className="flex-1 mr-2"
                        >
                            <X size={16} className="mr-2" /> Skip
                        </Button>
                        <Button
                            size="lg"
                            onClick={handleAttest}
                            className="flex-1 ml-2"
                        >
                            <DollarSign size={16} className="mr-2" /> Attest
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                // Second screen - Attestation details
                <Card className="overflow-hidden shadow-lg">
                    <CardHeader className="relative p-0">
                        <div className="relative h-24 overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${event.imageUrl})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        </div>
                        <div className="absolute top-4 left-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white p-1 h-8 w-8"
                                onClick={handleBack}
                            >
                                <ArrowLeft size={16} />
                            </Button>
                        </div>
                        <div className="p-4 pt-2">
                            <h3 className="text-lg font-bold">{event.title}</h3>
                            <p className="text-sm text-gray-500">100 WLD</p>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 pt-0">
                        {/* Yes/No Selection */}
                        <div className="space-y-2 mb-6">
                            <div
                                className={`p-4 rounded-lg flex justify-between items-center cursor-pointer border ${selectedChoice === "yes"
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200"
                                    }`}
                                onClick={() => handleChoiceSelect("yes")}
                            >
                                <div>
                                    <span className="font-medium">yes</span>
                                    <div className="text-sm text-gray-500">50 WLD</div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border ${selectedChoice === "yes"
                                        ? "border-blue-500 bg-blue-500"
                                        : "border-gray-300"
                                    } flex items-center justify-center`}>
                                    {selectedChoice === "yes" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                </div>
                            </div>

                            <div
                                className={`p-4 rounded-lg flex justify-between items-center cursor-pointer border ${selectedChoice === "no"
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200"
                                    }`}
                                onClick={() => handleChoiceSelect("no")}
                            >
                                <div>
                                    <span className="font-medium">no</span>
                                    <div className="text-sm text-gray-500">50 WLD</div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border ${selectedChoice === "no"
                                        ? "border-blue-500 bg-blue-500"
                                        : "border-gray-300"
                                    } flex items-center justify-center`}>
                                    {selectedChoice === "no" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                </div>
                            </div>
                        </div>

                        {/* Amount Selection */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Amount (WLD)
                                </label>
                                <div className="flex gap-2">
                                    {["10", "50", "100"].map((preset) => (
                                        <Button
                                            key={preset}
                                            variant={amount === preset ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleAmountPreset(preset)}
                                            className="h-7 px-2 text-xs"
                                        >
                                            {preset}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <Input
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                className="w-full"
                                min="0.01"
                                step="0.01"
                            />
                        </div>

                        {/* Leverage Slider */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Leverage
                                </label>
                                <span className="text-sm font-medium">{leverage}x</span>
                            </div>
                            <Slider
                                value={[leverage]}
                                min={1}
                                max={5}
                                step={0.5}
                                onValueChange={handleLeverageChange}
                                className="mb-2"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>1x</span>
                                <span>5x</span>
                            </div>
                        </div>

                        {/* Possible Return */}
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-blue-800">Current Possible Return:</span>
                                <span className="font-bold text-blue-800">{possibleReturn.toFixed(2)} WLD</span>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between p-4">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleBack}
                            className="flex-1 mr-2"
                        >
                            <X size={16} className="mr-2" /> Back
                        </Button>
                        <Button
                            size="lg"
                            onClick={handleSubmit}
                            disabled={!selectedChoice || !amount}
                            className="flex-1 ml-2"
                        >
                            <Check size={16} className="mr-2" /> Submit {leverage}x
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {/* Swipe indicators - only visible during swipe */}
            <div className="absolute inset-0 pointer-events-none flex opacity-0 transition-opacity duration-200"
                style={{ opacity: cardRef.current?.style.transform ? 0.3 : 0 }}>
                <div className="w-1/2 flex items-center justify-start pl-6">
                    <X size={40} className="text-red-500" />
                </div>
                <div className="w-1/2 flex items-center justify-end pr-6">
                    {!showAttestScreen ? (
                        <DollarSign size={40} className="text-green-500" />
                    ) : (
                        <Check size={40} className="text-green-500" />
                    )}
                </div>
            </div>
        </motion.div>
    );
});

EventCard.displayName = "EventCard";

export default EventCard;