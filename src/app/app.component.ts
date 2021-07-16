import { Component, OnInit } from '@angular/core';
import { base64 } from 'src/assets/placeholder-base64';
import { ApiMethods, HttpService, Serializers } from './http/http.service';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  image: string = base64;
  mail: string = 'jochemb@live.nl';
  constructor(
    private httpService: HttpService,
    private networkService: NetworkService
  ) {}
  ngOnInit(): void {
    this.networkService.startListening({
      toastOnConnectionLost: true,
      toastOnConnectionMade: false,
    });
  }

  login() {
    this.httpService
      .request<any>(ApiMethods.POST, `/api/login`, {
        data: new FormData(),
        serializer: Serializers.MULTIPART,
      })
      .subscribe((res) => console.log(res));
  }
}
