interface UserDTO {
    id?: string;
    fullName: string;
    email: string;
    password: string;
    roles: Array<string>;
}

export default UserDTO;