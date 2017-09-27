import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { IResponse } from '../../core/http/core-http.service';

import { IEntry, Lazy2Service } from '../lazy2.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  public entries: IEntry[];
  public errorMsg: string = '';

  constructor(private entryService: Lazy2Service) { }

  ngOnInit(): void {
    // example with Promise
    // for an example with Observable, view lazy component/service
    this.entryService.getEntries().then(
      (res: IResponse): IResponse => this.entries = res.message,
      (err: HttpErrorResponse): string => this.errorMsg = err.message
    );
  }
}
