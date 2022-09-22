import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from 'src/app/Shared/api.service';

import { isThisTypeNode } from 'typescript';
import { BookModel } from './book-dash.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  formValue!: FormGroup;
  bookModelObj: BookModel = new BookModel();
  bookData !: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      title: [''],
      category: [''],
      image: [''],
      price: [''],
      publisher: [''],
      isactive: [''],
      content: ['']

    })
    this.getAllBook();
  }

  clickAddBook() {
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  

  postBookDetails() {

    this.bookModelObj.title = this.formValue.value.title;
    this.bookModelObj.category = this.formValue.value.category;
    this.bookModelObj.image = this.formValue.value.image;
    this.bookModelObj.price = this.formValue.value.price;
    this.bookModelObj.publisher = this.formValue.value.publisher;
    this.bookModelObj.isactive = this.formValue.value.isactive;

    this.bookModelObj.content = this.formValue.value.content;


    this.api.postBook(this.bookModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Book Added Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBook();
      },
        (err) => {
          alert("Something Went Wrong");
        })
  }

  getAllBook() {
    debugger;
    this.api.getBook()
      .subscribe(res => {
        this.bookData = res;
      })
  }
  deleteBook(row: any) {
    this.api.deleteBook(row.id)
      .subscribe(res => {
        alert("Book Deleted")
        this.getAllBook();
      })
  }
  onEdit(row: any) {
    this.showAdd=false;
    this.showUpdate=true;
    this.bookModelObj.id = row.id;
    this.formValue.controls["title"].setValue(row.title);
    this.formValue.controls["category"].setValue(row.category);
    this.formValue.controls["image"].setValue(row.image);
    this.formValue.controls["price"].setValue(row.price);
    this.formValue.controls["publisher"].setValue(row.publisher);
    this.formValue.controls["isactive"].setValue(row.isactive);
    this.formValue.controls["content"].setValue(row.content);
  }

  updateBookDetails() {
    this.bookModelObj.title = this.formValue.value.title;
    this.bookModelObj.category = this.formValue.value.category;
    this.bookModelObj.image = this.formValue.value.image;
    this.bookModelObj.price = this.formValue.value.price;
    this.bookModelObj.publisher = this.formValue.value.publisher;
    this.bookModelObj.isactive = this.formValue.value.isactive;
    this.bookModelObj.content = this.formValue.value.content;

    this.api.updateBook(this.bookModelObj, this.bookModelObj.id)
      .subscribe(res => {
        alert("Updated successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBook();
      })
  }

}