import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiPostUrl: string = 'http://localhost:8000/api/posts'; // Backend API'nin URL'i
  private apiCommentUrl: string = 'http://localhost:8000/api/comments'; // Backend API'nin URL'i

  private apiContactUrl: string = 'http://localhost:8000/api/contact'; // Backend API'nin URL'i
  private apiCategoryUrl: string = 'http://localhost:8000/api/categories'; // Backend API'nin URL'i
  private apiUsersUrl: string = 'http://localhost:8000/api/users'; // Backend API'nin URL'i





  constructor(private http: HttpClient) { }

  getUsers(email:string) : Observable<any> {
    const params = {
      email : email
    };
    return this.http.get<any>(`${this.apiUsersUrl}`, {params});
  }
  getAllContacts(email:string) : Observable<any> {
    const params = {
      email:email
    };
    return this.http.get<any>(`${this.apiContactUrl}/`,{params});
  }
  deleteContact(ContactId: string) : Observable<any> {
    return this.http.delete<any>(`${this.apiContactUrl}/${ContactId}`);
  }
  deletedUser(userId: string) : Observable<any> {
    return this.http.delete<any>(`${this.apiUsersUrl}/${userId}`);
  }

  updateUser(id:string,username:string,email:string,isVerified:boolean,isAdmin:boolean) : Observable<any> {
    const body = {
      username : username,
      email : email,
      isVerified : isVerified,
      isAdmin : isAdmin
    }
    return this.http.put<any>(`${this.apiUsersUrl}/${id}`,body);
  }

  getCategories() : Observable<any> {
    return this.http.get<any>(`${this.apiCategoryUrl}`)
  }

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

  getAllPostsByCategory(page: number, limit: number, date: number, categoryId: string): Observable<any[]> {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      date : date.toString(),
      categoryId : categoryId.toString()
    };
    return this.http.get<any[]>(`${this.apiPostUrl}/category`, { params });
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
  };

  getSingleContact(id:string) : Observable<any> {
    return this.http.get<any>(`${this.apiContactUrl}/${id}`);
  }


  createContact(name: string,subject:string,email:string,message:string): Observable<any> {
    return this.http.post<any>(`${this.apiContactUrl}/`,{name,subject,email,message} )
  }

}

