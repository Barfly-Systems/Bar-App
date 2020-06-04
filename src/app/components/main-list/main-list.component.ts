import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Order } from './../../models/order.model';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss']
})
export class MainListComponent implements OnInit, OnChanges {
  

  columnsToDisplay = ['ID', 'Table', 'Qty', 'Total', 'Time', 'Issue', 'Status'];
  expandedElement: Order | null;

  @Input() orderList: Order[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
  }
}
