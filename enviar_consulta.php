<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Incluye la librería PHPMailer
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $cantpersonas = $_POST["cantpersonas"];
    $empresa = $_POST["empresa"];

    $para = "contacto@lide-lounge.com"; 
    $asunto = "Nueva consulta Lide-Lounge";

    $mensaje_completo = "<h3>Nombre:</h3>" . $nombre . "\n";
    $mensaje_completo .= "<h3>Email:</h3>" . $email . "\n";
    $mensaje_completo .= "<h3>Telefono:</h3>" . $telefono . "\n";
    $mensaje_completo .= "<h3>Cantidad de personas:</h3>" . $cantpersonas . "\n";
    $mensaje_completo .= "<h3>Empresa:</h3>" . $empresa . "\n";

    // Configura PHPMailer
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = getenv('DON_WEB_HOST');
    $mail->SMTPAuth = true;
    $mail->Username = getenv('LIDE_EMAIL'); // Reemplaza con tu usuario SMTP
    $mail->Password = getenv('SMTP_PW');
    $mail->SMTPSecure = 'ssl';
    $mail->Port = getenv('PORT');

    $mail->setFrom($email, $nombre);
    $mail->addAddress($para);
    $mail->isHTML(true);
    $mail->Subject = $asunto;
    $mail->Body = $mensaje_completo;

    try {
        $mail->send();
        error_log("Correo enviado con éxito");
        echo json_encode(array("success" => true));
    } catch (Exception $e) {
        error_log("Error al enviar el correo: " . $mail->ErrorInfo);
        echo json_encode(array("success" => false));
    }
} else {
    header("Location: index.html");
}