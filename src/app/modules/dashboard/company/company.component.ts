import { Component, ViewChild, OnInit } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

export type barOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ChartOptions = {
    series: [
      {
        name: 'Finished',
        data: [31, 40, 28, 51, 42, 109, 100, 90, 110, 120, 125, 110],
      },
      {
        name: 'Rejected',
        data: [11, 32, 45, 32, 34, 52, 41, 31, 40, 28, 51, 42],
      },
    ],
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-01-01T00:00:00.000Z',
        '2018-02-01T01:30:00.000Z',
        '2018-03-01T02:30:00.000Z',
        '2018-04-01T03:30:00.000Z',
        '2018-05-01T04:30:00.000Z',
        '2018-06-01T05:30:00.000Z',
        '2018-07-01T06:30:00.000Z',
        '2018-08-01T06:30:00.000Z',
        '2018-09-01T06:30:00.000Z',
        '2018-10-01T06:30:00.000Z',
        '2018-11-01T06:30:00.000Z',
        '2018-12-01T06:30:00.000Z',
      ],
    },
    tooltip: {
      x: {
        format: 'MM/yyyy',
      },
    },
  };

  public barOptions: barOptions = {
    series: [
      {
        name: 'basic',
        data: [400, 430, 448, 470],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Incoming', 'Accepted', 'Rejected', 'Finished'],
    },
  };

  totalData: any[] = [
    {
      icon: 'fe fe-users',
      title: 'Visitor',
      background: 'yellow',
      data: 3000,
    },
    {
      icon: 'fe fe-user',
      title: 'Employee',
      background: 'green',
      data: 100,
    },
    {
      icon: 'fe fe-database',
      title: 'Total',
      background: 'blue',
      data: 3100,
    },
  ];
  constructor() {}
  ngOnInit(): void {}
}
