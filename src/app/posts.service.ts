import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };
        this.http.post<{ name: string }>(
            'https://angular-http-demo-768df-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
            postData).subscribe(res => {
                console.log(res)
            })
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>(
            'https://angular-http-demo-768df-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
            .pipe(map(res => {
                const posts: Post[] = [];
                for (const key in res) {
                    posts.push({ ...res[key], id: key })
                }
                return posts;
            }))
    }

    deletePosts() {
        return this.http.delete('https://angular-http-demo-768df-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
    }
}