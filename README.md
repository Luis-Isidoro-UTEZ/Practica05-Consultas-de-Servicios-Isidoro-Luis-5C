# 05 - Actividad de implementación de consultas de servicios

Con la aplicación hecha durante la clase, de forma individual van a implementar el consumo de los servicios para el login y gestión de usuarios
Los servicios a ocupar serán de la pagina de https://fakestoreapi.com/docs#tag/Users

## Instrucciones:
- 2 rutas sin sesión: Home y Login, las demás estarán protegidas
- El Login deberá consumir del servicio de autenticación que ofrece la web de fakestoreapi en la vista de usuarios deberá listar en una tabla los usuarios que devuelva el servicio de getAllUsers de fakesotreapi  y un botón para crear nuevos usuarios
- La tabla de usuarios debe tener 2 botones por usuario
- el primer boton será para "Ver" -  deberá hacer una navegación a la vista de findOne, y por medio de params recibir el id del usuario seleccionado y consultar su información por medio de un useEffect y el respectivo servicio de fakestoreapi
- el segundo boton "Borrar" será para borrar al usuario con el respectivo servicio de fakestoreapi
- el botón para crear usuarios abrirá un "modal" o nos navegara a una nueva vista con un formulario para crear un nuevo usuario 

## Criterios de aceptación:
- Se tomara en cuenta estilos coherentes y estilizados (recomendación en uso de estilo material desing)
- Deberá hacer uso de componentes modulares y su reutilización, como botones, tablas, inputs, alertas (recomendación  de uso de la dependencia de sweet-alert para alertas)
- uso de props
- uso de params
- uso de useContext y rutas protegidas por wrapper ProtectedRoutes
- Los formularios deberan estar validados
- uso de los servicios de fakestoreapi para autenticación, consultar usuarios, borrar usuarios y agregar usuarios
- proyecto funcional
