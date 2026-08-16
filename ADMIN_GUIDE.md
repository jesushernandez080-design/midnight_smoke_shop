# 📱 Admin Dashboard - Guía Completa

## 🚀 Cómo Acceder al Admin

### Paso 1: Abre el sitio web
Visita: `http://localhost:8000` o abre `index.html` en tu navegador

### Paso 2: Busca el botón "Admin"
- **Ubica el botón en el FOOTER** (parte inferior de la página)
- Está a la **derecha** del footer, después del botón "Created by Jh Software Studio"
- Se ve así: **[Admin]** (botón gris pequeño)

### Paso 3: Haz clic en el botón "Admin"
- Se abrirá una ventana modal (cuadro de diálogo)
- Verás 4 pestañas: Owner Login | Manage Products | Inventory | Users & VIP

### Paso 4: Inicia sesión
- **Email:** `admin@midnight.shop`
- **Contraseña:** Cualquier texto de 6+ caracteres (ej: "password123")
- Haz clic en **"Login"**

### Paso 5: Accede al Inventory Management
Después de logearte, haz clic en la pestaña **"Inventory"**

---

## 📦 ¿Qué Ver en Inventory?

Verás una lista de todos tus productos con:

✅ **Imagen del producto** (thumbnail pequeño)  
✅ **Nombre del producto**  
✅ **Categoría e ID** (SKU)  
✅ **Campo de Stock** - Número editable con la cantidad actual  
✅ **Botones de Acción:**
   - 🏷️ **Print Label** - Imprime etiqueta del producto
   - 📮 **Request Restock** - Pide más stock rápidamente

✅ **Botón de Guardar** - "💾 Save All Changes" al fondo

---

## 🎯 Cómo Usar Inventory Management

### Para editar el stock:
1. Haz clic en el campo numérico de "Current Stock"
2. Cambia el número a la cantidad que desees
3. El botón "Save All Changes" cambiará a rojo con "Unsaved!"
4. Haz clic en el botón Save para guardar los cambios
5. Verás un ✅ y el botón volverá a su estado normal

### Para pedir restock rápido:
1. Haz clic en **"📮 Request Restock"** en cualquier producto
2. Te pedirá cuántas unidades deseas agregar
3. Ingresa el número (ej: 10, 50, 100)
4. El stock se actualiza automáticamente

### Para imprimir etiquetas:
1. Haz clic en **"🏷️ Print Label"** en cualquier producto
2. Verás los detalles del producto (nombre, stock, precio)
3. Puedes imprimirlo para poner en tu mostrador

---

## ⚠️ Indicadores Visuales

- **Línea roja en el borde izquierdo:** El producto tiene STOCK BAJO (menos de 10 unidades)
- **Número rojo en el campo:** Stock bajo - te lo indica visualmente
- **"⚠️ LOW STOCK":** Advertencia clara cuando stock < 10 unidades

---

## 💾 Guardar Cambios

**IMPORTANTE:** Debes hacer clic en el botón **"💾 Save All Changes"** para que los cambios se guarden.

El botón:
- Es **azul** normalmente
- Se pone **rojo** con "Unsaved!" cuando haces cambios
- Se pone **verde** con "✅ All Changes Saved!" después de guardar

---

## 🛠️ Si No Ves Productos

Si el inventory está vacío, primero ve a la pestaña **"Manage Products"** y crea algunos productos. Luego vuelve a Inventory para verlos.

---

## 📝 Prueba Rápida

1. Abre el sitio
2. Haz clic en "Admin" (bottom right del footer)
3. Login: `admin@midnight.shop` / `password`
4. Haz clic en "Inventory"
5. ¡Deberías ver los productos! ✅

Si no ves nada, abre la Consola del navegador (F12) y mira si hay errores.

---

**¿Sigue sin funcionar?** Dime exactamente qué ves o qué error aparece, y te ayudaré a solucionarlo. 🚀
