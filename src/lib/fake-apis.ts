export type ApiItem = {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    category: string;
    pricing: "Free" | "Freemium" | "Paid";
    latency: string;
    uptime: string;
    auth: "API Key" | "OAuth" | "None";
    endpoint: string;
    version: string;
    featured?: boolean;
};

export const fakeApis: ApiItem[] = [
    {
        id: "1",
        slug: "weatherstack-lite",
        name: "WeatherStack Lite",
        tagline: "Fast weather data for dashboards and apps",
        description:
            "Get current weather, forecasts, and location-based climate data with a simple REST API designed for lightweight frontend and backend integrations.",
        category: "Weather",
        pricing: "Freemium",
        latency: "92ms",
        uptime: "99.98%",
        auth: "API Key",
        endpoint: "https://api.example.com/weather",
        version: "v1",
        featured: true,
    },
    {
        id: "2",
        slug: "authbridge",
        name: "AuthBridge",
        tagline: "User auth, sessions, and identity tools",
        description:
            "Authentication API for handling sign-in, session validation, token refresh, and social login flows with minimal setup.",
        category: "Authentication",
        pricing: "Paid",
        latency: "68ms",
        uptime: "99.99%",
        auth: "OAuth",
        endpoint: "https://api.example.com/auth",
        version: "v2",
        featured: true,
    },
    {
        id: "3",
        slug: "mailforge",
        name: "MailForge",
        tagline: "Transactional email delivery for builders",
        description:
            "Send password resets, notifications, and transactional emails with templates, analytics, and high deliverability.",
        category: "Email",
        pricing: "Freemium",
        latency: "110ms",
        uptime: "99.95%",
        auth: "API Key",
        endpoint: "https://api.example.com/mail",
        version: "v1",
    },
    {
        id: "4",
        slug: "geonode",
        name: "GeoNode",
        tagline: "Geocoding and reverse geocoding made simple",
        description:
            "Convert addresses into coordinates and coordinates back into places with fast global lookup support.",
        category: "Maps",
        pricing: "Free",
        latency: "84ms",
        uptime: "99.93%",
        auth: "None",
        endpoint: "https://api.example.com/geo",
        version: "v1",
    },
    {
        id: "5",
        slug: "paymint",
        name: "PayMint",
        tagline: "Payments API for subscriptions and checkout",
        description:
            "Create charges, manage subscriptions, issue refunds, and track payment events through a modern API.",
        category: "Payments",
        pricing: "Paid",
        latency: "75ms",
        uptime: "99.99%",
        auth: "API Key",
        endpoint: "https://api.example.com/payments",
        version: "v3",
    },
    {
        id: "6",
        slug: "datapulse",
        name: "DataPulse",
        tagline: "Analytics events and product metrics",
        description:
            "Track user events, funnel performance, retention, and custom metrics without building analytics infra yourself.",
        category: "Analytics",
        pricing: "Freemium",
        latency: "95ms",
        uptime: "99.97%",
        auth: "API Key",
        endpoint: "https://api.example.com/analytics",
        version: "v1",
    },
];

export function getApiBySlug(slug: string) {
    return fakeApis.find((api) => api.slug === slug);
}