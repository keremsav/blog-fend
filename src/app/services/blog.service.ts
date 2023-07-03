import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiPostUrl: string = 'http://localhost:8000/api/posts'; // Backend API'nin URL'i
  private apiCommentUrl: string = 'http://localhost:8000/api/comments'; // Backend API'nin URL'i


  constructor(private http: HttpClient) { }

  createPost(title: string, content: string, tags: string[]): Observable<any> {
    const body = {
      title: title,
      content: content,
      tags: tags
    };

    return this.http.post<any>(`${this.apiPostUrl}`, body);
  }

  getAllPosts(page: number, limit: number,date : number): Observable<any[]> {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      date : date.toString()
    };
    return this.http.get<any[]>(`${this.apiPostUrl}`, { params });
  }


  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiPostUrl}/${id}`);
  }

  updatePost(id: string, title: string, content: string, tags: string[]): Observable<any> {
    const body = {
      title: title,
      content: content,
      tags: tags
    };

    return this.http.put<any>(`${this.apiPostUrl}/${id}`, body);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiPostUrl}/${id}`);
  }


  createComment(content: string, post: string): Observable<any> {
    const body = {
      content: content,
      post: post
    };

    return this.http.post<any>(`${this.apiCommentUrl}`, body);
  }

  getCommentsByPostId(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiCommentUrl}/${postId}`);
  }

  getCommentById(commentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiCommentUrl}/comment/${commentId}`);
  }

  updateComment(commentId: string, content: string): Observable<any> {
    const body = {
      content: content
    };

    return this.http.put<any>(`${this.apiCommentUrl}/${commentId}`, body);
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiCommentUrl}/${commentId}`);
  }
}

