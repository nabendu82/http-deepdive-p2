import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  constructor(private postsService: PostsService) {}
  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
        error => {
          this.isFetching = false;
          this.error = error.message;
          console.log(error);
        }
      )
  }
  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content)
  }
  
  onFetchPosts() {
    this.fetchPosts();
  }
  private fetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
        error => {
          this.isFetching = false;
          this.error = error.message;
          console.log(error);
        }
      )
  }

  onHandleError() {
    this.error = null;
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

}
