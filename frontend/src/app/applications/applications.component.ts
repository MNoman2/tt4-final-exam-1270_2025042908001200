import { Component, OnInit } from '@angular/core';
import { Application, ApplicationService } from '../application.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];
  newApplication: Application = { id: 0, company: '', position: '', status: '', appliedDate: '' };
  editing: boolean = false;
  selectedApplicationId: number | null = null;

  constructor(private appService: ApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.appService.getApplications().subscribe(data => {
      this.applications = data;
    });
  }

  saveApplication(): void {
    if (this.editing && this.selectedApplicationId !== null) {
      this.newApplication.id = this.selectedApplicationId;
      this.appService.updateApplication(this.newApplication).subscribe(() => {
        this.resetForm();
        this.loadApplications();
      });
    } else {
      this.appService.addApplication(this.newApplication).subscribe(() => {
        this.resetForm();
        this.loadApplications();
      });
    }
  }

  editApplication(application: Application): void {
    this.editing = true;
    this.selectedApplicationId = application.id;
    this.newApplication = { ...application };
  }

  deleteApplication(id: number): void {
    this.appService.deleteApplication(id).subscribe(() => {
      this.loadApplications();
    });
  }

  resetForm(): void {
    this.editing = false;
    this.selectedApplicationId = null;
    this.newApplication = { id: 0, company: '', position: '', status: '', appliedDate: '' };
  }
}
