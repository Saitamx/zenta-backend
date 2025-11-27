declare const BASE_URL: string;
type LoginResponse = {
    accessToken: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
};
declare const admin: {
    name: string;
    email: string;
    password: string;
};
declare const books: Array<{
    title: string;
    author: string;
    publishedYear?: number;
    isbn?: string;
    description?: string;
}>;
declare function ensureAdmin(): Promise<string>;
declare function createBooks(token: string): Promise<void>;
declare function main(): Promise<void>;
