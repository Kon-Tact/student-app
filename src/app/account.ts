export class account {
    id!: number;
    username: string;
    password: string;
    email: string;

    constructor(
        username:string = 'nomprenom',
        password: string = '********',
        email: string = 'exemple@mail.fr',
    )
    {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}