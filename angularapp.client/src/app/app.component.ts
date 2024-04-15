import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  myFunc(input: HTMLInputElement) {
    console.log("inputval=" + input.value);
    var num1 = ((document.getElementById("exchageRateDate") as HTMLInputElement).value);
    console.log(num1);
  }
  createJob() {
    let job = {
      title: ((document.getElementById("title") as HTMLInputElement).value),
      description: ((document.getElementById("description") as HTMLInputElement).value)
    }
    this.http.post('/weatherforecast', job)
      .subscribe(response => {
        console.log(response.toString());
      });

  }

  title = 'angularapp.client';
}
