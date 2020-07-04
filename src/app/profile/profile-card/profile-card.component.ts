import { ChartModel } from 'src/app/shared/ChartModel.model';
import { Component, OnInit, Input } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill } from 'src/app/shared/skill.model';
import { User } from 'src/app/shared/user.model';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  @Input() inputSkillType: string;

  userData : User = {
    id: 0,
    userId: " ",
    password: " ",
    firstName: " ",
    lastName: " ",
    team: " ",
    genericSkills: [] = [],
    domainSkills: [] = [],
    kbcSkills: [] = []
  }
  userName : String;
  userGenericSkills: Skill[] = [];
  userDomainSkills: Skill[] = [];
  userKbcSkills: Skill[] = [];
  userSkillsArray: Skill[] = [];
  chartOptions: {};
  maxSkillValue: number = 8;
  maxChartWidth: number = 300;
  maxChartHeight: number = 250;
  chartData : ChartModel[] = [];
  qpVariable : string;
  chartTitleText : string;
  chartCategory : string;
  cardSubtitle : string; 

  Highcharts = Highcharts;

  constructor(private datastorageService: DataStorage,
              private router: Router) { }

  ngOnInit() { 
    this.datastorageService.loggedInUser.subscribe(
    users => {
      this.userData = users;
      this.userGenericSkills = this.userData.genericSkills;
      this.userDomainSkills = this.userData.domainSkills;
      this.userKbcSkills = this.userData.kbcSkills;
      switch (this.inputSkillType) {
        case 'Generic Skills': {
          if(this.userGenericSkills === undefined){
            this.chartData = [];
          } else {
            this.fillArray(this.userGenericSkills);
          };  
          this.qpVariable = 'genericSkills';
          this.chartTitleText = 'Your General Skills';
          this.chartCategory = 'General';
          this.cardSubtitle = '(example: Angular, Javascript, Cobol, DB2 etc.,)';
          this.userSkillsArray = this.userGenericSkills;
          this.createSkillsChart();
          break;
        }
        case 'Domain Skills': {
          if(this.userDomainSkills === undefined) {
            this.chartData = [];
          } else {
            this.fillArray(this.userDomainSkills);
          };  
          this.qpVariable = 'domainSkills';
          this.chartTitleText = 'Your Domain Skills';
          this.chartCategory = 'Domain';
          this.cardSubtitle = '(example: Cards, payments, Life Insurance etc.,)';
          this.userSkillsArray = this.userDomainSkills;
          this.createSkillsChart();
          break;
        }
        case 'KBC Skills': {
          if(this.userKbcSkills === undefined) {
            this.chartData = [];
          } else {
            this.fillArray(this.userKbcSkills);  
          };
          this.qpVariable = 'kbcSkills';
          this.chartTitleText = 'Your KBC specific Skills';
          this.chartCategory = 'KBC Skills';
          this.cardSubtitle = '(example: tools like AMB, EGL, IDZ, TOPAZ etc.,)'
          this.userSkillsArray = this.userKbcSkills;
          this.createSkillsChart();
          break;
        }
      }
    }
  );

  }

public onEditClick(toeditSkill : String) {
    this.router.navigate(['/profile',this.userData.id,'edit'],{ queryParams: { skill: toeditSkill}})
}

public fillArray(array : Skill[]) {
 this.chartData = [];
 array.forEach(
   skill => {
     this.chartData.push({
       name : skill.skillName,
       data : [Number(skill.skillLevel)] as any
     })
   }
 ); 
}

public createSkillsChart() {
 this.chartOptions = {
   chart: {
       type: 'bar'
      //  width: this.maxChartWidth,
      //  height: this.maxChartHeight
   },
   title: {
       text: this.chartTitleText
   },
   xAxis: {
       categories: [this.chartCategory],
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
   responsive: {  
    rules: [{  
      condition: {  
        maxWidth: 500  
      },  
      chartOptions: {  
        chart: {
           width: this.maxChartWidth,
           height: this.maxChartHeight
      }  
      }  
    }]  
  },
   series: this.chartData
 }
}

public onComment(form: NgForm) {
  console.log(form.value.inputText);
}
}
