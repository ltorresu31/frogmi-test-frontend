import {Component, ViewChild} from '@angular/core';
import {FeaturesService} from "./services/features.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frogmi-test-frontend';
  dtOptions: DataTables.Settings = {};
  features: any[] = [];
  showTable: boolean = false;
  pageSize: number = 5;
  displayedColumns: string[] = ['id', 'external_id', 'magnitude', 'place', 'time', 'tsunami', 'mag_type', 'longitude', 'latitude', 'external_url', 'actions'];
  totalResults: number = 0
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(private featuresService: FeaturesService) {
  }
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ordering:true,
      lengthMenu:['5','10','20'],
      responsive: true,
    };
    this.sendParams()
  }

  sendParams (): void {
    let params: any = {}
    params = {page: (this.paginator?.pageIndex || 0) + 1, per_page: this.paginator?.pageSize || 5};
    console.log(this.paginator?.pageIndex)
    this.featuresService.all(params).subscribe((params: any) => {
      this.features = params.data;
      this.totalResults = params.pagination.total
      this.pageSize = params.pagination.per_page
      this.showTable = true;
    }, () => {
      this.features = [];
      this.totalResults = 0
      this.showTable = true;
    });
  }
}

export interface Features {
  id: string;
  name: string;
  progress: string;
  color: string;
}
