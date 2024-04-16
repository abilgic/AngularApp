import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
interface Job {
  id: number
  title: string;
  description: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  public jobs: Job[] = [];
  public editmode = false;

  title = new FormControl('title');
  description = new FormControl('description');
  btnSave = new FormControl('btnSave');
  btnUpdate = new FormControl('btnUpdate');

  public apiUrl: string = '/weatherforecast';
  isShowSaveBtn = false;
  isShowUpdateBtn = false;

  toggleDisplaySaveBtn() {
    this.isShowSaveBtn = true;
    this.isShowUpdateBtn = false;
    (document.getElementById("jobModalLabel") as HTMLInputElement).innerHTML = "Save Job";
  }

  toggleDisplayUpdateBtn() {
    this.isShowUpdateBtn = true;
    this.isShowSaveBtn = false;
    (document.getElementById("jobModalLabel") as HTMLInputElement).innerHTML = "Update Job";
  }
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    /* this.getForecasts();*/
    this.getJobs();
  }

  //getForecasts() {
  //  this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
  //    (result) => {
  //      this.forecasts = result;
  //    },
  //    (error) => {
  //      console.error(error);
  //    }
  //  );
  //}
  getJobs() {

    this.http.get<Job[]>('/weatherforecast').subscribe(
      (result) => {
        this.jobs = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getJob(val: any) {
    //this.isShowSaveBtn = false;
    //this.isShowUpdateBtn = true;
    (document.getElementById("jobModalLabel") as HTMLInputElement).innerHTML = "Update Job";
    this.http.get<Job>(this.apiUrl + '/' + val).subscribe(
      (result) => {
        (document.getElementById("jobid") as HTMLInputElement).value = result.id.toString();
        (document.getElementById("title") as HTMLInputElement).value = result.title;
        (document.getElementById("description") as HTMLInputElement).value = result.description;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updateJob() {

    let job = {
      id: (document.getElementById("jobid") as HTMLInputElement).value,
      title: ((document.getElementById("title") as HTMLInputElement).value),
      description: ((document.getElementById("description") as HTMLInputElement).value)
    }
    return this.http.put('/weatherforecast', job).subscribe(response => {
      if (response) {
        alert("Job is Updated");
      }
      else {
        alert("job is not updated");
      }
    });
  }


  deleteJob(val: any) {
    return this.http.delete(this.apiUrl + '/' + val).subscribe(response => {
      if (response) {
        alert("Job is deleted");

      }
      else {

        alert("job is not deleted");
      }
    });
  }

  createJob() {
    let job = {
      title: ((document.getElementById("title") as HTMLInputElement).value),
      description: ((document.getElementById("description") as HTMLInputElement).value)
    }
    this.http.post('/weatherforecast', job)
      .subscribe(response => {
        if (response) {
          alert("Job is Saved");
        }
        else {
          alert("job is not saved");
        }
      });

  }


}
