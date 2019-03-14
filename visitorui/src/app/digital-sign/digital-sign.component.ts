import { Component,ViewChild, OnInit ,forwardRef} from '@angular/core';  
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice'
import { Router, ActivatedRoute } from '@angular/router'; 
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
 
@Component({
    selector: 'app-digital-sign',
    templateUrl: './digital-sign.component.html',
    styleUrls: ['./digital-sign.component.css'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DigitalSignComponent),
        multi: true,
      }
    ]
  })

  export class DigitalSignComponent implements ControlValueAccessor {
    @ViewChild(SignaturePad) public signaturePad : any;
     private signaturePadOptions:any;



    constructor(private serviceUtil: ServiceUtil, private route: Router, private _route: ActivatedRoute)
    {
      this.signaturePadOptions = { // passed through to szimek/signature_pad constructor
        'minWidth': 1,
        'canvasWidth': 500,
        'canvasHeight': 300
      };
    }


    ngOnInit()
    {
      
    }

    public options: Object = {};

    public _signature: any = null;
  
    public propagateChange: Function = null;
  
    get signature(): any {
      return this._signature;
    }
  
    set signature(value: any) {
      this._signature = value; 
      this.propagateChange(this.signature);
    }
  
    public writeValue(value: any): void {
      if (!value) {
        return;
      }
      this._signature = value;
      this.signaturePad.fromDataURL(this.signature);
    }
  
    public registerOnChange(fn: any): void {
      this.propagateChange = fn;
    }
  
    public registerOnTouched(): void {
      // no-op
    }
  
    public ngAfterViewInit(): void {
    //  this.signaturePad.clear();
    }
  
    public drawBegin(): void { 
    }
  
    public drawComplete(): void {
      this.signature = this.signaturePad.toDataURL('image/jpeg', 0.5);
    }
  
    public clear(): void {
      this.signaturePad.clear();
      this.signature = '';
    } 
   
    drawStart() { 
    }
  }