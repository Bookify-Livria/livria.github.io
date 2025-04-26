# Livria - Bookfy Landing Page

Bienvenido 👋 al repositorio oficial de la **Landing Page de Livria** 📚, una plataforma digital para la gestión y recomendación de libros. Este proyecto fue desarrollado utilizando HTML, CSS y JavaScript, siguiendo las mejores prácticas de desarrollo web y control de versiones.

## 📌 Descripción del Proyecto

La Landing Page de Livria tiene como objetivo principal brindar una presentación atractiva, clara e informativa sobre los servicios que ofrece la plataforma **Bookfy - Livria**. Está diseñada para proporcionar a los usuarios una navegación fluida, accesible desde distintos dispositivos y con funcionalidades interactivas clave.

> ⭐ **Livria** es una aplicación web diseñada para revolucionar la manera en que las personas adquieren y disfrutan de los libros.  
> A través de una **plataforma intuitiva y accesible**, ofrece una **amplia selección de títulos**, permitiendo a los usuarios explorar y comprar sus lecturas favoritas de forma **fácil y rápida**.  
>   
> Con el objetivo de **fomentar el hábito de la lectura** y crear una **comunidad de amantes de los libros**, Livria facilita la conexión entre los lectores y el mundo literario en un **entorno digital moderno**.

## ⚙️ Tecnologías Utilizadas

- **HTML5**: Para estructurar el contenido y asegurar semántica web adecuada.
- **CSS3**: Para el diseño responsivo y estilizado de los elementos visuales.
- **JavaScript (ES6+)**: Para funcionalidades interactivas y mejora de experiencia de usuario.
- **Git & GitHub**: Para el control de versiones del proyecto.
- **GitHub Pages**: Para el despliegue gratuito de la landing page.
- **Figma**: Para el prototipado visual de las secciones pertenecientes a la landing page.

## 🚀 Deploy del Proyecto

La landing page está desplegada de manera pública usando **GitHub Pages**.

🔗 [Haz clic aquí para verla en vivo](https://bookify-livria.github.io/livria.github.io/)

_Nota: Puedes descargar o clonar el repositorio del proyecto para visualizar la landing page de manera local. [Leer tutorial.](https://docs.github.com/es/repositories/creating-and-managing-repositories/cloning-a-repository)_

## 📁 Estructura del Repositorio

```
livria.github.io/
│
├── index.html             # Página principal del sitio web.
├── LICENSE.md             # Licencia del proyecto.
├── README.md              # Documentación general del proyecto.
│
└── public/                # Archivos estáticos del sitio.
    ├── assets/            # Recursos multimedia y estilos.
    │   ├── fonts/         # Fuentes personalizadas.
    │   │   ├── Alexandria/
    │   │   └── Asap-Condensed/
    │   ├── images/        # Imágenes usadas en el sitio.
    │   │   ├── home/          # Para la sección de inicio.
    │   │   ├── services/      # Para la sección de servicios.
    │   │   └── logo/          # Variantes del logo.
    │   │       ├── app_web/
    │   │       └── startup/
    │   ├── scripts/       # Archivos JavaScript.
    │   │   ├── i18n.js        # Traducciones.
    │   │   └── index.js       # Funciones principales.
    │   └── styles/        # Hojas de estilo CSS.
    │       ├── components/    # Estilos por componente.
    │       │   ├── fonts.css      # Fuentes.
    │       │   ├── scrollbar.css  # Scroll personalizado.
    │       │   └── variables.css  # Variables globales.
    │       └── index.css      # Estilo general.
    │
    └── sections/         # Secciones HTML reutilizables (a futuro).
```

## 🔁 Control de Versiones - Workflow

Este proyecto utiliza el modelo **GitFlow** para una gestión eficiente del código:

| Rama | Descripción |
|------|-------------|
| `main` | Contiene el código listo para producción |
| `develop` | Rama para integrar nuevas funcionalidades antes de producción |
| `feature/*` | Ramas para nuevas funcionalidades |
| `release/*` | Preparación de versiones estables |
| `hotfix/*` | Correcciones urgentes en producción |

### 📌 Convenciones de nombres de ramas

- Feature: `feature/nombre-descriptivo`
- Release: `release/x.y.z`
- Hotfix: `hotfix/nombre-descriptivo`

## 🧩 Versionado Semántico

Se sigue **Semantic Versioning 2.0.0** en el formato `MAJOR.MINOR.PATCH`.  
Ejemplos:
- `v1.0.0` - Primera versión estable.
- `v1.1.0` - Nueva funcionalidad añadida.
- `v1.1.1` - Corrección de errores menores.

## ✍️ Convenciones de Commits

Se adopta el estándar **Conventional Commits** para claridad en el historial:

| Tipo | Ejemplo |
|------|---------|
| `feat` | `feat: agregar barra de navegación` |
| `fix` | `fix: corregir error en formulario` |
| `docs` | `docs: actualizar README` |
| `style` | `style: mejorar formato CSS` |
| `refactor` | `refactor: optimizar función de búsqueda` |
| `test` | `test: añadir pruebas unitarias` |

## 🎨 Guía de Estilo del Código

### Principios Generales

- Código en inglés
- Indentación de 2 espacios
- Principio DRY (Don’t Repeat Yourself)

### HTML
- Semántica y estructura clara
- Uso de etiquetas como `<header>`, `<section>`, `<main>`, etc.
- Comillas dobles para atributos
- Elementos y atributos en minúscula

### CSS
- Organización por bloques lógicos: layout, box-model, tipografía, color, visual
- Nomenclatura BEM (`.book-card__title`, `.book-card--featured`)
- Evitar anidamientos mayores a 3 niveles

### JavaScript
- `camelCase` para variables y funciones
- `PascalCase` para clases
- `UPPER_SNAKE_CASE` para constantes
- Uso de `const` por defecto
- Funciones de flecha, ES6+, destructuring, etc.

## 🧪 Buenas Prácticas

- Código limpio y modular
- Comentarios solo cuando son necesarios
- Uso de recursos web oficiales como:
  - [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
  - [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
  - [Microsoft C# Coding Conventions](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)

## 👨‍💻 Contribución

Si deseas contribuir a este proyecto:

1. Crea un fork
2. Crea una rama `feature/nueva-funcionalidad`
3. Realiza tus cambios
4. Abre un Pull Request hacia `develop`

## 🧾 Licencia

Este proyecto está bajo la licencia **MIT**. Puedes ver más detalles en el archivo [LICENSE](LICENSE.md).

## 🛠️ Equipo
1. [Argomedo Jhosep](https://github.com/JhosepAC)
2. [Borja Gabriel](https://github.com/borj410)
3. [Brinda Marcelo](https://github.com/MarceloHkd)
4. [Castillo Ainhoa](https://github.com/noaa01100001)
5. [Sulca Melisa](https://github.com/MSS02204)

## 📬 Contacto

¿Dudas, sugerencias o comentarios?  
No dudes en escribirnos a: **contacto@livria.com**

---

¡Gracias por visitar nuestro proyecto! 📚✨