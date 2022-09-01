<?php
require 'PHPMailer/mailer.php';
require 'PHPMailer/PHPMailerAutoload.php';

if ( isset($_POST) ) { 
	

		$host = 'smtp.gmail.com';
		$Username = 'homevent2022@gmail.com';
		$Password = 'oqyxydszkdauibas';
		$From = 'kavirajan@opendesignsin.com';
		$AddAddress = 'celebrations@homevents.in';
		$AddCC = 'seo@opendesigns.in';
		//$AddAddress = 'kavirajan@opendesignsin.com';
		//$AddCC = 'kavirajan@opendesignsin.com';
		$FromName = 'Home Events';
		$SMTPSecure = 'tls';
		
		$subject1 = "New Enquiry - Home Events";
		$subject2 = "Acknowledgement from Home Events";
		
		$admin_mail_tempalte = 'admin_mail_tempalte.html';		$message1 = file_get_contents($admin_mail_tempalte);
		$services = implode(',',$_POST['services']);
		$message1 = str_replace('%Name%', $_POST['name'], $message1);
		$message1 = str_replace('%Email%', $_POST['email'], $message1);
		$message1 = str_replace('%Phone%', $_POST['phone'], $message1);
		$message1 = str_replace('%State%', $_POST['state'], $message1);
		$message1 = str_replace('%City%', $_POST['cities'], $message1);
		$message1 = str_replace('%Event%', $_POST['event'], $message1);
		$message1 = str_replace('%Services%', $services, $message1);
		$message1 = str_replace('%Date%', $_POST['date_time'], $message1);
		$message1 = str_replace('%Price%', $_POST['price_range'], $message1);
		$message1 = str_replace('%Description%', $_POST['description'], $message1);
		$mail = new PHPMailer;
		$mail->SMTPDebug = 0;
		$mail->IsSMTP();
		$mail->Host = $host;
		$mail->SMTPAuth = true;
		$mail->Username = $Username;
		$mail->Password = $Password; 
		$mail->From = $From;
		$mail->FromName = $FromName;
		$mail->AddAddress($AddAddress);
		$mail->AddCC($AddCC);
		$mail->SMTPSecure = $SMTPSecure;
		$mail->Port = 587;
		$mail->Subject = $subject1;
		$mail->MsgHTML($message1);
		$mail->isHTML(true);
		if ( !isset($_POST['file']) ) { 
		if($_FILES['file']){
			move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $_FILES['file']['name']);
			$mail->addAttachment('./uploads/'.$_FILES['file']['name'], $_FILES['file']['name']);
		}
		}
		/*acknowledgement Mail*/
		$user_mail_tempalte = 'user_mail_tempalte.html';
		$message2 = file_get_contents($user_mail_tempalte);
		$message2 = str_replace('%Name%', $_POST['name'], $message2);
		$mail2 = new PHPMailer;
		$mail2->SMTPDebug = 0;
		$mail2->IsSMTP();
		$mail2->Host = $host;
		$mail2->SMTPAuth = true; 
		$mail2->Username = $Username;
		$mail2->Password = $Password;
		$mail2->From = $From;
		$mail2->FromName = $FromName;
		$mail2->AddAddress($_POST["email"]);
		$mail2->SMTPSecure = $SMTPSecure;
		$mail2->Port = 587;
		$mail2->Subject = $subject2;
		$mail2->MsgHTML($message2);
		$mail2->isHTML(true);
		
		if (isset($_POST['g-recaptcha-response'])) {
            $captcha = $_POST['g-recaptcha-response'];
            $secret = '6LeECO0gAAAAAGhvKBd0aeCQgxZxnCVK8caEM-kb';
            $response = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']), true);
            if($response['success'] == true){
            $send = ($mail->send() && $mail2->send());
                if($send)
                {
                    echo 1;
                }
                else
                {
                echo 0;
                //echo 'FAIL: ' . $mail->ErrorInfo . '<br />' . $mailconversation;
                }
             }
             else
             {
                 echo 2;   
             }
         } 
}