import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { UserData } from 'src/app/models/user-data';
import { AccountService } from 'src/app/services/account.service';

// Ctrl + Alt + Arrow Keys
// Ctrl+Shift+L

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.css']
})
export class AccountTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'userName', 'email', 'action'];
  dataSource: MatTableDataSource<Account>;
  resultsLength = 0;

  //@ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  accounts: Account[] = [];

  constructor(
    private accountsService: AccountService, 
    private cdr: ChangeDetectorRef, 
    private router: Router) 
  {
    // Assign the data to the data source for the table to render

    //this.accountsService.getAllContacts().subscribe(accounts => this.accounts = accounts);
  }


  ngOnInit(): void {
    //this.dataSource = new MatTableDataSource(this.accounts);
  }


  ngAfterViewInit() {
    this.accountsService.getAllContacts().subscribe(accounts => {
      this.accounts = accounts;
      this.dataSource = new MatTableDataSource(this.accounts);
      this.cdr.detectChanges();

      setTimeout(() => this.dataSource.paginator = this.paginator);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
      // If the user changes the sort order, reset back to the first page.
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
      this.resultsLength = this.accounts.length;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit() {
    //e.stopPropagation();
    console.log('edit');
  }

  onClickAction(id: string) {
    //alert(`click ${item}`);
    this.router.navigate([`/accounts/details/${id}`]);
  }
}
