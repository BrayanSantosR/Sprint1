let formulario= document.getElementById("form");
let btnCorreo= document.getElementById("btnCorreo");
let url='http://localhost:4006/usuarios';
let btnEditar= document.getElementById("btnEditar");

//la siguiente funcion es el metodo post, y se utiliza para añadir informacion
formulario.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let nombre=document.getElementById("name").value;
    let apellido=document.getElementById("lastName").value;
    let email= document.getElementById("email").value;
    let edad=document.getElementById("edad").value;

    await fetch(url,{
        method: 'POST',//TIPO DE METODO igual a postman
        body: JSON.stringify({     //para convertitr tipo json
           nombre,
           apellido,
           email,
           edad
        }),
        headers:{//se utiliza igual que en postman
            "Content-Type":"application/json; charset=UTF-8" 
        }    //para convertir a json
    })
})
// lo siguiente funcion  es para buscar por medio del correo
btnCorreo.addEventListener("click",async()=>{
    let email1 = document.getElementById("email").value;
    //console.log(email);
    const datos =await fetch(url);
    const data= await datos.json();
    document.getElementById("email").setAttribute("readonly",true);//preguntar que hace esto?
    console.log(data);
    
    let buscado=data.find(elemento => elemento.email.toLowerCase()===email1.toLowerCase()//find es una funcion para recorrer listas, o arreglos, un objeto no se recorre.

    );
    
    console.log(buscado);
    
    const {id,nombre, apellido, email,edad}= buscado;
    document.getElementById("name").value=nombre;
    document.getElementById("lastName").value=apellido;
    document.getElementById("email").value=email;
    document.getElementById("id").value=id;
    document.getElementById("edad").value=edad;
    
   
    

})


//la siguiente es para modificar datos 
btnEditar.addEventListener("click",async()=>{

    let id=document.getElementById("id").value;//.value por que es el valor de la caja de texto
    let nombre=document.getElementById("name").value;
    let apellido=document.getElementById("lastName").value;
    let email= document.getElementById("email").value;
    let edad=document.getElementById("edad").value;

    await fetch(url+"/"+id,{
        method: 'PUT',//TIPO DE METODO igual a postman
        body: JSON.stringify({     //para convertitr tipo json
           nombre,
           apellido,
           email,
           edad
        }),
        headers:{//se utiliza igual que en postman
            "Content-Type":"application/json; charset=UTF-8" 
        }    //para convertir a json
    })



})
// El siguiente es para eliminar con el correo buscado.
let btnEliminar=document.getElementById("btnEliminar");
btnEliminar.addEventListener('click',async(e) =>{
    let id =document.getElementById('id').value
    //console.log(id)
   
        await fetch(`${url}/${id}`,{
            method:'DELETE'    
          })
         })
       
    
//funciones del formulario