import { Component, ViewChildren, QueryList, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DigitalSignComponent } from '../digital-sign/digital-sign.component';
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice'
import { Router, ActivatedRoute } from '@angular/router';
import { AppSettings } from '../infrastructure/appsettings';
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service';

@Component({
    selector: 'app-signature',
    templateUrl: './signature.component.html',
    styleUrls: ['./signature.component.css']
})

export class SignatureComponent implements OnInit {
        public form: FormGroup;
        private visitorId: string;
        private type: string;

    @ViewChildren(DigitalSignComponent) public sigs: QueryList<DigitalSignComponent>;
    @ViewChildren('sigContainer1') public sigContainer1: QueryList<ElementRef>;

    constructor(fb: FormBuilder, private serviceUtil: ServiceUtil, private route: Router, private _route: ActivatedRoute) {

        this.form = fb.group({
            signatureField1: ['', Validators.required]
        });
    }

    ngOnInit()
    {
        this.visitorId = this._route.snapshot.params["id"];
        this.type = this._route.snapshot.params["type"];
    }

    public ngAfterViewInit() {
        this.beResponsive();
        this.setOptions();
    }

    // set the dimensions of the signature pad canvas
    public beResponsive() {
        console.log('Resizing signature pad canvas to suit container size');
        this.size(this.sigContainer1.first, this.sigs.first);
    }

    public size(container: ElementRef, sig: DigitalSignComponent) {
        sig.signaturePad.set('canvasWidth', container.nativeElement.clientWidth);
        sig.signaturePad.set('canvasHeight', container.nativeElement.clientHeight);
    }

    public setOptions() {
        this.sigs.first.signaturePad.set('penColor', 'rgb(255, 0, 0)');
    }


    public dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    }

    public submit() {
        let image = this.dataURItoBlob(this.sigs.first.signature);

        this.serviceUtil.uploadImage(AppSettings.base_url + ServiceUrl.visitorImage, this.visitorId, this.type, image)
            .subscribe(
                response => {
                    this.route.navigate(['/visitor']);
                });
    }
    
    public clear() {
        this.sigs.first.clear();
    }
}