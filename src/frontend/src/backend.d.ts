import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type PlayerQuery = string;
export type Category = string;
export interface ScoreEntry {
    email: string;
    score: bigint;
    timestamp: bigint;
    category: string;
}
export interface QuizScore {
    score: bigint;
    totalQuestions: bigint;
    timestamp: bigint;
    category: string;
}
export type Country = string;
export interface UserStats {
    quizScores: Array<QuizScore>;
    countriesViewed: Array<string>;
    playersSearched: Array<string>;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGlobalLeaderboard(): Promise<Array<ScoreEntry>>;
    getTopScores(): Promise<Array<ScoreEntry>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserScores(email: string): Promise<Array<ScoreEntry>>;
    getUserStats(email: string): Promise<UserStats | null>;
    isCallerAdmin(): Promise<boolean>;
    loginUser(email: string, password: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    registerUser(email: string, password: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveScore(email: string, score: bigint, category: string): Promise<void>;
    submitQuizScore(email: string, score: bigint, category: Category, totalQuestions: bigint): Promise<void>;
    trackCountryView(email: string, country: Country): Promise<void>;
    trackPlayerSearch(email: string, playerQuery: PlayerQuery): Promise<void>;
}
