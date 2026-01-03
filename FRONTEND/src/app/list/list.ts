import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Person } from '../person';
import { PersonService } from '../person.service';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ConfirmDeleteDialogComponent,
  ],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class ListComponent implements OnInit {
  persons: Person[] = [];
  displayedColumns: string[] = ['name', 'age', 'actions'];

  constructor(private personService: PersonService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.personService.getAll().subscribe({
      next: (data) => (this.persons = data),
      error: (err) => console.error(err),
    });
  }

  confirmDelete(p: Person): void {
    const ref = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '420px',
      data: {
        fullName: `${p.firstName ?? ''} ${p.familyName ?? ''}`.trim() || 'wybraną osobę',
      },
    });

    ref.afterClosed().subscribe((result: boolean) => {
      if (result === true) this.delete(p.id);
    });
  }

  private delete(id: number | undefined): void {
    if (id == null) return;

    this.personService.delete(id).subscribe({
      next: () => this.reload(),
      error: (err) => console.error(err),
    });
  }
}
