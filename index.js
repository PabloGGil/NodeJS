import { fileURLToPath } from 'url'; 
import path from 'path';

const args = process.argv.slice(2);
console.log(args);
let comando=args[0];


let data=args[1];
console.log(args.length);
const URL=" https://fakestoreapi.com"
const config = { 
    method: '',
    headers: { 
       'Content-Type': 'application/json',
    },
    // , 
};
const producto={
  "id":0,
  "title": "string",
  "price": 0.0,
  "description": "string",
  "category": "string",
  "image": "http://example.com"
}

switch (comando){
    case 'GET':
        config.method='GET';
        if(args[1].includes("/")){
            let id=args[1].split("/")[1];
            console.log("ID= "+ id);
            fetch(URL + "/products/"+id,config) 
            .then((response) => response.json()) 
            .then((data) =>console.log(data));
        }else{
            fetch(URL + "/products",config) 
            .then((response) => response.json()) 
            .then((data) => console.log(data));            
        }
        break;
    case 'POST': 
        if (args.length==5)
        {
            producto.title=args[2];
            producto.price=args[3];
            producto.category=args[4];
            config.method='POST';   
            config.body= JSON.stringify(producto);
            console.log(producto);
            fetch(URL + "/products") 
            .then((response) => response.json()) 
            .then((data) => console.log(data));
        }else{
            console.log("Ingreso incorrecto");
            console.log("npm run start POST products <title> <price> <category>");
        }
    
        break;
    
    case 'DELETE':
        config.method='DELETE';
        if(args[1].includes("/")){
            let id=args[1].split("/")[1];
            console.log("ID= "+ id);
            fetch(URL + "/products/"+id,config) 
            .then((response) => response.json()) 
            .then((data) =>console.log(data));
        }else{
            console.log ("debe ingresar el ID del producto a eliminar");
        }
        break;
    default: console.log("comando incorrecto");

}