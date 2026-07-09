import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { users } from './data';
@Injectable({
    providedIn: 'root'
})

export class UserPermissionService {

    constructor(private _http: HttpClient) { }


    static fnGetReadPermissions(screenId: number): boolean {
        let userId = JSON.parse(localStorage.getItem('userId'));
        let user = users.find(x => x.userId == userId);
        if (!user || !user.permissions) return false;
        const permission = user.permissions.find(x => x.screenId == screenId);
        return !!permission?.canRead;
    }

    static fnGetCreatePermissions(screenId: number): boolean {
        let userId = JSON.parse(localStorage.getItem('userId'));
        let user = users.find(x => x.userId == userId);
        if (!user || !user.permissions) return false;
        const permission = user.permissions.find(x => x.screenId == screenId);
        return !!permission?.canCreate;
    }

    static fnGetUpdatePermissions(screenId: number): boolean {
        let userId = JSON.parse(localStorage.getItem('userId'));
        let user = users.find(x => x.userId == userId);
        if (!user || !user.permissions) return false;
        const permission = user.permissions.find(x => x.screenId == screenId);
        return !!permission?.canUpdate;
    }

    static fnGetDeletePermissions(screenId: number): boolean {
        let userId = JSON.parse(localStorage.getItem('userId'));
        let user = users.find(x => x.userId == userId);
        if (!user || !user.permissions) return false;
        const permission = user.permissions.find(x => x.screenId == screenId);
        return !!permission?.canDelete;
    }

    static fnGetUserModuleMenu(): any {
        let userId = JSON.parse(localStorage.getItem('userId'));
        if (!userId)
            return []
        return users.find(x => x.userId == userId).permissions.filter(x => x.canRead).map(x => x.moduleId)
    }
    static fnGetUserSubMenu(): Array<number> {
        let userId = JSON.parse(localStorage.getItem('userId'));
        if (!userId)
            return []
        return users.find(x => x.userId == userId).permissions.filter(x => x.canRead).map(x => x.menuId)
    }

}