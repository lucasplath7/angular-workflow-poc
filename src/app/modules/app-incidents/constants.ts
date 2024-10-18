import { Validators } from "@angular/forms"

export const VALIDATOR_MAP: any = {
  required: Validators.required,
}

export const INCIDENT_STEPPER = {
  stepOrder: [
    'incident',
    'discovery',
    'actionPlan',
    'implementation'
  ],
  steps: {
    incident: {
      stepOrder: [
        'incidentDetails'
      ],
      id: 'incident',
      stepLabel: 'Incident',
      isPrimary: true,
      resource: 'incident',
      steps: {
        incidentDetails: {
          id: 'incidentDetails',
          stepLabel: 'Incident Details',
          resource: 'incident',
          formControlOrder: [
            'name',
            'description',
            'type'
          ],
          formControls: {
            name: {
              label: 'Incident Name',
              type: 'text',
              readOnly: true,
              variable: 'name',
              validators: ['required']
            },
            description: {
              label: 'Description',
              type: 'textArea',
              variable: 'description'
            },
            type: {
              label: 'Incident Type',
              type: 'select',
              options: ['data quality', 'other'],
              variable: 'type',
              validators: ['required']
            },
          }
        }
      }
    },
    discovery: {
      stepOrder: [
        'impactAssessment',
        'rootCause',
        'discoveryReview'
      ],
      id: 'discovery',
      stepLabel: 'Incident Discovery',
      isPrimary: true,
      resource: 'discovery',
      dependsOn: ['incident'],
      steps: {
        impactAssessment: {
          id: 'impactAssessment',
          stepLabel: 'Impact Assessment',
          resource: 'discovery',
          formControlOrder: [
            'impactDescription',
            'impactedParties',
            'lifeCyclePhase'
          ],
          formControls: {
            impactDescription: {
              label: 'Impact Description',
              type: 'textArea',
              variable: 'impactDescription',
              placeholder: 'Describe how the business is being impacted...'
            },
            impactedParties: {
              label: 'Impacted Parties',
              type: 'select',
              variable: 'impactedParties',
              options: ['customer', 'associates', 'regulators'],
              validators: ['required']
            },
            lifeCyclePhase: {
              label: 'Data Life-Cycle Phase',
              type: 'select',
              options: ['capture', 'transport', 'use'],
              variable: 'lifeCyclePhase',
              validators: ['required']
            },
          }
        },
        rootCause: {
          id: 'rootCause',
          stepLabel: 'Root Cause',
          resource: 'discovery',
          formControlOrder: [
            'primaryCause',
            'causeDescription',
            'dataElementsImpacted'
          ],
          formControls: {
            primaryCause: {
              label: 'Primary Contributing Cause',
              type: 'select',
              variable: 'primaryCause',
              options: ['change execution', 'data use', 'documentation'],
              validators: ['required']
            },
            causeDescription: {
              label: 'Primary Cause Description',
              type: 'textArea',
              variable: 'causeDescription',
              placeholder: 'Describe the primary cause...'
            },
            dataElementsImpacted: {
              label: 'Data Elements Impacted',
              type: 'text',
              variable: 'dataElementsImpacted'
            },
          }
        },
        discoveryReview: {
          id: 'discoveryReview',
          stepLabel: 'Review',
          resource: 'discovery',
          formControlOrder: ['review'],
          formControls: {
            review: {
              type: 'review',
              readOnly: true
            }
          }
        }
      }
    },
    actionPlan: {
      stepOrder: [
        'resolutionPath',
        'actionPlanReview'
      ],
      id: 'actionPlan',
      stepLabel: 'Action Plan',
      isPrimary: true,
      resource: 'actionPlan',
      steps: {
        resolutionPath: {
          id: 'resolutionPath',
          stepLabel: 'Resolution Path',
          resource: 'actionPlan',
          formControlOrder: [
            'fixType',
            'regulatoryIssue',
            'enhancementRationale',
            'fundingRequired'
          ],
          formControls: {
            fixType: {
              type: 'select',
              label: 'Select A Fix Type',
              variable: 'fixType',
              options: ['non-tech', 'others'],
              validators: ['required']
            },
            regulatoryIssue: {
              type: 'radio',
              label: 'Is this a regulatory Issue?',
              variable: 'regulatoryIssue',
              options: ['YES', 'NO'],
              validators: ['required']
            },
            enhancementRationale: {
              type: 'textArea',
              label: 'Enhancement Rationale',
              variable: 'enhancementRationale',
            },
            fundingRequired: {
              type: 'radio',
              label: 'Is funding required?',
              variable: 'fundingRequired',
              options: ['YES', 'NO']
            }
          }
        },
        actionPlanReview: {
          id: 'actionPlanReview',
          stepLabel: 'Review',
          formControlOrder: ['review'],
          formControls: {
            review: {
              type: 'review',
              readOnly: true
            }
          }
        },
      }
    },
    implementation: {
      stepOrder: [
        'details',
        'approvals',
        'implementationReview'
      ],
      id: 'implementation',
      stepLabel: 'Implementation',
      isPrimary: true,
      resource: 'implementation',
      steps: {
        details: {
          id: 'details',
          stepLabel: 'Implementation Details',
          resource: 'implementation',
          formControlOrder: [
            'resolutionPath',
            'resolutionDescription',
            'actionsTaken'
          ],
          formControls: {
            resolutionPath: {
              type: 'radio',
              label: 'Resolution Path',
              variable: 'resolutionPath',
              options: ['YES', 'NO'],
              validators: ['required']
            },
            resolutionDescription: {
              type: 'textArea',
              label: 'Resolution Path Description',
              variable: 'resolutionDescription',
            },
            actionsTaken: {
              type: 'textArea',
              label: 'Describe Actions Taken',
              variable: 'actionsTaken',
            }
          }
        },
        approvals: {
          id: 'approvals',
          stepLabel: 'Approvals',
          formControlOrder: ['approvals'],
          resource: 'implementation',
          formControls: {
            approvals: {
              type: 'radio',
              label: 'Approve Implementation',
              variable: 'approvals',
              options: ['YES', 'NO'],
              validators: ['required']
            }
          }

        },
        implementationReview: {
          id: 'implementationReview',
          stepLabel: 'Review',
          formControlOrder: ['review'],
          formControls: {
            review: {
              type: 'review',
              readOnly: true
            }
          }
        },
      }
    }
  }
}