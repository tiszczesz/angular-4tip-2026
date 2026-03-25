export type User = {
    id: number;
    firstname: string;
    email: string;
    role: "admin" | "user" | "guest" | "editor";
    date: Date;
}
export const getRoles = (): string[] => {
    return ["admin", "user", "guest", "editor"];
}
export const getUsers = (): User[] => {
    return [
        {
            id: 1,
            firstname: "John",
            email: "john@example.com",
            role: "user",
            date: new Date()
        },
        {
            id: 2,
            firstname: "Alice",
            email: "alice@example.com",
            role: "admin",
            date: new Date()
        },
        {
            id: 3,
            firstname: "Bob",
            email: "bob@example.com",
            role: "editor",
            date: new Date()
        },
        {
            id: 4,
            firstname: "Carol",
            email: "carol@example.com",
            role: "user",
            date: new Date()
        },
        {
            id: 5,
            firstname: "David",
            email: "david@example.com",
            role: "guest",
            date: new Date()
        },
        {
            id: 6,
            firstname: "Emma",
            email: "emma@example.com",
            role: "user",
            date: new Date()
        },
        {
            id: 7,
            firstname: "Frank",
            email: "frank@example.com",
            role: "editor",
            date: new Date()
        },
        {
            id: 8,
            firstname: "Grace",
            email: "grace@example.com",
            role: "admin",
            date: new Date()
        },
        {
            id: 9,
            firstname: "Henry",
            email: "henry@example.com",
            role: "user",
            date: new Date()
        },
        {
            id: 10,
            firstname: "Ivy",
            email: "ivy@example.com",
            role: "guest",
            date: new Date()
        }
    ];
}
export const getLatestUserId = (): number => {
    let maxId = 0;
    getUsers().forEach(user => {
        if (user.id > maxId) {
            maxId = user.id;
        }
    });
    return maxId;
}