import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = `${environment.baseUrl}/api/roles`; 

  constructor(private http: HttpClient) { }

  // Fetch all roles
  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new role
  addRole(roleName: string): Observable<any> {
    return this.http.post(this.apiUrl, { name: roleName });
  }

  // Edit a role
  editRole(roleId: string, newRoleName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${roleId}`, { name: newRoleName });
  }

  // Delete a role
  deleteRole(roleId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${roleId}`);
  }
}
