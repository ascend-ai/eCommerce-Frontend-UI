import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationModel, ProductCategory, ProductModel } from 'src/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public categories: Array<string> = Object.values(ProductCategory).filter(value => typeof value === 'string');
  public pagination: PaginationModel<ProductModel> = new PaginationModel();

  constructor() {}

  ngOnInit(): void {
    this.pagination = {
      "content": [
          {
              "_id": "6581aba1967603db5198aa92",
              "name": "Neck band",
              "description": "Very nice product to have",
              "isPopular": false,
              "price": 200,
              "quantityInStock": 11,
              "images": [
                  {
                      "_id": "6581aba1967603db5198aa93",
                      "url": "/uploads/product_6581aba1967603db5198aa92_img_6581aba1967603db5198aa93.jpeg",
                  },
                  {
                      "_id": "6581aba1967603db5198aa95",
                      "url": "/uploads/product_6581aba1967603db5198aa92_img_6581aba1967603db5198aa95.jpeg",
                  }
              ],
              "displayImage": {
                "_id": "6581aba1967603db5198aa93",
                "url": "/uploads/product_6581aba1967603db5198aa92_img_6581aba1967603db5198aa93.jpeg",
              },
              "category": ProductCategory.NECKLACE,
              "similarProducts": [],
          },
          {
              "_id": "6581abcc967603db5198aa99",
              "name": "Chain",
              "description": "Very nice product to have",
              "isPopular": true,
              "price": 85,
              "quantityInStock": 2,
              "images": [
                  {
                      "_id": "6581abcc967603db5198aa9a",
                      "url": "/uploads/product_6581abcc967603db5198aa99_img_6581abcc967603db5198aa9a.jpeg",
                  },
                  {
                      "_id": "6581abcc967603db5198aa9c",
                      "url": "/uploads/product_6581abcc967603db5198aa99_img_6581abcc967603db5198aa9c.jpeg",
                  },
                  {
                      "_id": "6581abcd967603db5198aa9e",
                      "url": "/uploads/product_6581abcc967603db5198aa99_img_6581abcd967603db5198aa9e.jpeg",
                  }
              ],
              "displayImage": {
                "_id": "6581abcc967603db5198aa9a",
                "url": "/uploads/product_6581abcc967603db5198aa99_img_6581abcc967603db5198aa9a.jpeg",
              },
              "category": ProductCategory.ANKLET,
              "similarProducts": [],
          }
      ],
      "totalElements": 2,
      "totalPages": 1,
      "page": 0,
      "size": 9
  }
  }

  ngOnDestroy(): void {
  }
}
