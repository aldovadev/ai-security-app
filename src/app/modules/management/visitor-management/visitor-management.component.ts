import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { statusId } from 'src/app/models/visitor.model';
import { VisitorManagementService } from 'src/app/shared/service/visitor/visitor-management.service';

type response = {
  message: string;
  data: statusId[];
};

@Component({
  selector: 'app-visitor-management',
  templateUrl: './visitor-management.component.html',
  styleUrls: ['./visitor-management.component.scss'],
})
export class VisitorManagementComponent implements OnInit {
  constructor(
    private visitorManagementService: VisitorManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  activeTab: number = 0;
  incomingCount: number = 0;
  acceptedCount: number = 0;
  rejectedCount: number = 0;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.activeTab = params['tab'] || 0;
      // Use activeTab to determine the active tab index
      // Example: set this.activeTabIndex based on activeTab value
      // this.activeTabIndex = determineTabIndex(activeTab);
    });
    this.fetchStatusId();
    this.fetchData();
  }

  fetchStatusId(): void {
    this.visitorManagementService.getStatusId().subscribe(
      (res: response) => {
        res.data.forEach((item) => {
          this.visitorManagementService.status[item.statusName] = item.statusId;
        });
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  fetchData(): void {
    setInterval(() => {
      this.incomingCount = this.visitorManagementService.incomingData;
      this.acceptedCount = this.visitorManagementService.acceptedData;
      this.rejectedCount = this.visitorManagementService.rejectedData;
    }, 100);
  }

  onTabClick(tabIndex: number): void {
    // Add or update the 'activeTab' query parameter with the selected tab index.
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tabIndex },
      queryParamsHandling: 'merge', // Keep existing query parameters
    });
  }
}
