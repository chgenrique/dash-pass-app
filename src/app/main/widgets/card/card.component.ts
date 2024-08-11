import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  @Input('label') label: string;
  @Input('total') total: string;
  @Input('percentage') percentage: string;
  @Input('data') data: [any];

  chart: Chart;

  constructor() { }
}
