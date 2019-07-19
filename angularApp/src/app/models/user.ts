
export class Data {
    _id: string;
    email: string;
    name: string;
    password: string;
}

export class User {
    data = new Data ();
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}

export class Task {
    completed: boolean;
    task: string;
    userid: string;
    _id: string;
}
