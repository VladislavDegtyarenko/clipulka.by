<?php 

$fname = $_POST['fname'];
$mname = $_POST['mname'];
$lname = $_POST['lname'];
$phone = $_POST['telephone'];
$email = $_POST['email'];
$city = $_POST['city'];
$address = $_POST['address'];
$zip = $_POST['zip'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = '';                 						// Ваш логин от почты с которой будут отправляться письма
$mail->Password = '';                           		// Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('', 'Pulse');   // От кого будет уходить письмо
$mail->addAddress('');     // Кому будет уходить письмо
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь сделал заявку <br> 
	Фамилия: ' . $lname . ' <br>
	Имя: ' . $fname . ' <br>
	Отчество: ' . $fname . ' <br>
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '<br><br>
	Адрес доставки: <br>
	' . $city . '<br>
	' . $address . '<br>
	' . $zip . '<br>
	';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>