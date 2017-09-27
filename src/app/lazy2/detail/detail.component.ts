import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntry, Lazy2Service } from '../lazy2.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  entry: IEntry | undefined;

  constructor(private route: ActivatedRoute, private entryService: Lazy2Service) { }

  ngOnInit(): void {
    const id = Number.parseInt(this.route.snapshot.params['id'], 10);
    this.entry = this.entryService.getEntry(id);
  }
}
