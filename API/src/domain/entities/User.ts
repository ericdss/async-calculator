import Entity from "./Entity";

interface UserProps {
    id?: string,
    fullName: string;
    email: string;
    password: string;
    roles: Array<string>;
    creationDateTime?: Date;
}

export class User extends Entity{
    id?: string;
    fullName: string;
    email: string;
    password: string;
    roles: Array<string>;
    creationDateTime: Date;

    constructor({id, fullName, email, password, roles, creationDateTime}: UserProps){
        super();

        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.roles = roles && roles.length > 0 ? roles : ["user"];

        if(!creationDateTime)
            this.creationDateTime = new Date();
        else
            this.creationDateTime = creationDateTime;
    }

}