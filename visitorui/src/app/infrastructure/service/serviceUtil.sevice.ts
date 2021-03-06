import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { PARAMETERS } from '@angular/core/src/util/decorators';

const headers = { 'headers': new HttpHeaders({ 'content-type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})

export class ServiceUtil {
  static isShow = false;
  pageSize = 5;
  public authStates = new BehaviorSubject(false);
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  constructor(private title: Title, private httpClient: HttpClient) { }
  public setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  public getData(url: string): Observable<any> {
    return this.httpClient.get(url);
  }
  public postData(url: string, data: any): Observable<any> {
    return this.httpClient.post(url, data, headers);
  }
      
  public putData(url: string, data: any): Observable<any> {
    return this.httpClient.put(url, data);
  }
  public deleteData(url: string) {
    return this.httpClient.delete(url);
  }
  //To upload a file
public uploadExcel(serviceUrl: string,files: string,): Observable<any> {
  const formdata: FormData = new FormData();

  formdata.append('files', files);
    return this.httpClient.post(serviceUrl, formdata, {
    responseType: 'json'
  });
}

public uploadImage(serviceUrl: string, visitorId:string, type:string,image:Blob): Observable<any>
{ 
  var fd = new FormData(document.forms[0]);
  fd.append("x.jpeg", image,"x");
  console.log(image);
  let params = new HttpParams().set('visitorId', visitorId).set("type", type);
  
  let headers = { 'headers': new HttpHeaders({ 'Content-Type': 'multipart/form-data' })};
  return this.httpClient.post(serviceUrl,  fd, {params:params});
}
}