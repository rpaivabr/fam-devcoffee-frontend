# FAM Minicurso Fullstack JS: Parte II - Frontendend com Angular (30/10/2023)

![Imgur](https://i.imgur.com/BkdBxI8.png)

## Instalação Programas

- Download: [NodeJS](https://nodejs.org/en/download)
- Download: [VsCode](https://code.visualstudio.com/download)
- Download: [Git](https://git-scm.com/downloads)

&nbsp;

## Instalar Angular CLI (precisa Node e NPM)

```
npm i -g @angular/cli
```

&nbsp;

## Configuração Inicial

### Opção 1 - Criar novo projeto

Criar e instalar dependências:

```
ng new dev-coffee-spa
```

Acessar a pasta e rodar projeto localmente (http://localhost:4200):

```
cd dev-coffee-spa
npm run start
```

### Opção 2 - Clonar este repositório

```
git clone https://github.com/rpaivabr/fam-devcoffee-frontend dev-coffee-spa
cd dev-coffee-spa
npm install
npm run start
```

&nbsp;

## Etapa 1

### Criando Páginas e configurando RouterModule

Criar páginas (product-list, product-detail e cart):

```
ng g c <component-name>
```

```
// app-routing.module.ts
const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '/products' },
];
```

&nbsp;

## Etapa 2

### Criando Serviços e configurando HttpClient

Criar serviços (products e orders):

```
ng g s <service-name>
```

```
// app.module.ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
})
```

API Endpoints:

```
GET     /products
GET     /products/:id

POST    /orders
```

```
// products.service.ts
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
}
```

&nbsp;

## Etapa 3 (Extra)

### Live Demo with fake data (products.json)

Stackblitz

```
https://stackblitz.com/edit/stackblitz-starters-jkmygj
```
