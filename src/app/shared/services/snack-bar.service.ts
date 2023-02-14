import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private readonly snackBar: MatSnackBar) { }

  openSnackBar(message?: string, panelClass?: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }
}
