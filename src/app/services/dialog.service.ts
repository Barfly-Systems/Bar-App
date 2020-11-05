import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';



@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private sidenav: MatSidenav;

  constructor(public dialog: MatDialog) { }

  // openDialog = (productId: number, organisationId: number) => {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.data = {
  //     productId: productId,
  //     organisationId: organisationId
  //   }

  //   const dialogRef = this.dialog.open(ProductComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //   })
  // }

  openAbandonBasketDialog = (pubName: string) => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pubName: pubName
    }

    const dialogRef = this.dialog.open(EmptyBasketComponent, dialogConfig);

    return dialogRef.afterClosed();
  }

  openTableSelectDialog = () => {
    const dialogRef = this.dialog.open(TableSelectComponent, {
      width: '100%'
    });
    return dialogRef.afterClosed();
  }

  setSidenav = (sidenav: MatSidenav) => {
    this.sidenav = sidenav;
  }

  openSidenav = () => {
    return this.sidenav.open();
  }

  closeSidenav = () => {
    return this.sidenav.close();
  }

  toggleSidenav = () => {
    this.sidenav.toggle();
  }
}
