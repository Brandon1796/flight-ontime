import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-documentation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-documentation.component.html',
  styleUrl: './api-documentation.component.css'
})
export class ApiDocumentationComponent {
  apiBaseUrl = 'http://localhost:8080';
}