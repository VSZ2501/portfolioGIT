<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    $to = "sofian77127@gmail.com";
    $subject = "Nouveau message du portfolio";
    
    $content = "Nom: " . $nom . "\n";
    $content .= "Email: " . $email . "\n\n";
    $content .= "Message:\n" . $message;
    
    $headers = "From: " . $email;

    if(mail($to, $subject, $content, $headers)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
}
?>
