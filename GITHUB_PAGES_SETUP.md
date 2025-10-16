# Instrucciones para Activar GitHub Pages

## 📝 Pasos para Habilitar GitHub Pages

Una vez que este Pull Request sea mergeado a la rama `main`, sigue estos pasos para activar GitHub Pages:

### 1. Ir a la Configuración del Repositorio
- Ve a tu repositorio en GitHub: https://github.com/JuanBeltrame/Javascript-WebComponents
- Haz clic en **Settings** (Configuración)

### 2. Configurar GitHub Pages
- En el menú lateral izquierdo, busca y haz clic en **Pages**
- En la sección **Source** (Origen):
  - Selecciona **GitHub Actions** del menú desplegable
  - (No es necesario seleccionar una rama, ya que el workflow lo maneja automáticamente)

### 3. Esperar el Deployment
- El workflow de GitHub Actions se ejecutará automáticamente
- Puedes ver el progreso en la pestaña **Actions** del repositorio
- El deployment tardará aproximadamente 1-2 minutos

### 4. Acceder al Sitio
Una vez completado el deployment, tu sitio estará disponible en:

**URL Principal:** https://juanbeltrame.github.io/Javascript-WebComponents/

**Proyectos individuales:**
- https://juanbeltrame.github.io/Javascript-WebComponents/GestorDeConsultas/
- https://juanbeltrame.github.io/Javascript-WebComponents/ModalComponent/
- https://juanbeltrame.github.io/Javascript-WebComponents/TabsComponent/
- https://juanbeltrame.github.io/Javascript-WebComponents/ContadorPalabras/
- https://juanbeltrame.github.io/Javascript-WebComponents/TextoEditable/
- https://juanbeltrame.github.io/Javascript-WebComponents/ListaEditable/
- https://juanbeltrame.github.io/Javascript-WebComponents/ImputComponent/
- https://juanbeltrame.github.io/Javascript-WebComponents/TarjetasHTML/

## 🔄 Actualizaciones Automáticas

Una vez configurado, cada vez que hagas un push a la rama `main`:
1. GitHub Actions ejecutará el workflow automáticamente
2. Los cambios se desplegarán a GitHub Pages
3. El sitio se actualizará en aproximadamente 1-2 minutos

## ✅ Verificación

Para verificar que todo está funcionando:
1. Ve a la pestaña **Actions** en tu repositorio
2. Deberías ver un workflow llamado "Deploy to GitHub Pages" ejecutándose o completado
3. El estado debe ser verde (✓) indicando éxito
4. Haz clic en el workflow para ver los detalles del deployment

## 🎉 ¡Listo!

Una vez completados estos pasos, tus proyectos de Web Components estarán disponibles públicamente en GitHub Pages.
