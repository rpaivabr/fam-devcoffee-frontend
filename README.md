# FAM Minicurso Fullstack JS: Parte I - Backend com NestJS (30/10/2023)

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
git clone https://github.com/rpaivabr/fam-devcoffee-frontend
cd dev-coffee-spa
npm install
npm run start
```

&nbsp;

## Etapa 1

### Criando Páginas e configurando RouterModule

Vscode Ext Rest (ThunderClient):

```
POST    /products
GET     /products
GET     /products/:id
PUT     /products/:id
DELETE  /products/:id

POST    /orders
GET     /orders
GET     /orders/:id
PATCH   /orders/:id
```

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

### Bootstrap

Error Interceptor

```
// exception.interceptor.ts
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof EntityNotFoundError) {
          return throwError(() => new NotFoundException());
        }
        if (
          err.message ===
          'Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer'
        ) {
          return throwError(() => new BadRequestException('Invalid Id'));
        }
        return throwError(() => err);
      }),
    );
  }
}
```

Logging Interceptor

```
// logging.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
```

Transform Interceptor

```
// transform.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
```

- Documentação: [overview/interceptors](https://docs.nestjs.com/interceptors)

### Performance

Fastify

```
npm i --save @nestjs/platform-fastify
```

```
// main.ts
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(3000, 'localhost');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
```

- Documentação: [techniques/performance](https://docs.nestjs.com/techniques/performance)
- Exemplos: [fastify](https://github.com/nestjs/nest/tree/master/sample/10-fastify)

### Documentação

Swagger

```
npm install --save @nestjs/swagger
```

```
// main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('DevCoffee example')
    .setDescription('The DevCoffee API description')
    .setVersion('1.0')
    .addTag('devcoffee')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

```
// products.controller.ts
@ApiTags('products')
@Controller('products')
export class ProductsController {}
```

- Documentação: [recipes/swagger](https://docs.nestjs.com/openapi/introduction)
- Exemplos: [11-swagger](https://github.com/nestjs/nest/tree/master/sample/11-swagger)

&nbsp;

https://www.pexels.com/search/coffee/
https://www.svgrepo.com/svg/80543/shopping-cart-outline
