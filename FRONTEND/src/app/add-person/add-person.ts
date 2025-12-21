import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-person.html',
  styleUrl: './add-person.css',
})
export class AddPersonComponent {
  person: Person = {
    address: {},
  };

  constructor(private personService: PersonService, private router: Router) {}

  save(): void {
    this.personService.add(this.person).subscribe({
      next: () => this.router.navigateByUrl(''),
      error: (err) => console.error(err),
    });
  }

}
