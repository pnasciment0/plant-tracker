// // ================== Utilities ==================== //

export type APIResponse<T> = {
    data?: T;
    error?: string;
};


// ================== Wtrd Data ==================== //

export interface User {
    id: string;
    name: string;
}

export interface Plant {
    _id: string;
    createdAt: string;
    fertilizerFrequency: number;
    lastFertilized: string;
    lastWatered: string;
    location: string;
    name: string;
    notes: string;
    potSize: number;
    pottedOn: string;
    soilMix: string;
    species: string;
    wateringFrequency: number;
}

