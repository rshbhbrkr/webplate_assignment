import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar'; // For showing error messages
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // For pagination
import { MatSort, MatSortModule } from '@angular/material/sort'; // For sorting
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserDetailsDialogComponent } from './user-details-dialog/user-details-dialog.component';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,MatTableModule, MatPaginatorModule, MatSortModule,MatPaginatorModule,FormsModule,MatInputModule,MatDialogModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit,OnDestroy {
  searchText: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  users: any[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName','gender', 'email','phone','birthDate','image','edit','details'];
  dataSource!: MatTableDataSource<any>;
  private userSubscription: Subscription = new Subscription();
  constructor(private userService: UsersService, private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public titleService: Title
  ) {
    this.titleService.setTitle("USER LIST - WEBPLAT")
  }

  ngOnInit(): void {
    this.userSubscription.add(
      this.userService.getUsers().subscribe(
        (data) => {
          this.users = data.users; 
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error fetching user data:', error);
          this.snackBar.open('Failed to load users!', 'Close', { duration: 3000 });
        }
      )
    );
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  addUser(): void {
    this.snackBar.open('Add User functionality goes here!', 'Close', { duration: 3000 });
  }

  editUser(user: any): void {
    console.log('Editing user:', user);
  }
  
  viewDetails(user: any): void {
    this.dialog.open(UserDetailsDialogComponent, {
      width: '850px',
      data: user
    });
    console.log('Viewing details for:', user);
   
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    console.log('UsersComponent destroyed');
  }
}