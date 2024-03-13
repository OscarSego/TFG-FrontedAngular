// user-carrito.interface.ts
export interface UserCarrito {
    id: number;
    email: string;
    creado: Date;
  }
  
  // user-item-carrito.interface.ts
  export interface UserItemCarrito {
    id: number;
    carrito: UserCarrito;
    producto: Producto;
    usuario_id: number;
    cantidad: number;
    nombre_producto: string;
    precio_producto: number;
    imagen_producto: string;
  }

  export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
  }