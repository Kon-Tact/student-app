export class account {
    id!: string;
    username: string;
    password: string;
    email: string;
    role: string;
    roleB: boolean;

    constructor(
        username:string = '',
        password: string = '',
        email: string = '',
        role: string = '',
    )
    {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.roleB = role.includes("ADMIN");
    }
}