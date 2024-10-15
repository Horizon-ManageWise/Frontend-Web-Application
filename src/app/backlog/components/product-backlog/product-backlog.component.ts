import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";

import {UserStory} from "../../model/user-story.entity";
import {UserStoriesService} from "../../services/user-stories.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-product-backlog',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, CommonModule, MatIcon],
  templateUrl: './product-backlog.component.html',
  styleUrl: './product-backlog.component.css'
})
export class ProductBacklogComponent {
  userStories: Array<UserStory> = [];
  filteredUserStories: Array<UserStory> = [];

  constructor(private userStoriesService: UserStoriesService) {}

  private getAllUserStories(): void {
    this.userStoriesService.getAll()
      .subscribe((response: any) => {
        this.filteredUserStories = response.filter((story: UserStory) => story.sprint == null);
        this.userStories = response.filter((story: UserStory) => story.sprint != null);
      });
  }

  private deleteUserStory(userStoryId: number): void {
    this.userStoriesService.delete(userStoryId)
      .subscribe(() => {
        this.userStories = this.userStories.filter((userStory: UserStory) => userStory.id !== userStoryId);
      });
  };

  //metodo para eliminar user story de backlog
  private deleteUserStoryBacklog(userStoryId: number): void {
    this.userStoriesService.delete(userStoryId)
      .subscribe(() => {
        this.filteredUserStories = this.filteredUserStories.filter((userStory: UserStory) => userStory.id !== userStoryId);
      });
  };

  onDeleteUserStory(element: UserStory) {
    this.deleteUserStory(element.id);
    this.filteredUserStories.push(element);
  }

  onAddUserStory(element: UserStory) {
    this.deleteUserStoryBacklog(element.id);
    this.userStories.push(element);
  }

  ngOnInit(): void {
    this.getAllUserStories();
  }

}

