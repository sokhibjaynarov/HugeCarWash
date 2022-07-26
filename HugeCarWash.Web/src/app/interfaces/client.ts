export interface IClient {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    telegramId: string;
    carModel: string;
    carNumber: string;
}

export class Client{
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public phoneNumber: string,
        public telegramId: string,
        public carModel: string,
        public carNumber: string,
    ){}
}