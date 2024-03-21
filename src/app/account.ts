export class account {
    id!: string;
    username: string;
    password: string;
    email: string;
    role: string;

    constructor(
        username:string = '',
        password: string = '',
        email: string = '',
        role: string = ''
    )
    {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    accountBuilder(username: string | null, password: string | null, email: string | null, role: string | null) {
        username ? this.username = username : this.username = '';
        password ? this.password = password : this.password = '';
        email ? this.email = email : this.email = '';
        role ? this.role = role : this.role = '';
    }

    public setRole(role: string) {
        return this.role = role;
    }

    public getRole(): string {
        return this.role;
    }
}