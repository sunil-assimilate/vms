import swal from 'sweetalert2';

export class CommonUtil {
  // To handle errors   
  public static handleError(error: any) {
    if (error.status === 401) {
      swal.fire({ type: 'error', text: 'Session has been expired , please login again' }).then(value => {
        // this.authService.logout();
      });
    } else {
      swal.fire({ type: 'error', text: "An error occured. Please contact to admin" });
    }
  }

}