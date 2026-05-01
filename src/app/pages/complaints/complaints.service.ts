import { Injectable } from '@angular/core';
import { range } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  constructor() { }


   data = [
    {
      referenceNumber: 'FIELD/2024/09/3',
      subject: 'Global fleet of connected vehicles',
      problemSubject: 'hazard service aimed at improving road safety through real-time alerts. Already rolled out in millions of vehicles across Europe		',
      capa: '↪',
      country: 'Andorra',
      model: '89.0858254',
      department: 'RND',
      criticality: 'Medium Critical',
      distributor: 'Mahindra',
      // Continent :'Antarctica',
      City: 'Hyd',
      serialno: '123',
      status: 'Pending',
      Lead: 'Ayush',
      Feedback: 'test',
      TargetDate: '10-09-2025',
      FailureDate: '12-09-2025',
      ExpectedFinishDate: '12-09-2025',
      ActualFinishDate: '10-09-2025',
      steps:"15/15",
      complitionDate:'18-09-2025',
      range:Math.round(15/15*100),

    },
    {

      referenceNumber: 'FIELD/2024/09/6',
      subject: 'High-Performance Nissan Ariya NISMO',
      problemSubject: 'Nissan has unveiled the Ariya NISMO, a high-performance electric crossover designed for those who crave speed',
      capa: '↪',
       status: 'Pending',
      country: 'Angola',
      model: '79.65735',
      department: 'RND',
      criticality: 'Medium Critical',
      distributor: 'Nissan',
       steps:"9/15",
       range:Math.round(9/15*100),
    },
    {
      referenceNumber: 'FIELD/2024/09/13',
      subject: 'Engine Overheating',
      problemSubject: 'I’ve noticed that my car’s engine is frequently overheating, especially during longer trips.',
      capa: '↪',
      country: 'Algeria',
      status: 'Pending',
      model: '5329375',
      department: 'RND',
      criticality: 'Medium Critical',
      distributor: 'Overheating',
       steps:"4/15",
       range:Math.round(4/15*100),
    },
    {
      referenceNumber: 'FIELD/2024/09/14',
      subject: 'Update Application Dependencies',
      problemSubject: 'If the issue comes from a dependency (NuGet, external library), make sure all your dependencies are up to date		',
      capa: '↪',
      steps:"9/15",
      country: 'Algeria',
      model: 'Maruthi',
      status: 'Closed',
      department: 'QA',
      criticality: 'Low Critical',
      distributor: 'Nexus',
      range:Math.round(9/15*100),
   
    },
    {
      referenceNumber: 'FIELD/2024/09/15',
      subject: 'Verify DLL Versions',
      problemSubject: 'If you’re referencing external DLLs, ensure the correct versions of the DLLs are being used in both your development environment and your deployment environment.		',
      capa: '↪',
      country: 'Algeria',
      model: 'Mahindra',
      status: 'Process',
      department: 'RND',
      criticality: 'Medium Critical',
      distributor: 'Mahindra',
         steps:"7/15",
         range:Math.round(7/15*100),
    },
    {
      referenceNumber: 'FIELD/2024/09/16',
      subject: 'Bumper Issue',
      problemSubject: 'Bumper Issue: Describe the specific problem with the bumper.',
      capa: '↪',
      country: 'Andorra',
      model: '898NFHT5',
      status: 'Hold',
      department: 'RND',
      criticality: 'Low Critical',
      distributor: 'Bumper Issue',
         steps:"11/15",
          range:Math.round(11/15*100),
    },
    {
      referenceNumber: 'FIELD/2024/09/23',
      subject: 'Error Testing',
      problemSubject: 'Bug free s/w application		',
      capa: '↪',
      country: 'Andorra',
      model: 'e21',
      status: 'Pending',
      department: 'Test',
      criticality: 'Upper Level Critical',
      distributor: 'Raj',
         steps:"15/15",
         range:Math.round(15/15*100),
    },
    {
      referenceNumber: 'FIELD/2024/09/23',
      subject: 'Error Testing',
      problemSubject: 'Bug free s/w application		',
      capa: '↪',
      status: 'pending',
      country: 'Andorra',
      model: 'e21',
      department: 'Test',
      criticality: 'Upper Level Critical',
      distributor: 'Raj',
         steps:"10/15",
         range:Math.round(10/15*100),
    }
    ,
    {
      referenceNumber: 'FIELD/2024/09/23',
      subject: 'Error Testing',
      problemSubject: 'Bug free s/w application		',
      capa: '↪',
      status: 'Pending',
      country: 'Andorra',
      model: 'e21',
      department: 'Test',
      criticality: 'Upper Level Critical',
      distributor: 'Raj',
         steps:"14/15",
         range:Math.round(14/15*100),
    }
    ,
    {
      referenceNumber: 'FIELD/2024/09/23',
      subject: 'Error Testing',
      problemSubject: 'Bug free s/w application		',
      capa: '↪',
      status: 'Pending',
      country: 'Andorra',
      model: 'e21',
      department: 'Test',
      criticality: 'Upper Level Critical',
      distributor: 'Raj',
         steps:"0/15",
         range:Math.round(0/15*100),
    }
  ];


  getComplaints() {
    const departments = ['HD', 'Test', 'Manufacture', 'HR Department', 'IT Department', 'Painting Department', 'Component-Shop', 'Assembly line', 'Paint Shop', 'Body Shop'];
    return this.data.map(item => ({
      ...item,
      department: departments[Math.floor(Math.random() * departments.length)]
    }));
  }

}
