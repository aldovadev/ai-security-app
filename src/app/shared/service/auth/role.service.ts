import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private userRoles: string[] = [];
  constructor() {}

  setUserRoles(roles: string[]): void {
    this.userRoles = roles;
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  getRole(): string {
    return this.userRoles[0];
  }
}
