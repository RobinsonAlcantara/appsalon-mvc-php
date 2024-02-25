<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina" >Colocar tu nuevo password a continuacion</p>

<?php
    include_once __DIR__.'/../templates/alertas.php';
?>

<?php if($error===true) return; ?>

<form class="formulario" method="POST">
    <div class="campo">
        <label for="password">Password</label>
        <input 
        type="password" 
        name="password" 
        id="password"
        placeholder="Tu nuevo password" 
        />
        
    </div>
    <input type="submit" class="boton" value="Guardar Nuevo Password">

</form>

<div class="acciones">
    <a href="/">Tienes cuenta? Inicia Sesion</a>
    <a href="/crear cuenta">No tienes cuenta? crea una</a>
</div>