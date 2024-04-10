import {Component, ViewChild} from '@angular/core';
import {FeaturesService} from "../services/features.service";
import {MatPaginator} from "@angular/material/paginator";
import {CommentComponent} from "./comment/comment.component";
import {MatDialog} from "@angular/material/dialog";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frogmi-test-frontend';
  features: any[] = [];
  showTable: boolean = false;
  pageSize: number = 5;
  displayedColumns: string[] = ['id', 'external_id', 'title', 'magnitude', 'place', 'time', 'tsunami', 'mag_type', 'longitude', 'latitude', 'external_url', 'actions'];
  totalResults: number = 0;
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:IDropdownSettings = {};
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(private featuresService: FeaturesService,
              public dialog: MatDialog) {
  }
  ngOnInit() {
    this.dropdownList = [
      { item_id: 'md', item_text: 'md' },
      { item_id: 'ml', item_text: 'ml' },
      { item_id: 'ms', item_text: 'ms' },
      { item_id: 'mw', item_text: 'mw' },
      { item_id: 'me', item_text: 'me' },
      { item_id: 'mi', item_text: 'mi' },
      { item_id: 'mb', item_text: 'mb' },
      { item_id: 'mlg', item_text: 'mlg' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.sendParams()
  }

  sendParams (search: boolean = false): void {
    let params: any = {}
    params = {page: (this.paginator?.pageIndex || 0) + 1, per_page: this.paginator?.pageSize || 5};
    console.log(this.selectedItems.length)

    if(this.selectedItems.length > 0){
      let selected_mag_types: string[] = []
      this.selectedItems.forEach((selected: any) => {
        selected_mag_types.push(selected.item_id)
      })
      params.mag_type = selected_mag_types
    }
    console.log(params)
    this.featuresService.all(params).subscribe((params: any) => {
      this.features = params.data;
      this.totalResults = params.pagination.total
      this.pageSize = params.pagination.per_page
      if(search){
        this.paginator?.firstPage()
      }
      this.showTable = true;
    }, () => {
      this.features = [];
      this.totalResults = 0
      this.showTable = true;
    });
  }
  openModal(id :number) {
    let selected_feature :any
    this.features.forEach((feature: any) => {
      if(feature.id == id){
        selected_feature = feature
      }
    })
    const dialogRef = this.dialog.open(CommentComponent, {
      data: {feature: selected_feature},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result != ""){
        this.featuresService.createComment(result, id).subscribe((result: any) => {
          alert("Comment registered!")
        }, () => {
          alert("Something went wrong!")
        });
      }
    });
  }
}
