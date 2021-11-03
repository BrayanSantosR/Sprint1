const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

let templateCard= document.getElementById("template-card").content;
let fragment = document.createDocumentFragment();
let items = document.getElementById("items");

items.addEventListener('click', async(e) =>{//items es el id de la division que contiene todas las tarejetas
    //console.log(e.target.classList.contains('btn-dark'));//retorna un true o un false si el elemento contiene esa clase
    console.log("evento tarjeta")    
    if(e.target.classList.contains('btn-dark')){
        //console.log(e.target.dataset.id);me devuelve el id de la tarjeta solo si hago click en el botone.target.dataset.id
      
        document.getElementById("ventanamergente1").style.display="block";
        document.getElementById("slider").style.display="none";//para abrir la ventana
        document.getElementById("items").style.display="none";  
        let IdPelicula = e.target.dataset.id;
        let data = await getData();
        data.forEach(element => {
            let {id,poster_path,vote_average,title}=element;
            //templateCard.querySelector('h5').textContent=title;
            if(element.id==IdPelicula){
                detalles.innerHTML="";
                detalles.innerHTML = `                
                            <h5 class="card-title">${title}</h5>
                            <img src=${IMG_PATH+poster_path} class="card-img" alt="..."> 
                            <p class="description">Descripcion Pelicula<br>
                            <p>No se encuentra con descripcion hasta el momentos</p></p>
                            <button class="btnDescription">ver</button>
                            ` 
            } 
        });  
        console.log("probando");
    
    }
})

const getData = async()=>{

    let url = API_URL;
    let respuesta= await fetch(url);
    //console.log(respuesta);
    let datos = await respuesta.json();
    console.log(datos);
    let {results}=datos;
    //console.log(results);
    return results;
}
//getData();
const showData= async()=>{
    let data = await getData();
    data.forEach(element => {
        let {id,poster_path,vote_average}=element;
        //templateCard.querySelector('h5').textContent=title;
        //templateCard.querySelector('span').classList.add("clase");
        templateCard.querySelector('span').textContent=(vote_average);
        templateCard.querySelector('img').setAttribute('src',IMG_PATH+poster_path);
        templateCard.querySelector('.btn-dark').dataset.id=id;
        const clone=templateCard.cloneNode(true);//clona el nodo
        fragment.appendChild(clone);//apila los herores uno sobre otro eso hace appendchild       
    });

 items.appendChild(fragment);//le entrego todo el fragmento a items
    //console.log(data);
}

showData()
document.addEventListener('DomContentLoaded',showData);

let slider= document.getElementById("slider");
let boton= document.getElementById("btnBuscar");
boton.addEventListener('click',async()=>{
    formulario.innerHTML="";
    //items.innerHTML ="";
    let texto = document.getElementById("inputBuscar").value;
    let data = await getData();
    let busqueda=data.filter(elemento=>elemento.title.toLowerCase()==texto.toLowerCase())//filter compara y trae todo el elemento
    console.log(busqueda);
    if(busqueda!=""){
    busqueda.forEach(element => {
        let {id,poster_path,vote_average,overview}=element;
        //templateCard.querySelector('h5').textContent=title;
        templateCard.querySelector('span').classList.add("clase");
        templateCard.querySelector('span').textContent=(vote_average);
        templateCard.querySelector('img').setAttribute('src',IMG_PATH+poster_path);
        templateCard.querySelector('.btn-dark').dataset.id=id;
        const clone=templateCard.cloneNode(true);//clona el nodo
        fragment.appendChild(clone);//apila los herores uno sobre otro eso hace appendchild
        console.log(fragment);
    });    
    items.innerHTML ="";
    items.innerHTML ='<div id="resultadobusqueda">RESULTADO DE LA BUSQUEDA</div>';
    items.appendChild(fragment);//le entrego todo el fragmento a items
}else{
    items.innerHTML ="";
    items.innerHTML=`
    <div class="resultadobusqueda">RESULTADO DE LA BUSQUEDA</div>'
    <h1 class="resultadobusqueda"> Lo sentimos</h1>
    <img class="imgNoresul" src="./Style/imagenes/iframe.png">
    
    <div class="resultadobusqueda">La pelicula ${texto}  No se encuentra en el momento</div>`
}
})
//configurando todas
let btntodas=document.getElementById("todas")
btntodas.addEventListener('click',async()=>{
    items.innerHTML ="";
    formulario.innerHTML="";
    let data = await getData();
    data.forEach(element => {
        let {id,poster_path,vote_average}=element;
        //templateCard.querySelector('h5').textContent=title;
        
        templateCard.querySelector('span').classList.add("clase");
        templateCard.querySelector('span').textContent=(vote_average);
        templateCard.querySelector('img').setAttribute('src',IMG_PATH+poster_path);
        templateCard.querySelector('.btn-dark').dataset.id=id;
        const clone=templateCard.cloneNode(true);//clona el nodo
        fragment.appendChild(clone);//apila los herores uno sobre otro eso hace appendchild  
           
    });

 items.appendChild(fragment);//le entrego todo el fragmento a items
    
})
//configurando mas buscadas

let btnMasvaloradas=document.getElementById("mas-valoradas");

btnMasvaloradas.addEventListener('click',async()=>{    
    items.innerHTML ="";
    formulario.innerHTML="";
    let data = await getData();
    data.forEach(element => {
        let {id,poster_path,vote_average}=element;
        //templateCard.querySelector('h5').textContent=title;
        if(vote_average>=7.5){
        templateCard.querySelector('span').classList.add("clase");
        templateCard.querySelector('span').textContent=(vote_average);
        templateCard.querySelector('img').setAttribute('src',IMG_PATH+poster_path);
        templateCard.querySelector('.btn-dark').dataset.id=id;
        
        const clone=templateCard.cloneNode(true);//clona el nodo
        fragment.appendChild(clone);//apila los herores uno sobre otro eso hace appendchild  
        }    
    });

 items.appendChild(fragment);//le entrego todo el fragmento a items
    //console.log(data);
})

//configurando menos valoradas
btnMenosvaloradas=document.getElementById("menos-valoradas");
btnMenosvaloradas.addEventListener('click',async()=>{
    items.innerHTML ="";
    formulario.innerHTML="";
    let data = await getData();
    data.forEach(element => {
        let {id,poster_path,vote_average}=element;
        //templateCard.querySelector('h5').textContent=title;
        if(vote_average<7.5){
        templateCard.querySelector('span').classList.add("clase");
        templateCard.querySelector('span').textContent=(vote_average);
        templateCard.querySelector('img').setAttribute('src',IMG_PATH+poster_path);
        templateCard.querySelector('.btn-dark').dataset.id=id;
        
        const clone=templateCard.cloneNode(true);//clona el nodo
        fragment.appendChild(clone);//apila los herores uno sobre otro eso hace appendchild  
        }    
    });

 items.appendChild(fragment);//le entrego todo el fragmento a items
    //console.log(data);
     
})

       
function abrir(){
  
    document.getElementById("ventanamergente").style.display="block";
    document.getElementById("slider").style.display="none";//para abrir la ventana
    document.getElementById("items").style.display="none";
    document.querySelector("header").style.display="none";
}
function cerrarVentana(){
    document.getElementById("ventanamergente").style.display="none";//para cerrar la ventana
    document.getElementById("slider").style.display="block";
    document.getElementById("items").style.display="flex";
    document.querySelector("header").style.display="flex";
    //window.location.href = 'index.html';    
}
function abrir1(){
  
    document.getElementById("ventanamergente1").style.display="block";
    document.getElementById("slider").style.display="none";//para abrir la ventana
    document.getElementById("items").style.display="none";
    document.querySelector("header").style.display="none";
}
function cerrarVentana1(){
    document.getElementById("ventanamergente1").style.display="none";//para cerrar la ventana
    document.getElementById("slider").style.display="block";
    document.getElementById("items").style.display="flex";
    document.querySelector("header").style.display="flex";
    //window.location.href = 'index.html';    
}
function abrir2(){
  
    document.getElementById("ventanamergente2").style.display="block";
    document.getElementById("slider").style.display="none";//para abrir la ventana
    document.getElementById("items").style.display="none";
    document.querySelector("header").style.display="none";
}
function cerrarVentana2(){
    document.getElementById("ventanamergente2").style.display="none";//para cerrar la ventana
    document.getElementById("slider").style.display="block";
    document.getElementById("items").style.display="flex";
    document.querySelector("header").style.display="flex";
    //window.location.href = 'index.html';    
}
function abrir3(){
  
    document.getElementById("ventanamergente3").style.display="block";
    document.getElementById("slider").style.display="none";//para abrir la ventana
    document.getElementById("items").style.display="none";
    document.querySelector("header").style.display="none";
}
function cerrarVentana3(){
    document.getElementById("ventanamergente3").style.display="none";//para cerrar la ventana
    document.getElementById("slider").style.display="block";
    document.getElementById("items").style.display="flex";
    document.querySelector("header").style.display="flex";
    //window.location.href = 'index.html';    
}

//para mostrar informacion de tarjetas
let ventanaemergente1=document.getElementById("ventanamergente1").content;
let detalles= document.getElementById("detalles");







        
        
        

