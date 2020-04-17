import { Component, OnInit } from '@angular/core';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { ShippingService } from 'src/app/services/shipping.service';

@Component({
  selector: 'app-create-pdf',
  templateUrl: './create-pdf.component.html',
  styleUrls: ['./create-pdf.component.scss']
})
export class CreatePDFComponent implements OnInit {
  public content: String;

  constructor(
    private _arrival: ArrivalsService,
    private _shipping: ShippingService
  ) { }

  ngOnInit(): void {
    this.createPDF();
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>theBlob;
  }
  public createPDF(): void {
    this._arrival.createPDF().subscribe(res => {
      let file: File = this.blobToFile(res, 'catalogo.pdf');
      this.content = URL.createObjectURL(file);
    }, err => console.error(<any>err));
  }
}
