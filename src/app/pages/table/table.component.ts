import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
// import { tableInterFace } from '../interfaceModel/tableInterface';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['index', 'userName', 'friends', 'influence', 'chirpiness', 'twubricScore', 'date','endDate', 'action'];
  dataSource: MatTableDataSource<any> 
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null; // Initialize to null
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null = null; // Initialize to null


  constructor(private apiService: ApiService, private snackBar: MatSnackBar) { 
    this.dataSource = new MatTableDataSource<any>([]);

  }

  ngOnInit(): void {

    this.getTableInfo()

  }
  getTableInfo() {
    this.apiService.getTableData().subscribe((res:any)=>{
      console.log("res",res)
      this.snackBar.open('successfully!', 'Close', { duration: 2000 });
      this.dataSource = new MatTableDataSource<any>(res);
    if (this.dataSource && this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    },(error:any)=>{
      console.log(error);
      // this.snackBar.open('all user info method fail !!', 'Close', { duration: 2000 });
    })

  }
  editItem(element: any) {
    let bodyUpdate ={}
    // here get id from element.id and pass with api as need body 
    this.apiService.updateUserMethod(element?.id,bodyUpdate).subscribe((res:any)=>{
      if(res.success){
        this.snackBar.open(`${res?.message} | update successfully !`, 'Close', { duration: 2000 });
        this.getTableInfo()
      }
    },(error:any)=>{
      // this.snackBar.open(` ${error?.message} |failed !`, 'Close', { duration: 2000 });
      this.snackBar.open(` failed !`, 'Close', { duration: 2000 });
    })
    

  }

  removeItem(element: any) {
 // here get id from element.id and pass api to remove data based on id
 this.apiService.removeUserMethod(element?.id).subscribe((res:any)=>{
  if(res.success){
    this.snackBar.open(`${res?.message} | delete successfully !`, 'Close', { duration: 2000 });
    this.getTableInfo()
  }
},(error:any)=>{
  this.snackBar.open(` ${error?.message} |failed !`, 'Close', { duration: 2000 });
})  
}

applyFilter(event: any) {
  console.log("filterValue", event.target?.value)
  const filterValue = event.target?.value;
  if (this.dataSource) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

 
}
