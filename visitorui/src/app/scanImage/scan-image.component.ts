import { Component, OnInit } from '@angular/core'; 
import {ServiceUtil } from '../infrastructure/service/serviceUtil.sevice'
import { Router, ActivatedRoute } from '@angular/router';
import { AppSettings } from '../infrastructure/appsettings';
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service';
import { Subject,Observable } from 'rxjs';
import {WebcamImage} from 'ngx-webcam';

@Component({
    selector: 'app-scan-image',
    templateUrl: './scan-image.component.html',
    styleUrls: ['./scan-image.component.css']
  })

  export class ScanImageComponent implements OnInit {
    public webcamImage: WebcamImage = null;
    private trigger: Subject<void> = new Subject<void>();
    public image: string;
    private visitorId: string;
    private type: string;
    private isAdmin:boolean;

    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceI
    
    constructor(private serviceUtil: ServiceUtil, private route: Router, private _route: ActivatedRoute)
    {
    }
    ngOnInit()
    {
      this.visitorId = this._route.snapshot.params["id"];
      this.type = this._route.snapshot.params["type"];
      let user = JSON.parse(localStorage.getItem('user'));  
      if(user.role.toLowerCase()=='security'){
        this.isAdmin=false;  
      }
      else
      {
        this.isAdmin=true;  
      }
    }
    public get triggerObservable(): Observable<void> {
      return this.trigger.asObservable();  
    }

    public triggerSnapshot(): void {
      this.trigger.next(); 
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
      return new Blob([ia], {type:mimeString});
  }
    
    public handleImage(webcamImage: WebcamImage): void {
      this.webcamImage = webcamImage;
    
    }

    public next() {
      let image = this.dataURItoBlob(this.webcamImage.imageAsDataUrl);
      
      this.serviceUtil.uploadImage(AppSettings.base_url + ServiceUrl.visitorImage, this.visitorId, this.type,image)
      .subscribe(
        response => {
          this.route.navigate(['/visitor/digitalSign', this.visitorId,"signature"]);
        });

    }
  }