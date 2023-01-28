import {Injectable} from '@nestjs/common';
import {Role} from '../entities/role';

@Injectable()
export class RoleBackendService {

    async create(roles: Array<Role>): Promise<Array<Role>> {

        const allRoles = await this.findAll();
        const rolesNotPersist = this.filterRolesThatNotFind(allRoles, roles);

        if (rolesNotPersist.length < 1) {
            return allRoles;
        }
        
        await Role.save(rolesNotPersist);
        rolesNotPersist.concat(rolesNotPersist);

        return rolesNotPersist;
    }

    async findAll(): Promise<Array<Role>> {
        return Role.find();
    }

    private filterRolesThatNotFind(allRoles: Array<Role>, roles: Array<Role>) {
        const rolesNotPersist: Array<Role> = allRoles
            .filter((roleFromDB) =>
                !roles.find(({name}) => roleFromDB.name.toLocaleLowerCase() === name.toLocaleLowerCase()));
        return rolesNotPersist;
    }
}
