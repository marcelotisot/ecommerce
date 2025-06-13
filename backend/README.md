### Comandos generales

**Ejecutar en modo desarrollo**
```bash
npm run start:dev
```

**Ejecutar pruebas unitarias**
```bash
npm run test
```

**Estructura de carpetas**

src/
├── main.ts
├── app.module.ts
├── common/               # Decoradores, pipes, filtros, etc.
├── auth/                 # Módulo de autenticación y autorización
├── database/             # Configuración de la base de datos
├── modules/
│   ├── products/
│   │   ├── admin/        # Controladores y servicios del panel de administración
│   │   │   ├── admin-products.controller.ts
│   │   │   ├── admin-products.service.ts
│   │   │   └── admin-products.module.ts
│   │   ├── public/       # Controladores y servicios públicos
│   │   │   ├── public-products.controller.ts
│   │   │   ├── public-products.service.ts
│   │   │   └── public-products.module.ts
│   │   └── products.module.ts   # Módulo raíz que importa admin y public
│   ├── orders/
│   │   ├── admin/
│   │   └── public/
│   │   └── orders.module.ts
│   └── ...


**Estructura de carpetas por módulo**

src/
├── modules/
│   ├── products/
│   │   ├── entities/
│   │   │   └── product.entity.ts
│   │   ├── admin/
│   │   ├── public/
│   │   └── products.module.ts
│   ├── orders/
│   │   ├── entities/
│   │   │   └── order.entity.ts
│   │   ├── admin/
│   │   ├── public/
