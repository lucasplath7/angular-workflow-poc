import { Component } from '@angular/core';

@Component({
  selector: 'app-stepper-demo',
  templateUrl: './stepper-demo.component.html',
  styleUrl: './stepper-demo.component.css'
})
export class StepperDemoComponent {
  substepIndex: number = -1;
  currentSection: string = '';
  selectedStep?: string;
  undef = undefined
  stepper: any = {
    stepOrder: [
      'step1',
      'step2',
      'step3'
    ],
    steps: {
      step1: {
        stepOrder: [
          'bonusStep',
          'bonusStep2'
        ],
        id: 'step1',
        stepLabel: 'STEP 1',
        isPrimary: true,
        steps: {
          bonusStep: {
            id: 'bonusStep',
            stepLabel: 'BONUS STEP'
          },
          bonusStep2: {
            id: 'bonusStep2',
            stepLabel: 'BONUS STEP 2'
          }
        }
      },
      step2: {
        stepOrder: [
          'subStep1',
          'subStep2'
        ],
        id: 'step2',
        stepLabel: 'STEP 2',
        isPrimary: true,
        steps: {
          subStep1: {
            id: 'subStep1',
            stepLabel: 'FIRST SUBSTEP OF STEP 2'
          },
          subStep2: {
            stepOrder: [
              'doubleSub1',
              'doubleSub2'
            ],
            id: 'subStep2',
            stepLabel: 'SECOND SUBSTEP OF STEP 2',
            steps: {
              doubleSub1: {
                id: 'doubleSub1',
                stepLabel: 'FIRST SUB-SUBSTEP OF SUBSTEP 2'
              },
              doubleSub2: {
                id: 'doubleSub2',
                stepLabel: 'SECOND SUB-SUBSTEP OF SUBSTEP 2'
              },
            }
          }
        }
      },
      step3: {
        stepOrder: [
          'subStep3',
          'subStep4',
          'subStep5'
        ],
        id: 'step3',
        stepLabel: 'STEP 3',
        isPrimary: true,
        steps: {
          subStep3: {
            id: 'subStep3',
            stepLabel: 'FIRST SUBSTEP OF STEP 3'
          },
          subStep4: {
            id: 'subStep4',
            stepLabel: 'SECOND SUBSTEP OF STEP 3'
          },
          subStep5: {
            id: 'subStep5',
            stepLabel: 'Third SUBSTEP OF STEP 3'
          },
        }
      }
    }
  }

  ngOnInit() {
    this.currentSection = 'step1'
  }

  selectStep(stepId: string) {
    console.log('stepid: ', stepId)
    this.selectedStep = stepId;
  }

  selectSection(section: string, event: any) {
    event.stopPropagation();
    console.log('select section: ', section)
    this.currentSection = section;
    // this.selectedStep = defaultStep;
  }

  childIsExpanded(section: any): boolean {
    if (section.steps && Object.keys(section.steps).includes(this.currentSection)) {
      return true;
    }

    return false;
  }
}
