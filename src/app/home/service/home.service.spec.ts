import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HomeService } from './home.service';
import { Feature } from '../model/feature-model';
import { VersionContent } from '../model/version-content-model';


const testData: Feature[] = [
  {
    id: 'd11b10ba-1cd8-48f8-93eb-454b716fd5a0',
    stepNumber: '2',
    versionContent: [
      {
        title: 'Request A Delivery',
        body:
          'Once you’re ready for your first delivery, all it takes is a click to get your shipment on the way.',
        effectiveDate: '2019-05-04T03:04:05.000Z',
      },
      {
        title: 'We Deliver',
        body:
          'Once you’re ready for your first delivery, all it takes is a click to get your shipment on the way.',
        effectiveDate: '2019-04-04T05:04:05.000Z',
      },
    ],
  },
  {
    id: 'dce2554e-00dc-45c1-99c1-93a554d7eba7',
    stepNumber: '4',
    versionContent: [
      {
        title: 'Request Another Delivery',
        body:
          'Get your next gaming fix by updating your profile then initiating your next shipment.',
        effectiveDate: '2019-05-20T03:04:05.000Z',
      },
    ],
  },
  {
    id: '422e6b50-9c5a-43d5-90cb-839f4678cb75',
    stepNumber: '3',
    versionContent: [
      {
        title: 'Keep What You Like',
        body:
          'Tell us “no” by returning any unwanted products in the enclosed packaging.',
        effectiveDate: '2019-04-04T03:04:05.000Z',
      },
      {
        title: 'Keep What You Want',
        body:
          'Tell us “no thanks” by returning any unwanted products in the enclosed packaging.',
        effectiveDate: '2019-04-04T05:04:05.000Z',
      },
      {
        title: 'Keep Everything',
        body:
          'Tell us “no thanks” by returning any unwanted products in the enclosed packaging.',
        effectiveDate: '2019-02-04T08:04:05.000Z',
      },
    ],
  },
  {
    id: 'd9a439d0-8dbf-4bab-8e08-626f8194a075',
    stepNumber: '1',
    versionContent: [
      {
        title: 'Fill Out a Profile',
        body:
          'We only want you to get games and gear that you’ll love, so we’ll ask for your preferences up front.',
        effectiveDate: '2019-05-20T03:04:05.000Z',
      },
    ],
  },
]

const sortAndRemoveVersionContent = (content: VersionContent[]) => {
  if(content.length > 1) {
    content.sort((a, b) => new Date(a.effectiveDate).getTime() - new Date(b.effectiveDate).getTime());
    return content.splice(0, content.length - 1);
  }
  return content;
}

describe('HomeService', () => {
  let service: HomeService;
  let httpTestCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService],
    });
    service = TestBed.inject(HomeService);
    httpTestCtrl = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all data from the api', () => {
    service.getData().subscribe(features=> {
      
      expect(testData).toBe(features);

      features.sort((a, b) => parseInt(a.stepNumber) - parseInt(b.stepNumber))
      expect(features[0].stepNumber).toEqual("1");
      expect(features[1].stepNumber).toEqual("2");
      expect(features[2].stepNumber).toEqual("3");
      expect(features[3].stepNumber).toEqual("4");

      
      for(let i = 1; i < 3; i++) {
        sortAndRemoveVersionContent(features[i].versionContent);
      }
      expect(features[1].versionContent.length).toEqual(1);
      expect(features[1].versionContent[0].title).toEqual("Request A Delivery");
      expect(features[2].versionContent.length).toEqual(1);
      expect(features[2].versionContent[0].title).toEqual("Keep What You Want");
    })

    const req = httpTestCtrl.expectOne(service.API_URL);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(testData);
    httpTestCtrl.verify();
  });
});
