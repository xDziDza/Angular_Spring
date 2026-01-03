import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Potwierdź usunięcie</h2>

    <div mat-dialog-content>
      Czy na pewno chcesz usunąć: <strong>{{ data.fullName }}</strong>?
    </div>

    <div mat-dialog-actions align="end">
      <button mat-stroked-button (click)="close(false)">Anuluj</button>
      <button mat-raised-button class="danger-btn" (click)="close(true)">Usuń</button>
    </div>
  `,
})
export class ConfirmDeleteDialogComponent {
  constructor(
    private ref: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fullName: string }
  ) {}

  close(result: boolean): void {
    this.ref.close(result);
  }
}
