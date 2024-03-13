export interface Product{
    id: number;
    nombre: string;
    precio: number;
    categoria: string[]; 
    descripcion: string;
    autor: string; 
    imagen: string;
    created: string; 
    updated: string; 
}

export interface CartItem {
    id: number;
    product: number;
    quantity: number;
  }
  
  export interface Cart {
    id: number;
    user: number;
    products: CartItem[];
  }