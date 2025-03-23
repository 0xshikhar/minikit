import { Event } from "./types";

export const eventsData: Event[] = [
    {
        id: "1",
        title: "Was Bitcoin below 100k$ in September 2024?",
        description: "Predict whether Bitcoin will be below $100,000 by September 30, 2024.",
        endDate: new Date("2024-09-30"),
        imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        odds: { yes: 0.65, no: 0.35 },
    },
    {
        id: "2",
        title: "Will Ethereum 2.0 launch before July 2024?",
        description: "Predict if Ethereum 2.0 will fully launch before July 1, 2024.",
        endDate: new Date("2024-07-01"),
        imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        odds: { yes: 0.45, no: 0.55 },
    },
    {
        id: "3",
        title: "Will AI regulation pass in the US this year?",
        description: "Predict if the US will pass comprehensive AI regulation in 2024.",
        endDate: new Date("2024-12-31"),
        imageUrl: "https://images.unsplash.com/photo-1677442135136-760c813028c0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        odds: { yes: 0.30, no: 0.70 },
    },
    {
        id: "4",
        title: "Will SpaceX land humans on Mars by 2026?",
        description: "Predict if SpaceX will successfully land humans on Mars by the end of 2026.",
        endDate: new Date("2026-12-31"),
        imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        odds: { yes: 0.15, no: 0.85 },
    },
];
