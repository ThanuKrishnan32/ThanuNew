import { Component, OnInit } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { User } from 'src/app/shared/user.model';
import { Skill } from 'src/app/shared/skill.model';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ChartModel } from 'src/app/shared/ChartModel.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetLegendComponent } from 'src/app/shared/bottomsheet-legend.component';

@Component({
  selector: 'app-active-profile',
  templateUrl: './active-profile.component.html',
  styleUrls: ['./active-profile.component.css']
})
export class ActiveProfileComponent implements OnInit {  

  userData : User = {
    id: 0,
    userId: " ",
    password: " ",
    firstName: " ",
    lastName: " ",
    team: " ",
    genericSkills: [],
    domainSkills: [],
    kbcSkills: []
  }
  userName : String;
  userGenericSkills: Skill[];
  userDomainSkills: Skill[];
  userKbcSkills: Skill[];
  genericChartOptions: {};
  domainChartOptions: {};
  kbcSkillChartOptions: {};
  maxSkillValue: number = 8;
  maxChartWidth: number = 325;
  chartData : ChartModel[] = [];
   

  Highcharts = Highcharts;

  constructor(private datastorageService: DataStorage,
              private router: Router,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
       this.datastorageService.loggedInUser.subscribe(
         users=>{
           this.userData = users;
           this.userGenericSkills = this.userData.genericSkills;
           this.userDomainSkills = this.userData.domainSkills;
           this.userKbcSkills = this.userData.kbcSkills;
           this.fillArray(this.userGenericSkills);
           this.createGenericSkillsChart();
           this.fillArray(this.userDomainSkills);
           this.createDomainSkillsChart();
           this.fillArray(this.userKbcSkills);
           this.createKbcSkillsChart();
         }
       );
  }

  onEditClick(toeditSkill : String){
       this.router.navigate(['/profile',this.userData.id,'edit'],{ queryParams: { skill: toeditSkill}})
  }

  fillArray(array : Skill[]){
    this.chartData = [];
    array.forEach(
      skill =>{
        this.chartData.push({
          name : skill.skillName,
          data : [Number(skill.skillLevel)] as any
        })
      }
    ); 
  }

  openBottomLegendSheet(): void{
    this.bottomSheet.open(BottomSheetLegendComponent);
  }

  createGenericSkillsChart(){
    this.genericChartOptions = {
      chart: {
          type: 'bar',
          width: this.maxChartWidth
      },
      title: {
          text: 'Your General Skills'
      },
      xAxis: {
          categories: ['General'],
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          max: this.maxSkillValue,
          tickInterval: 1,
          title: {
              text: 'Skill Level',
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          reversed: true
      },
      credits: {
          enabled: false
      },
      series: this.chartData
    }
  }

  createDomainSkillsChart(){
    this.domainChartOptions = {
      chart: {
          type: 'bar',
          width: this.maxChartWidth
      },
      title: {
          text: 'Your Domain Skills'
      },
      xAxis: {
          categories: ['Domain'],
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          max: this.maxSkillValue,
          tickInterval: 1,
          title: {
              text: 'Skill Level',
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          reversed: true
      },
      credits: {
          enabled: false
      },
      series: this.chartData
    }
  }
  createKbcSkillsChart(){
    this.kbcSkillChartOptions = {
      chart: {
          type: 'bar',
          width: this.maxChartWidth
      },
      title: {
          text: 'Your KBC specific Skills'
      },
      xAxis: {
          categories: ['KBC specific'],
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          max: this.maxSkillValue,
          tickInterval: 1,
          title: {
              text: 'Skill Level',
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          reversed: true
      },
      credits: {
          enabled: false
      },
      series: this.chartData
    }
  }
}
