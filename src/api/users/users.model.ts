export interface User {
    firstName: string;
    lastName: string;
    age: number;
    role: UserRole;
}

export enum UserRole {
    admin = "Admin",
    regular = "Regular",
}

export interface UserPathParameter {
    id: string;
}

export interface UserQueryParameter {
    age?: number;
    role?: UserRole;
}
