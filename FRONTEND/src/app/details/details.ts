import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class DetailsComponent implements OnInit, OnDestroy {
  person: Person | null = null;
  id: number | null = null;

  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (!Number.isInteger(id) || id < 1) {
        this.person = null;
        return;
      }

      this.personService.getById(id).subscribe({
        next: (p) => (this.person = p),
        error: () => (this.person = null),
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
