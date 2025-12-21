import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class ListComponent implements OnInit {
  persons: Person[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.personService.getAll().subscribe({
      next: (data) => (this.persons = data),
      error: (err) => console.error(err),
    });
  }

  delete(id: number | undefined): void {
    if (id == null) return;

    this.personService.delete(id).subscribe({
      next: () => this.reload(),
      error: (err) => console.error(err),
    });
  }
}
