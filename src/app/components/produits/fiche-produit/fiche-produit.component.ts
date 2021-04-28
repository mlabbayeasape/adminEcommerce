import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-fiche-produit',
  templateUrl: './fiche-produit.component.html',
  styleUrls: ['./fiche-produit.component.css']
})
export class FicheProduitComponent implements OnInit {

  product: Product;
  productForm: FormGroup;
  errorMessage: string;
  loading: boolean = false;
  imagePreview: string;
  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
  }

}
