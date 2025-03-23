export interface Event {
    id: string;
    title: string;
    description: string;
    endDate: Date;
    imageUrl: string;
    odds: {
        yes: number;
        no: number;
    };
}

export interface ActivityItem {
    id: string;
    eventId: string;
    eventTitle: string;
    direction: string;
    amount?: string;
    choice?: "yes" | "no";
    timestamp: number;
    imageUrl?: string;
}
