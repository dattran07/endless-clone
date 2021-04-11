import { Component, OnInit } from '@angular/core';
import { Feature } from './model/feature-model';
import { VersionContent } from './model/version-content-model';
import { HomeService } from './service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  features: Feature[] = []; 
  onHover: boolean = false;

  constructor(
    private homeService: HomeService
  ) { }

  appendLeadingZero(stepNumber: string) {
    return "0" + stepNumber;
  }

  sortAndRemoveVersionContent(content: VersionContent[]) {
    if(content.length > 1) {
      content.sort((a, b) => new Date(a.effectiveDate).getTime() - new Date(b.effectiveDate).getTime());
      return content.splice(0, content.length - 1);
    }
    return content;
  }
  
  toggleOnHover() {
    this.onHover = !this.onHover;
  }

  ngOnInit(): void {
    this.homeService.getData().subscribe(
      res => {
        this.features = res;
        this.features.sort((a, b) => parseInt(a.stepNumber) - parseInt(b.stepNumber))
        
        for(let i = 0; i < this.features.length; i++) {
          this.features[i].stepNumber = this.appendLeadingZero(this.features[i].stepNumber);
          this.sortAndRemoveVersionContent(this.features[i].versionContent);
        }
      }
    );
  }

}
