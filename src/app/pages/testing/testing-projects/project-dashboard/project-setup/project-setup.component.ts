import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Interfaces to define our hierarchical data structure
export interface TaskItem {
  id: number;
  name: string;
  completed: boolean;
}

export interface ModuleItem {
  id: number;
  name: string;
  completed?: boolean;
  tasks: TaskItem[];
}

export interface StageItem {
  id: number;
  name: string;
  type: 'stage' | 'gate'; 
  completed?: boolean;
  modules: ModuleItem[];
  tasks?: TaskItem[];
}

@Component({
  selector: 'app-project-setup',
  templateUrl: './project-setup.component.html',
  styleUrls: ['./project-setup.component.scss']
})
export class ProjectSetupComponent implements OnInit {

  selectedStage: StageItem | null = null;
  selectedModule: ModuleItem | null = null;

  stagesAndGates: StageItem[] = [
    {
      id: 1, name: 'Concept & Feasibility', type: 'stage',
      modules: [
        {
          id: 101, name: 'Requirements Gathering', tasks: [
            { id: 1001, name: 'Define product & technical specifications', completed: true },
            { id: 1002, name: 'Identify raw material requirements', completed: true },
            { id: 1003, name: 'Estimate target production volume', completed: true },
            { id: 1004, name: 'Initial BOM & labor cost estimation', completed: false },
            { id: 1005, name: 'Assess existing factory floor capacity', completed: false },
            { id: 1006, name: 'Regulatory and EHS compliance check', completed: false },
            { id: 1007, name: 'Identify required new machinery (CAPEX)', completed: false },
            { id: 1008, name: 'Preliminary supply chain & vendor assessment', completed: false },
            { id: 1009, name: 'Draft initial project charter', completed: false },
            { id: 1010, name: 'Schedule Gate 1 Review', completed: false }
          ]
        },
        {
          id: 102, name: 'Technical Feasibility Study', tasks: [
            { id: 1021, name: 'Analyze manufacturing process constraints', completed: false },
            { id: 1022, name: 'Review machine cycle time vs. target output', completed: false },
            { id: 1023, name: 'Assess facility tooling capabilities', completed: false },
            { id: 1024, name: 'Determine automation feasibility index', completed: false }
          ]
        },
        {
          id: 103, name: 'ROI & Payback Analysis', tasks: [
            { id: 1031, name: 'Model NPV and IRR for 5-year production run', completed: false },
            { id: 1032, name: 'Calculate payback period options', completed: false },
            { id: 1033, name: 'Forecast operational expenditures (OPEX)', completed: false }
          ]
        }
      ]
    },
    {
      id: 2, name: 'Gate 1: Project Charter Approval', type: 'gate', modules: [],
      tasks: [
        { id: 2001, name: 'Project Charter draft finalized', completed: true },
        { id: 2002, name: 'Executive sponsor sign-off obtained', completed: false },
        { id: 2003, name: 'Gate 1 review meeting completed', completed: false }
      ]
    },
    {
      id: 3, name: 'Process & Design Engineering', type: 'stage',
      modules: [
        {
          id: 301, name: '3D CAD Modeling', tasks: [
            { id: 3011, name: 'Develop preliminary 3D assembly models', completed: false },
            { id: 3012, name: 'Perform tolerance stack-up analysis', completed: false },
            { id: 3013, name: 'Run component interference checks', completed: false }
          ]
        },
        {
          id: 302, name: 'CAE Simulation & FEA', tasks: [
            { id: 3021, name: 'Conduct structural stress simulations', completed: false },
            { id: 3022, name: 'Run thermal dissipation analysis', completed: false },
            { id: 3023, name: 'Verify structural fatigue life cycles', completed: false }
          ]
        },
        {
          id: 303, name: 'Design for Manufacturability (DFM)', tasks: [
            { id: 3031, name: 'Conduct DFM review with plant engineers', completed: false },
            { id: 3032, name: 'Optimize draft angles & wall thicknesses', completed: false },
            { id: 3033, name: 'Standardize fastener and thread specifications', completed: false }
          ]
        }
      ]
    },
    {
      id: 4, name: 'Gate 2: Design Freeze & CAPEX Sign-off', type: 'gate', modules: [],
      tasks: [
        { id: 4001, name: 'Final design models frozen', completed: false },
        { id: 4002, name: 'CAPEX budget approval signed', completed: false },
        { id: 4003, name: 'Detailed engineering drawings released', completed: false },
        { id: 4004, name: 'Tooling vendor SLA finalized', completed: false }
      ]
    },
    {
      id: 5, name: 'Tooling & Prototyping', type: 'stage',
      modules: [
        {
          id: 501, name: 'Tooling Fabrication', tasks: [
            { id: 5011, name: 'Release tooling purchase orders', completed: false },
            { id: 5012, name: 'Track injection mold manufacturing progress', completed: false },
            { id: 5013, name: 'Perform T1 mold trials at vendor site', completed: false }
          ]
        },
        {
          id: 502, name: 'Prototype Assembly', tasks: [
            { id: 5021, name: 'Procure rapid prototype components', completed: false },
            { id: 5022, name: 'Manually assemble 5 working prototypes', completed: false },
            { id: 5023, name: 'Document build anomalies & design issues', completed: false }
          ]
        },
        {
          id: 503, name: 'Functional Testing', tasks: [
            { id: 5031, name: 'Perform environmental chamber stress tests', completed: false },
            { id: 5032, name: 'Execute drop and impact validation tests', completed: false },
            { id: 5033, name: 'Verify electrical safety/HIPOT criteria', completed: false }
          ]
        }
      ]
    },
    {
      id: 6, name: 'Gate 3: Prototype Validation', type: 'gate', modules: [],
      tasks: [
        { id: 6001, name: 'Prototype testing reports completed', completed: false },
        { id: 6002, name: 'EHS and regulatory validation sign-off', completed: false },
        { id: 6003, name: 'Verify prototype matches specification matrix', completed: false }
      ]
    },
    {
      id: 7, name: 'Pilot Production Run', type: 'stage',
      modules: [
        {
          id: 701, name: 'Line Setup & Commissioning', tasks: [
            { id: 7011, name: 'Install machinery and custom fixtures on line 3', completed: false },
            { id: 7012, name: 'Configure PLC program logic & sensor thresholds', completed: false },
            { id: 7013, name: 'Establish workstation safety guards & checklists', completed: false }
          ]
        },
        {
          id: 702, name: 'Trial Run Execution', tasks: [
            { id: 7021, name: 'Run low-rate trial of 50 units', completed: false },
            { id: 7022, name: 'Measure station-wise cycle time (Takt time)', completed: false },
            { id: 7023, name: 'Perform First Article Inspection (FAI) on trial units', completed: false }
          ]
        },
        {
          id: 703, name: 'Quality Assurance Setup', tasks: [
            { id: 7031, name: 'Establish Go/No-Go inspection parameters', completed: false },
            { id: 7032, name: 'Deploy final automated optical inspection (AOI)', completed: false },
            { id: 7033, name: 'Calibrate all measurement and torque tools', completed: false }
          ]
        }
      ]
    },
    {
      id: 8, name: 'Gate 4: Mass Production Readiness', type: 'gate', modules: [],
      tasks: [
        { id: 8001, name: 'Line trial yield target achieved (>= 98%)', completed: false },
        { id: 8002, name: 'Production operators fully trained', completed: false },
        { id: 8003, name: 'Supply chain raw material flow secured', completed: false },
        { id: 8004, name: 'Final packaging validation approved', completed: false }
      ]
    },
    {
      id: 9, name: 'Mass Production Ramp-Up', type: 'stage',
      modules: [
        {
          id: 901, name: 'Capacity Optimization', tasks: [
            { id: 9011, name: 'Identify and resolve line bottlenecks', completed: false },
            { id: 9012, name: 'Optimize buffer size between stations 2 and 3', completed: false },
            { id: 9013, name: 'Minimize machine idle time parameters', completed: false }
          ]
        },
        {
          id: 902, name: 'Operator Scheduling', tasks: [
            { id: 9021, name: 'Define shift roster for 3-shift operation', completed: false },
            { id: 9022, name: 'Assign backup leads for critical stations', completed: false }
          ]
        },
        {
          id: 903, name: 'Supply Chain Scaling', tasks: [
            { id: 9031, name: 'Set up KanBan signal system for sub-assemblies', completed: false },
            { id: 9032, name: 'Verify vendor production capacity match', completed: false }
          ]
        }
      ]
    },
    {
      id: 10, name: 'Gate 5: Handover to Operations', type: 'gate', modules: [],
      tasks: [
        { id: 10001, name: 'Operations handover document signed', completed: false },
        { id: 10002, name: 'Standard Operating Procedures (SOPs) active', completed: false },
        { id: 10003, name: 'Project closeout report filed', completed: false },
        { id: 10004, name: 'Operations KPI dashboard configured', completed: false }
      ]
    },
    {
      id: 11, name: 'Post-Implementation Review', type: 'stage',
      modules: [
        {
          id: 1101, name: 'Performance Audit', tasks: [
            { id: 11011, name: 'Compare actual vs. forecasted cycle times', completed: false },
            { id: 11012, name: 'Assess final scrap and defect rates', completed: false }
          ]
        },
        {
          id: 1102, name: 'Lessons Learned', tasks: [
            { id: 11021, name: 'Conduct post-mortem workshop with project team', completed: false },
            { id: 11022, name: 'Publish design optimization guidelines for NPI', completed: false }
          ]
        }
      ]
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.selectStage(this.stagesAndGates[0]);
  }

  selectStage(stage: StageItem) {
    this.selectedStage = stage;
    if (stage.modules && stage.modules.length > 0) {
      this.selectedModule = stage.modules[0];
    } else {
      this.selectedModule = null;
    }
  }

  selectModule(moduleItem: ModuleItem) {
    this.selectedModule = moduleItem;
  }

  // --- Menu Action Handlers ---
  
  editItem(item: any, type: string) {
    console.log(`Editing ${type}:`, item);
    // Open dialog or trigger inline edit here
  }

  deleteItem(item: any, type: string) {
    console.log(`Deleting ${type}:`, item);
    // Trigger delete confirmation or API call here
  }

  toggleCompleted(event: Event, item: any) {
    event.stopPropagation();
    item.completed = !item.completed;
  }

  goBack(): void {
    this.router.navigateByUrl('/app/testing/projects');
  }
}