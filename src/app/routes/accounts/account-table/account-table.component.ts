import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['id', 'title', 'userName', 'email'];
  dataSource: MatTableDataSource<Account>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  accounts: Account[] = [];

  constructor(private accountsService: AccountService) {
    // Assign the data to the data source for the table to render

    //this.accountsService.getAllContacts().subscribe(accounts => this.accounts = accounts);
  }


  ngOnInit(): void {
    this.accountsService.getAllContacts().subscribe(accounts => {
      this.accounts = accounts;
      this.dataSource = new MatTableDataSource(this.accounts);
    });

    //this.dataSource = new MatTableDataSource(this.accounts);
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
