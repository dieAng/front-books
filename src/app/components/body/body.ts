import {Component, OnInit, OnDestroy} from '@angular/core';
import {Categorias} from "../../services/categorias";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-body',
  templateUrl: './body.html',
  styleUrls: ['./body.css'],
  imports: [
    NgForOf,
    NgIf
  ]
})
export class Body implements OnInit, OnDestroy {
  categorias: any = null;
  arrCategorias: any[] = [];
  loading = false;
  errorMessage: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private _categorias: Categorias) { }

  ngOnInit() {
    this.getCategorias();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCategorias(): void {
    this.loading = true;
    this.errorMessage = null;

    this._categorias.getCategorias()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.categorias = response;
          // extracción segura en caso de estructura inesperada
          this.arrCategorias = response?.categoriaResponse?.categorias ?? [];
          console.debug('Categorias response:', this.categorias);
        },
        error: (err: any) => {
          this.loading = false;
          console.error('Error cargando categorias', err);
          this.arrCategorias = [];
          this.errorMessage = 'No fue posible cargar las categorías.';
        }
      });
  }

  trackById(index: number, item: any): any {
    return item?.id ?? index;
  }
}
