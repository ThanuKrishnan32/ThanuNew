import { ChartModel } from 'src/app/shared/models/ChartModel.model';
import { Component, OnInit, Input } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { NgForm } from '@angular/forms';
import { Paths } from 'src/app/constants/paths';
import { ProfileCard } from 'src/app/constants/profileCardConstant';
import { Router } from '@angular/router';
import { Skill } from 'src/app/shared/models/skill.model';
import { User } from 'src/app/shared/models/user.model';
import { Variables } from 'src/app/constants/variables';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  @Input() inputSkillType: string;

  public userData : User = {
    id: 0,
    userId: Variables.emptyString,
    password: Variables.emptyString,
    firstName: Variables.emptyString,
    lastName: Variables.emptyString,
    team: Variables.emptyString,
    genericSkills: [] = [],
    domainSkills: [] = [],
    kbcSkills: [] = []
  }
  public userName : String;
  public userGenericSkills: Skill[] = [];
  public userDomainSkills: Skill[] = [];
  public userKbcSkills: Skill[] = [];
  public userSkillsArray: Skill[] = [];
  public chartOptions: {};
  public maxSkillValue: number = 8;
  public maxChartWidth: number = 300;
  public maxChartHeight: number = 250;
  public chartData : ChartModel[] = [];
  public qpVariable : string;
  public chartTitleText : string;
  public chartCategory : string;
  public cardSubtitle : string; 
  public inputText = ' ';

  public Highcharts = Highcharts;

  public constructor(private _datastorageService: DataStorage,
                     private _router: Router) { }

  public ngOnInit(): void { 
    this._datastorageService.loggedInUser.subscribe(
    users => {
      this.userData = users;
      this.userGenericSkills = this.userData.genericSkills;
      this.userDomainSkills = this.userData.domainSkills;
      this.userKbcSkills = this.userData.kbcSkills;
      switch (this.inputSkillType) {
        case ProfileCard.caseGS: {
          if(this.userGenericSkills === undefined){
            this.chartData = [];
          } else {
            this.fillArray(this.userGenericSkills);
          };  
          this.qpVariable = ProfileCard.qpVGS;
          this.chartTitleText = ProfileCard.cttGS;
          this.chartCategory = ProfileCard.ccGS;
          this.cardSubtitle = ProfileCard.csGS;
          this.userSkillsArray = this.userGenericSkills;
          this.createSkillsChart();
          break;
        }
        case ProfileCard.caseDS: {
          if(this.userDomainSkills === undefined) {
            this.chartData = [];
          } else {
            this.fillArray(this.userDomainSkills);
          };  
          this.qpVariable = ProfileCard.qpVDS;
          this.chartTitleText = ProfileCard.cttDS;
          this.chartCategory = ProfileCard.ccDS;
          this.cardSubtitle = ProfileCard.csDS;
          this.userSkillsArray = this.userDomainSkills;
          this.createSkillsChart();
          break;
        }
        case ProfileCard.caseKS: {
          if(this.userKbcSkills === undefined) {
            this.chartData = [];
          } else {
            this.fillArray(this.userKbcSkills);  
          };
          this.qpVariable = ProfileCard.qpVKS;
          this.chartTitleText = ProfileCard.cttKS;
          this.chartCategory = ProfileCard.ccKS;
          this.cardSubtitle = ProfileCard.csKS
          this.userSkillsArray = this.userKbcSkills;
          this.createSkillsChart();
          break;
        }
      }
    }
  );

  }

public onEditClick(toeditSkill : String): void {
    this._router.navigate(['/' + Paths.Profile,this.userData.id,Paths.Edit],{ queryParams: { skill: toeditSkill}})
}

public fillArray(array : Skill[]): void {
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

public createSkillsChart(): void {
 this.chartOptions = {
   chart: {
       type: ProfileCard.chartType
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
           text: ProfileCard.titleText,
           align: ProfileCard.titleAlign
       },
       labels: {
           overflow: ProfileCard.labelOverFlow
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

// public onComment(form: NgForm): void {
//   console.log(form.value.inputText);
//   this.inputText = ' ';
// }
}
