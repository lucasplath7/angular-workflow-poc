import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'review'
})
export class ReviewPipe implements PipeTransform {
  
  transform(data: any, selectedSection: any) {
    return selectedSection.stepOrder.map((step: string) => {
      if (!step.toLowerCase().includes('review')) {
        return data[step];
      }
    }).filter((x: any) => x);
  }
}