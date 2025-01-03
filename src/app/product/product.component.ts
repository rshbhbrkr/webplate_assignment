import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar'; // For showing error messages
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // For pagination
import { MatSort, MatSortModule } from '@angular/material/sort'; // For sorting
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../services/product/product.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { LoadingButtonComponent } from '../loading-button/loading-button.component';

@Component({
  selector: 'app-product',
  standalone: true,
   imports: [CommonModule,MatTableModule, MatPaginatorModule, MatSortModule,MatPaginatorModule,FormsModule,MatInputModule,LoadingButtonComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit,OnDestroy {
  searchText: string = '';
  show_loading_image:boolean=false;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  users: any[] = [];
  displayedColumns: string[] = ['id', 'title', 'description','category', 'price','image'];
  dataSource!: MatTableDataSource<any>;

  constructor(private ProductService: ProductService, private snackBar: MatSnackBar, public titleService: Title
      ) {
        this.titleService.setTitle("PRDOUCT LIST - WEBPLAT");
      }
 private userSubscription: Subscription = new Subscription();
  ngOnInit(): void {
    this.show_loading_image=true;
    this.userSubscription.add(
    this.ProductService.getProduct().subscribe(
      (data) => {
        this.show_loading_image=false;
        this.users = data.products; 
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        this.show_loading_image=false;
        this.snackBar.open('Failed to load users!', 'Close', { duration: 3000 });
      }
    )
  );
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  editUser(user: any): void {
    console.log('Editing user:', user);
  }
  
  viewDetails(user: any): void {
    console.log('Viewing details for:', user);
    this.snackBar.open('Update functionality is temporarily unavailable.', 'Close', { duration: 3000 });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    console.log('UsersComponent destroyed');
  }

 
  getTruncatedDescription(user: any): string {
    const wordLimit = 14; 
    const words = user.description.split(' '); 
    const truncated = words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');

    return user.isReadMore ? user.description : truncated;
  }

  shouldShowViewMore(user: any): boolean {
    const wordLimit = 14; 
    const words = user.description.split(' '); 
    return words.length > wordLimit; 
  }

  toggleText(user: any): void {
    user.isReadMore = !user.isReadMore;
  }
}
