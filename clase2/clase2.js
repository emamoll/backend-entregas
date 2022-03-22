class Usuario {
    nombre;
    apellido;
    libros;
    mascotas;
    constructor (nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido,
        this.libros = [],
        this.mascotas = []
    }
 
    getFullName = () => {
        console.log(`Hola, soy ${this.nombre} ${this.apellido}`);
    }
 
    addMascota = (animal) => {
        this.mascotas.push(animal)
    }
 
    countMascotas= () => {
        console.log(this.mascotas.length);
    }
 
    addBook = (libro, autor) => {
        this.libros.push({nombre:libro, autor:autor})
    }
 
    getBookNames = () => {
        let nombreLibros = this.libros.map(tituloLibro => tituloLibro.nombre)
        console.log(nombreLibros);
    }
}
 
let usuario1 = new Usuario('Emanuel', 'Moll');
usuario1.getFullName();
usuario1.addMascota('Gato');
usuario1.addMascota('Perro');
usuario1.countMascotas();
usuario1.addBook('Martin Fierro', 'Jose Hernandez');
usuario1.addBook('El quijote', 'Miguel de Cervantes');
usuario1.getBookNames();
