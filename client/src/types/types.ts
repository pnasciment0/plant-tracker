// // ================== Utilities ==================== //

export interface Message {
    msg: string;
}

export type APIResponse<T, E = string> = {
    data?: T;
    error?: E;
};

export interface LoginResponse {
    user: User;
    token: string;
}

export type AuthState = {
    user: User | null;
    loading: "idle" | "loading";
}


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

