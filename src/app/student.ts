export class student {
    id!: number;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;

    constructor(
        name:string = 'Nom et prénom',
        phoneNumber: string = '0123456789',
        email: string = 'exemple@mail.fr',
        address: string = 'Entrez l\'adresse'
    )
    {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
    }

    static empty(): student {
        return new student('', '', '', '');
    }
}