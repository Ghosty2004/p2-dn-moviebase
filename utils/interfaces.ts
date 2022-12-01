export interface user {
    name?: string;
    eMail?: string;
    password?: string;
    joinDate?: Date;
    token?: string;
    watchList?: Array<number>;
    historyList?: Array<{
        id: number;
        date: Date;
    }>;
};