// Importo librerias necesarias
import { fileURLToPath } from 'url'; 

// Proceso argumentos quitando lo que no me sirve
const args = process.argv.slice(2);

const [comando,subComando,title,price,category]=args;
console.log(`${comando}\n${subComando}\n${title}`)
// let comando=args[0];


// let data=args[1];
// console.log(args.length);
const URL=" https://fakestoreapi.com/products"
const AYUDA="----------------------------------------------------------------------\n"+
            "COMANDO INCORRECTO.\n"+
            "Las opciones son:\n"+
            "Listar todos   : npm run start GET products\n"+
            "Listar por id  : npm run start GET products/id\n"+
            "Listar Agregar : npm run start POST products <title> <price> <category>\n"+
            "Listar Eliminar: npm run start DELETE products/id\n"+
            "----------------------------------------------------------------------\n";
const config = { 
    method: '',
    headers: { 
       'Content-Type': 'application/json',
    },
    // body:{} 
};
const producto={
  "id":0,
  "title": "string",
  "price": 0.0,
  "description": "string",
  "category": "string",
  "image": "http://example.com"
}
if (args.length==1){
    console.log(AYUDA);
}else{
switch (comando){
    case 'GET':
        config.method='GET';
        // procesa el get para 1 solo producto(if) o para todos(else)
        if(subComando.includes("/")){
            let id=subComando.split("/")[1];
            getData(URL + "/"+id,config);
        
        }else{
            getData(URL,config);      
        }
        break;
    case 'POST': 
        if (args.length==5)
        {
            producto.title=title;//args[2];
            producto.price=price;//args[3];
            producto.category=category;//args[4];
            config.method='POST';   
            config.body= JSON.stringify(producto);
            getData(URL ,config);
        }else{
            console.log("Ingreso incorrecto el comando tiene la forma:");
            console.log("npm run start POST products <title> <price> <category>");
        }
    
        break;
    
    case 'DELETE':
        config.method='DELETE';
        if(subComando.includes("/")){
            let id=subComando.split("/")[1];
            getData(URL+"/"+id,config);
 
        }else{
            console.log ("Comando incorrecto.Debe ingresar el ID del producto a eliminar");
            console.log("npm run start DELETE products/id");
        }
        break;
    default: console.log(AYUDA);
    }
}

// Funcion para comunicacion con la API
async function getData(url,configuracion) {
//   const url = "https://fakestoreapi.com/product";
  try {
    const respuesta = await fetch(url,configuracion);
    if (!respuesta.ok) {
      throw new Error("Response status: "+respuesta.status);
    }

    const data = await respuesta.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}