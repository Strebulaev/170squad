import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent {
  candidates = [
    { name: 'Путин', votes: 0, percentage: 0 },
    { name: 'Харитонов', votes: 0, percentage: 0 },
    { name: 'Даванков', votes: 0, percentage: 0 },
    { name: 'Слуцкий', votes: 0, percentage: 0 },
  ];

  totalVotes = 0;
  roundPercentage(percentage: number): number {
    return Math.round(percentage);
  }

  vote(candidate: any) {
    candidate.votes += 1;
    this.totalVotes += 1;

    this.candidates.forEach((c) => {
      c.percentage = (c.votes / this.totalVotes) * 100;
    });
  }
}
