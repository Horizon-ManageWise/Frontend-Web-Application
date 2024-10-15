import { Injectable } from '@angular/core';

import { BaseService } from "../../shared/services/base.service";
import { Meeting } from "../model/meeting.entity";


@Injectable({
  providedIn: 'root'
})
export class MeetingService extends BaseService<Meeting> {

  constructor() {
    super();
    this.resourceEndpoint = '/meeting';
  }
}
