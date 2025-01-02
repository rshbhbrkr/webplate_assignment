import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstantDefault } from '../constant-default';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'; // Optional: for showing error messages

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string = ConstantDefault.API_URL + 'users';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  // Get all users
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        this.handleError(error);
        throw error; // Rethrow the error
      })
    );
  }

  private handleError(error: any): void {
    if (error.status === 404) {
      this.snackBar.open('User not found!', 'Close', { duration: 3000 });
    } else if (error.status === 500) {
      this.snackBar.open('Server error! Please try again later.', 'Close', { duration: 3000 });
    } else {
      this.snackBar.open('An unexpected error occurred!', 'Close', { duration: 3000 });
    }
  }
}
