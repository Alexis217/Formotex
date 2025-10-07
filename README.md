# Formotex Inventory (backend) 🚀

> **Resumen rápido:** backend en **TypeScript + Express + Prisma (Postgres)** con autenticación JWT.

---

# Índice

* 🔧 Requisitos
* ⚙️ Instalación & ejecución
* 🧩 Variables de entorno (`.env`)
* 🧪 Cómo probar (auth)
* 🧭 Estructura de carpetas
* 🛠️ Justificación técnica (decisiones)

---

# 🔧 Requisitos

* Node.js 18+
* pnpm
* PostgreSQL (local o en un contenedor Docker)
* `pnpm` global (o usar `npx pnpm`)

---

# ⚙️ Instalación & ejecución

1. Clonar y entrar al proyecto:

```bash
git clone <https://github.com/Alexis217/Formotex.git>
```

2. Instalar dependencias:

```bash
pnpm install
```

3. Configurar `.env` (ver sección siguiente).

4. Generar Prisma Client y aplicar migraciones:

```bash
pnpm prisma generate
pnpm prisma migrate dev --name init
```

5. Crear admin inicial (seed):

```bash
pnpm prisma db seed
```

6. Levantar servidor en desarrollo:

```bash
pnpm run dev   # usa tsx watch src/server.ts
```

---

# 🧩 Variables de entorno (`.env.example`)

Crea un `.env` similar a este:

```env
# Puerto en el que corre la aplicación
PORT=6667

# Entorno de ejecución: development | production
NODE_ENV=production

# URL de conexión a la base de datos (usa tus credenciales reales en tu .env)
DATABASE_URL=postgresql://<USUARIO>:<CONTRASEÑA>@localhost:5432/formotexdb

# Clave secreta para JWT (cambia esto en tu .env real)
JWT_SECRET=tu_clave_super_secreta
JWT_EXPIRES_IN=1h

# Credenciales iniciales para el usuario admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Adminpassword1234
```

---

# 🧪 Cómo probar (autenticación)

> Por defecto el proyecto expone endpoints de auth. **Por defecto el register esta protegido para admins** primero corre el seed para crear admin y logueate con ese admin.

## 1) Login (público)

**POST** `http://localhost:4000/api/auth/login`
Body JSON:

```json
{ "email": "admin@formotex.local", "password": "Admin123!" }
```

Respuesta esperada:

```json
{
  "token": "<JWT>",
  "user": { "id":"...", "email":"...", "name":"...", "role":"ADMIN" }
}
```

## 2) Register (protegido por ADMIN)

**POST** `http://localhost:4000/api/auth/register`
Headers:

```
Authorization: Bearer <JWT_DEL_ADMIN>
```

Body JSON:

```json
{ "name":"Nuevo", "email":"nuevo@test.com", "password":"123456", "role":"USER" }
```


## 3) Inspeccionar DB

* Usá **Prisma Studio**:

```bash
pnpm prisma studio
```

* O consultá con `psql` / PgAdmin.

---

# 🧭 Estructura de carpetas

```
src/
├─ config/
│  └─ config.ts              # carga .env
├─ domain/
├─ lib/
│  └─ prisma.ts              # singleton PrismaClient
├─ controllers/
│  └─ auth.controller.ts
├─ services/
│  └─ auth.service.ts
│  └─ jwt.service.ts
├─ repositories/
│  └─ prisma-user.repository.ts
├─ middlewares/
│  ├─ auth.middleware.ts
│  ├─ role.middleware.ts
│  └─ validation.middleware.ts
├─ routes/
│  └─ auth.routes.ts
│─ entities/
│     └─ user.ts
prisma/
├─ schema.prisma
├─ seed.ts                   # seed para admin
package.json
tsconfig.json
```

---

# 🛠️ Justificación técnica (decisiones principales)

### 🎯 Objetivo de diseño

Separar responsabilidades y facilitar pruebas, mantenimiento y extensibilidad. Aplicamos principios **SOLID** y patrones cuando aportan calidad.

### 📁 Organización de carpetas

* **controllers**: reciben req/res y delegan a services.
* **services**: lógica de negocio y reglas (SRP).
* **repositories**: abstracción de persistencia (Repository pattern). Permiten cambiar Prisma por otra implementación en el futuro (DIP).
* **middlewares**: auth, roles, validaciones (Chain of Responsibility).
* **lib/prisma.ts**: singleton para evitar múltiples clientes Prisma.

### 🔗 Relaciones entre entidades (visión actual)

* **User**:

  * `id, name, email, password(hashed), role, createdAt, updatedAt`
  * Rol: `ADMIN | USER` (control de permisos).

### 🧾 Propiedades relevantes (User)

* `email` con `@unique` (unicidad -> evita duplicados, se valida también en service).
* `password` **hashed** con `bcryptjs` (nunca almacenar plain text).
* `role` para autorización basada en roles.

### 🧰 Librerías & motivos

* **Express**: framework web simple y extendible.
* **Prisma**: ORM moderno, migraciones y buen developer experience.
* **Postgres**: DB relacional estable y probada.
* **bcryptjs**: hashing de contraseñas.
* **jsonwebtoken**: JWT para autenticación stateless.
* **express-validator**: validaciones de request.
* **tsx** + **pnpm**: desarrollo rápido y ligero.

### 🔁 Patrones aplicados

* **Repository**: para desacoplar persistencia.
* **Service Layer**: lógica de negocio en services.
* **Middleware Chain**: auth/role/validation.
* **Singleton**: `PrismaClient` en `lib/prisma.ts`.
* **DTO/Validators**: entrada estricta y clara.

---
