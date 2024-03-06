export class student {
    id!: number;
    name: string;
    phoneNumber: number;
    email: string;
    address: string;

    constructor(
        name:string = 'Nom et prénom',
        phoneNumber: number = 123456789,
        email: string = 'exemple@mail.fr',
        address: string = 'Entrez l\'adresse'
    )
    {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
    }
}