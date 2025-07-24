import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../../core/services/blog.service';
import { Blog } from '../../../shared/models/blog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs-new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './blogs-new.component.html',
  styleUrl: './blogs-new.component.scss',
})
export class BlogsNewComponent {
  blogForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  constructor(private blogService: BlogService, private router: Router) {}

  onSubmit() {
    // call create blog service
    this.blogService.createBlog(this.blogForm.value as {title: string; content: string }).subscribe({
      next: (blog: Blog) => {
        console.log('Blog created', blog);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Error creating blog', error);
      },
    });
  }
}
