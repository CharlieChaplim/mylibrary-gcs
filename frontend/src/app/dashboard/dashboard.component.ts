import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Dashboard } from '../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard?: Dashboard;
  constructor(private api: ApiService) {}
  ngOnInit(): void { this.carregar(); }
  carregar(): void { this.api.dashboard().subscribe(d => this.dashboard = d); }
}
