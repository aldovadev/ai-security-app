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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
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
        data: [480, 430, 448, 470],
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
      icon: 'audit',
      title: 'Visitor',
      background: '#dc143c',
      data: 3000,
    },
    {
      icon: 'team',
      title: 'Employee',
      background: '#32cd32',
      data: 100,
    },
    {
      icon: 'database',
      title: 'Total',
      background: '#0080fe',
      data: 3100,
    },
  ];
  constructor() { }
  ngOnInit(): void { }
}
