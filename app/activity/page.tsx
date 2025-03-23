"use client";

import { useState } from "react";
import { Container, Title, Card, CardContent, Button } from "@/components/ui";
import { ArrowLeft, Check, X, DollarSign, Clock } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { formatDistanceToNow } from "date-fns";
import { ActivityItem } from "@/lib/types";

export default function ActivityPage() {
    const [activities, setActivities] = useLocalStorage<ActivityItem[]>("proof-protocol-activities", []);
    const [filter, setFilter] = useState<"all" | "attested" | "skipped">("all");

    const filteredActivities = activities.filter(activity => {
        if (filter === "all") return true;
        if (filter === "attested") return activity.direction === "right";
        if (filter === "skipped") return activity.direction === "left";
        return true;
    });

    const clearActivities = () => {
        if (confirm("Are you sure you want to clear all activity history?")) {
            setActivities([]);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="border-b">
                <Container>
                    <div className="py-4 flex items-center justify-between">
                        <Link href="/events" className="flex items-center text-sm font-medium">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Events
                        </Link>
                        <Title className="text-xl mb-0">Activity</Title>
                        <div className="w-8"></div> {/* Spacer for alignment */}
                    </div>
                </Container>
            </div>

            <Container className="py-6">
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <Button
                        variant={filter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter("all")}
                        className="rounded-full"
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === "attested" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter("attested")}
                        className="rounded-full"
                    >
                        Attested
                    </Button>
                    <Button
                        variant={filter === "skipped" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter("skipped")}
                        className="rounded-full"
                    >
                        Skipped
                    </Button>
                </div>

                {filteredActivities.length > 0 ? (
                    <div className="space-y-4">
                        {filteredActivities.map((activity) => (
                            <Card key={activity.id} className="overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex items-center p-4">
                                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mr-4 overflow-hidden">
                                            {activity.imageUrl ? (
                                                <div
                                                    className="h-full w-full bg-cover bg-center"
                                                    style={{ backgroundImage: `url(${activity.imageUrl})` }}
                                                />
                                            ) : (
                                                activity.direction === "right" ?
                                                    <Check className="text-green-500" /> :
                                                    <X className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm line-clamp-1">{activity.eventTitle}</h3>
                                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                <Clock size={12} className="mr-1" />
                                                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {activity.direction === "right" ? (
                                                <div>
                                                    <div className="flex items-center text-green-600 font-medium">
                                                        <DollarSign size={14} />
                                                        <span>{activity.amount} WLD</span>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground mt-1 capitalize">
                                                        {activity.choice}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-muted-foreground">Skipped</span>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                            <Clock size={24} className="text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No activity yet</h3>
                        <p className="text-muted-foreground mb-6">
                            Your activity history will appear here after you interact with events.
                        </p>
                        <Link href="/events">
                            <Button>Browse Events</Button>
                        </Link>
                    </div>
                )}

                {filteredActivities.length > 0 && (
                    <div className="mt-8 text-center">
                        <Button variant="outline" size="sm" onClick={clearActivities}>
                            Clear History
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
} 