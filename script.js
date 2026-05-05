function mostrar(id){
    let secciones = document.querySelectorAll("main section")
    secciones.forEach(s => s.classList.add("hidden"))

    document.getElementById(id).classList.remove("hidden")

    if(id === "proyectos"){
        mostrarDatos(datosGlobal)
    }
}

const tabla = document.getElementById("tabla")
const estado = document.getElementById("estado")
const buscador = document.getElementById("buscador")

let datosGlobal = []

fetch("data/data.json")
.then(res => res.json())
.then(datos => {
    datosGlobal = datos
    mostrarDatos(datosGlobal)
})
.catch(() => {
    estado.textContent = "Error"
})

function mostrarDatos(datos){

    tabla.innerHTML = ""

    if(datos.length === 0){
        estado.textContent = "Sin resultados"
        return
    }

    estado.textContent = ""

    datos.forEach(item => {

        let fila = document.createElement("tr")

        fila.innerHTML = `
        <td>${item.nombre}</td>
        <td>${item.tipo}</td>
        <td>${item.anio}</td>
        `

        tabla.appendChild(fila)
    })
}

buscador.addEventListener("input", () => {

    let texto = buscador.value.toLowerCase()

    let filtrados = datosGlobal.filter(item =>
        item.nombre.toLowerCase().includes(texto)
    )

    mostrarDatos(filtrados)
})