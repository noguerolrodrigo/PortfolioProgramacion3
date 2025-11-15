// 'DOMContentLoaded' es un evento que se dispara cuando todo el HTML
// ha sido cargado y analizado por el navegador.
// Ponemos todo nuestro código dentro de este 'listener'
// para asegurarnos de que no intentamos buscar botones o links que aún no existen.
document.addEventListener('DOMContentLoaded', () => {

    /* ========================================= */
    /* --- BLOQUE 1: CÓDIGO DEL MENÚ HAMBURGUESA --- */
    /* ========================================= */
    // Explicación: Este bloque hace que el botón ☰ muestre y oculte el menú en móviles.

    // 1. Guardamos en "variables" los elementos del HTML que necesitamos manipular.
    // 'const' significa que esta variable no cambiará.
    // 'document.querySelector' es la forma de "buscar" un elemento en el HTML usando su clase.
    const hamburgerBoton = document.querySelector('.hamburger'); // El botón ☰
    const navLinks = document.querySelector('.nav-links');     // El menú que se oculta

    // 2. Agregamos un 'oyente de eventos' (Event Listener) al botón.
    // Le decimos: "Cuando alguien haga 'click' en ti (hamburgerBoton)..."
    hamburgerBoton.addEventListener('click', () => {
        
        // 3. "...ejecuta esta función".
        // 'classList.toggle' es la magia:
        // Si 'navLinks' TIENE la clase '.active', se la QUITA.
        // Si 'navLinks' NO TIENE la clase '.active', se la PONE.
        // (El CSS que escribimos antes se encarga de mostrar u ocultar el menú basado en esta clase).
        navLinks.classList.toggle('active');
    });

    /* ======================================================== */
    /* --- BLOQUE 2: CÓDIGO DEL SCROLL ACTIVO (SCROLLSPY) --- */
    /* ======================================================== */
    // Explicación: Este bloque resalta el link del menú (ej: "Sobre Mí")
    // cuando el usuario hace scroll y llega a esa sección.

    // 1. Seleccionamos TODOS los elementos <section> que tengan un atributo [id].
    const secciones = document.querySelectorAll('section[id]');
    
    // 2. Seleccionamos TODOS los links <a> que estén dentro de '.nav-links'.
    const linksDelNav = document.querySelectorAll('.nav-links a');

    // 3. Creamos una función (un bloque de tareas) que se ejecutará CADA VEZ que el usuario haga scroll.
    const alHacerScroll = () => {
        // 'window.pageYOffset' nos da la posición vertical actual del scroll (cuántos píxeles hemos bajado).
        let scrollY = window.pageYOffset; 

        // 4. Recorremos (loop) cada una de las secciones que guardamos (Inicio, Sobre Mí, etc.).
        secciones.forEach(seccionActual => {
            // Obtenemos la altura total de la sección actual.
            const alturaSeccion = seccionActual.offsetHeight;
            // Obtenemos a qué altura de la página empieza la sección.
            // Le restamos 70px para compensar la altura del navbar (que es fijo y "tapa" el inicio de la sección).
            const topSeccion = seccionActual.offsetTop - 70;
            // Obtenemos el 'id' de la sección (ej: "sobre-mi").
            let idSeccion = seccionActual.getAttribute('id');

            // 5. Esta es la lógica:
            // SI el scroll actual es MAYOR que el inicio de la sección
            // Y SI el scroll actual es MENOR que el final de la sección...
            if (scrollY > topSeccion && scrollY <= topSeccion + alturaSeccion) {
                
                // 6. ...entonces SÍ estamos dentro de esta sección.
                // Ahora, recorremos TODOS los links del nav...
                linksDelNav.forEach(link => {
                    // a. Primero, le quitamos la clase 'active' a TODOS los links (para limpiar).
                    link.classList.remove('active');
                    
                    // b. Luego, comprobamos si el 'href' del link (ej: "#sobre-mi")
                    //    coincide con el 'id' de la sección actual (ej: "sobre-mi").
                    if (link.getAttribute('href') == '#' + idSeccion) {
                        
                        // c. Si coincide, SÓLO a este link le añadimos la clase 'active'.
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    // 7. Le decimos a la ventana (window) que 'escuche' el evento 'scroll'
    // y que cada vez que ocurra, ejecute la función 'alHacerScroll' que creamos arriba.
    window.addEventListener('scroll', alHacerScroll);

    /* =============================================================== */
    /* --- BLOQUE 3: CÓDIGO PARA CERRAR EL MENÚ MÓVIL AL HACER CLIC --- */
    /* =============================================================== */
    // Explicación: Esto es una mejora de Usabilidad (UX). En móvil, cuando
    // tocas un link (ej: "Contacto"), el menú se debe cerrar solo.

    // Recorremos todos los links del nav que guardamos antes.
    linksDelNav.forEach(link => {
        // A cada link le ponemos un 'oyente de click'.
        link.addEventListener('click', () => {
            
            // Cuando el usuario haga clic en un link...
            // 1. Preguntamos si el menú móvil está abierto (si tiene la clase '.active').
            if (navLinks.classList.contains('active')) {
                
                // 2. Si está abierto, forzamos que se cierre (usando 'toggle' de nuevo).
                navLinks.classList.toggle('active');
            }
        });
    });
});