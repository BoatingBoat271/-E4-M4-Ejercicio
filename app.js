/*
  Simulación de Funciones de API
  Estas funciones simulan llamadas a una red. No las modifiques.
*/

// API para obtener datos de un usuario
const obtenerUsuario = (id, callback) => {
    // Simula una demora aleatoria entre 0.5 y 1.5 segundos
    const demora = Math.random() * 1000 + 500;
    setTimeout(() => {
        // Simula un posible error
        if (!id) {
            callback('Error: ID de usuario no proporcionado.', null);
            return;
        }
        console.log(`Buscando usuario con ID: ${id}...`);
        const usuario = { id: id, nombre: 'John Doe', email: 'john.doe@example.com' };
        callback(null, usuario);
    }, demora);
};

// API para obtener los posts de un usuario
const obtenerPosts = (userId, callback) => {
    const demora = Math.random() * 1000 + 500;
    setTimeout(() => {
        if (!userId) {
            callback('Error: ID de usuario no proporcionado para buscar posts.', null);
            return;
        }
        console.log(`Buscando posts del usuario con ID: ${userId}...`);
        const posts = [
            { id: 101, titulo: 'Mi primer post', contenido: '...' },
            { id: 102, titulo: 'Mi segundo post', contenido: '...' }
        ];
        callback(null, posts);
    }, demora);
};

// API para obtener los comentarios de un post
const obtenerComentarios = (postId, callback) => {
    const demora = Math.random() * 1000 + 500;
    setTimeout(() => {
        if (!postId) {
            callback('Error: ID de post no proporcionado para buscar comentarios.', null);
            return;
        }
        console.log(`Buscando comentarios del post con ID: ${postId}...`);
        const comentarios = [
            { id: 1, texto: '¡Excelente post!' },
            { id: 2, texto: 'Muy informativo, gracias.' }
        ];
        callback(null, comentarios);
    }, demora);
};

//  Parte 1: La Solución con Callbacks (El "Callback Hell")
// obtenerUsuario(5, (error, usuario) => {
//     if (error) {
//         console.log(error)
//     } else {
//         obtenerPosts(usuario.id, (error, posts) => {
//             if (error) {
//                 console.log(error)
//             } else {
//                 obtenerComentarios(posts[0].id, (error, comentarios) => {
//                     if (error) {
//                         console.log(error)
//                     } else {
//                         console.log("Comentarios obtenidos (callback):", comentarios)
//                     }
//                 })
//             }
//         })
//     }
// });


//Parte 2: Refactorización a Promesas

const obtenerUsuarioPromesa = (id) => {
    return new Promise((resolve, reject) => {
        obtenerUsuario(id, (err, usuario) => {
            if (err) reject(err);
            else resolve(usuario)
        })
    })
}

const obtenerPostPromesa = (userId) => {
    return new Promise((resolve, reject) => {
        obtenerPosts(userId, (err, posts) => {
            if (err) reject(err)
            else resolve(posts)
        })
    })
}

const obtenerComentarioPromesa = (postId) => {
    return new Promise((resolve, reject) => {
        obtenerComentarios(postId, (err, comentarios) => {
            if (err) reject(err)
            else resolve(comentarios)
        })
    })
}

// obtenerUsuarioPromesa(2)
//     .then(usuario => obtenerPostPromesa(usuario.id))
//     .then(posts => obtenerComentarioPromesa(posts[0].id))
//     .then(comentarios => console.log("comentarios obtenidos (promesas):", comentarios))
//     .catch(error => console.log(error))

//Parte 3: La Solución Moderna con Async/Await

const mostrarPerfilUsuario = async () => {
    try {
        const usuario = await obtenerUsuarioPromesa(4)
        const posts = await obtenerPostPromesa(usuario.id)
        const comentarios = await obtenerUsuarioPromesa(posts[0].id)

        console.log("Comentarios obtenidos (Async/Await):", comentarios)
    } catch (error) {
        console.error("Error en el proceso asincrono:", error)
    }
}
mostrarPerfilUsuario()