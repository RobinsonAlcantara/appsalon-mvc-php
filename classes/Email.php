<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email{

    public $email;
    public $nombre;
    public $token; 

    public function __construct($email,$nombre,$token)
    {
        $this->email=$email;
        $this->nombre=$nombre;
        $this->token=$token;

    }

    public function enviarConfirmacion(){
        //crear el mail
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV['EMAIL_PORT'];
        $mail->Username = $_ENV['EMAIL_USER'];
        $mail->Password = $_ENV['EMAIL_PASS'];
    
     
        //Usamos Html para la creacion del Body del mensaje
        
        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $mail->Subject = 'Confirma tu correo';

        //Set HTML
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';

        $contenido="<html>";
        $contenido.="<p><strong>Hola ". $this->nombre ."</strong> Has creado tu cuenta en AppSalon, solo debes confirmar tu cuenta presionando el siguiente enlace:</p>";
        $contenido.="<p> Presiona aqui: <a href='". $_ENV['APP_URL']."/confirmar-cuenta?token=". $this->token ."'>Confirmar cuenta</a></p>";
        $contenido.="<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
        $contenido.="</html>";

        $mail->Body = $contenido;
        
        //ENVIAR EL EMAIL
        $mail->send();        

    }

    public function enviarInstrucciones(){
         //crear el mail
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV['EMAIL_PORT'];
        $mail->Username = $_ENV['EMAIL_USER'];
        $mail->Password = $_ENV['EMAIL_PASS'];
     
      
         //Usamos Html para la creacion del Body del mensaje
         
         $mail->setFrom('cuentas@appsalon.com');
         $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');
         $mail->Subject = 'Reinicia tu contraseña';
 
         //Set HTML
         $mail->isHTML(true);
         $mail->CharSet = 'UTF-8';
 
         $contenido="<html>";
         $contenido.="<p><strong>Hola ". $this->nombre ."</strong> Has solicitado reinicar tu password en AppSalon, presiona el siguiente enlace:</p>";
         $contenido.="<p> Presiona aqui: <a href='". $_ENV['APP_URL']."/recuperar?token=". $this->token ."'>Reiniciar password</a></p>";
         $contenido.="<p>Si tu no solicitaste este cambio, puedes ignorar el mensaje</p>";
         $contenido.="</html>";
 
         $mail->Body = $contenido;
         
         //ENVIAR EL EMAIL
         $mail->send();        
    }
}

