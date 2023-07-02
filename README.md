# Pix-o-Mate
 Prueba Kampaoh

## Instalación:
Para poder visualizar la aplicación debemos instalar los siguientes elementos:

1. NodeJs, versión: 18.16.1
   
2. Instalador de paquetes NPM, versión: 9.7.2

**Paso 1**. Instalar NodeJS en su versión, para eso entraremos a su web oficial y descargaremos el instalador más actualizado https://nodejs.org/es/. Para comprobar que esté instalado correctamente podemos abrir la consola de comandos de Windows (CMD), y escribir: _node -v_
Y para comprobar el instalador de paquetes: _npm -v_

**Paso 2**. Nos clonamos el repositorio en alguna ruta de nuestro ordenador, por ejemplo en el escritorio. Y usando la consola de comandos de windows o usando nuestro IDE favorito (Por ejemplo, Visual Studio), apuntamos a su ruta con el comando _"cd"_. Por ejemplo: _**cd "C:\Users\usuario\Desktop\pix-o-mate"**_

**Paso 3**. Si todo ha ido correctamente y una vez que estemos apuntando a esa ruta, ejecutamos el comando _**npm install**_ esto hará que se descargue cualquier dependencia que requiera el proyecto. A parte de los paquete que trae por defecto. Se ha instalado axios y sass.

**Paso 4**. Por último, cuando acabe la instalación usamos el comando _**npm start**_ y se iniciará nuestra aplicación, desplegandose en la url http://localhost:3000/

## Aclaraciones:
**HEADER**. En la cabecera, al pulsar sobre el icono del corazón se muestra el listado de usuarios favoritos. Se ha añadido un botón para eliminarlos todos de la caché si así se quiere.
**LISTADO DE SEARCH Y OWNERS**. Se ha habilitado un botón en la cabecera para alternar entre cargar más usuarios a la lista pulsando sobre en botón "Ver más" y el "infinite scroll".
**DETALLE DE SEARCH Y OWNERS**. Cuando se despliega el detalle aparece el botón de añadir a favoritos, y al añadirse, éste cambia y da la opción de eliminarlo de favoritos.
**ACTUALIZACIÓN AL ABRIR DEL DETALLE**. Al abrir el detalle, se realiza una llamada al detalle del usuario seleccionado para comprobar posibles actualizaciones. Se muestra el posible cambio en el detalle y en el listado.
**BUSCADOR DE LA PÁGINA SEARCH**. Se ha dejado el botón de petición junto con la búsqueda automática tras escribir más de dos letras en él para que sean visibles ambas funcionalidades. También te permite pulsar el botón si no hay ninguna letra puesta. Ésto último está hecho adrede para poder traer el listado de nuevo sin ningún parametro de filtrado en la petición, pero se ha hecho la funcionalidad de bloquear la llamada a la api si es menor de 2 letras.
**El primer punto de: Becoming a pro...**. Éste punto, aunque no aparezca en una página nueva bajo la url _/pro_, ya estaría diseñada en la propia página bajo la url _/search_. Ya que tanto las páginas _/owner_ y _/search_ utilizan el mismo componente y se comporta como se describe en dicho punto.
**PROBLEMAS ENCONTRADOS**. El último día antes del envío la web que daba el servicio de la API se encontraba caída. https://gorest.co.in/

## Puntos del reto sin realizar:
**El punto 3 de: Subiendo el reto**
No he tenido tiempo de realizar ningún apartado de éste último y tampoco consultar su funcionamiento debido a la caída del dominio el domingo día 2 de Julio. https://gorest.co.in/
**El último punto de: Becoming a Pro...**
