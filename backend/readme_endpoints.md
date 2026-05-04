# API REST - Endpoints

Base URL: `http://localhost:3000`

Content-Type: `application/json`

## Salud

### GET /
Devuelve un mensaje de estado de la API.

**Respuesta 200**

```json
{
  "mensaje": "API REST de Gestión de Usuarios funcionando correctamente"
}
```

## Usuarios

Entidad: `usuarios`

Campos:
- `id` (number, autoincremental)
- `nombre` (string, requerido, máx 120)
- `correo` (string, requerido, email válido, máx 160, único)
- `createdAt` / `updatedAt` (string ISO)

### POST /usuarios
Crea un usuario.

**Body**

```json
{
  "nombre": "Ana",
  "correo": "ana@example.com"
}
```

**Respuesta 201**

```json
{
  "id": 1,
  "nombre": "Ana",
  "correo": "ana@example.com",
  "createdAt": "2026-05-03T17:33:41.277Z",
  "updatedAt": "2026-05-03T17:33:41.277Z"
}
```

**Errores**
- 400: nombre/correo faltantes o inválidos
- 409: correo ya existente

**Ejemplo 400**

```json
{
  "error": "El campo correo es obligatorio y debe ser válido (máx 160)"
}
```

**Ejemplo 409**

```json
{
  "error": "Ya existe un usuario con ese correo"
}
```

### GET /usuarios
Lista todos los usuarios.

**Respuesta 200**

```json
[
  {
    "id": 1,
    "nombre": "Ana",
    "correo": "ana@example.com",
    "createdAt": "2026-05-03T17:33:41.277Z",
    "updatedAt": "2026-05-03T17:33:41.277Z"
  }
]
```

### GET /usuarios/:id
Obtiene un usuario por ID.

**Parámetros**
- `id` (number, entero positivo)

**Respuesta 200**

```json
{
  "id": 1,
  "nombre": "Ana",
  "correo": "ana@example.com",
  "createdAt": "2026-05-03T17:33:41.277Z",
  "updatedAt": "2026-05-03T17:33:41.277Z"
}
```

**Errores**
- 400: id inválido
- 404: usuario no encontrado

**Ejemplo 404**

```json
{
  "error": "Usuario no encontrado"
}
```

### PUT /usuarios/:id
Actualiza `nombre` y/o `correo` de un usuario.

**Parámetros**
- `id` (number, entero positivo)

**Body (enviar al menos un campo)**

```json
{
  "nombre": "Ana Maria"
}
```

**Respuesta 200**

```json
{
  "id": 1,
  "nombre": "Ana Maria",
  "correo": "ana@example.com",
  "createdAt": "2026-05-03T17:33:41.277Z",
  "updatedAt": "2026-05-03T17:34:12.474Z"
}
```

**Errores**
- 400: id inválido, body vacío, nombre/correo vacío o correo inválido
- 404: usuario no encontrado
- 409: correo ya existente

### DELETE /usuarios/:id
Elimina un usuario por ID.

**Parámetros**
- `id` (number, entero positivo)

**Respuesta 200**

```json
{
  "mensaje": "Usuario eliminado correctamente"
}
```

**Errores**
- 400: id inválido
- 404: usuario no encontrado

## Errores generales

### 404 Ruta no encontrada

```json
{
  "error": "Ruta no encontrada"
}
```

