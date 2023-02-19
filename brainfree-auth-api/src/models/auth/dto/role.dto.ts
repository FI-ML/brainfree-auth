export class RoleDto {
    id: number;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    name: string;
}
