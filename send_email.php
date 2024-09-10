<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['mail'];
    $number = $_POST['number'];
    $company = $_POST['service'];
    $message = $_POST['message'];

    $to = "contact@ctarmedia.com";
    $subject = "New Contact Form Submission";
    $body = "Name: $name\nEmail: $email\nPhone: $number\nCompany: $company\nMessage:\n$message";

    // Add the Trustpilot email as BCC
    $headers = "From: $email\r\n";
    $headers .= "BCC: ctarmedia.com+d0d143425c@invite.trustpilot.com\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "<p>Message sent successfully! Redirecting to home page...</p>";
        echo "<script>
                setTimeout(function(){
                    window.location.href = 'https://ctarmedia.com/';
                }, 4000);
              </script>";
    } else {
        echo "<p>Failed to send message. Please try again.</p>";
        echo "<script>
                setTimeout(function(){
                    window.location.href = 'https://ctarmedia.com/';
                }, 2000);
              </script>";
    }
} else {
    echo "<p>Invalid request method.</p>";
    echo "<script>
            setTimeout(function(){
                window.location.href = 'https://ctarmedia.com/';
            }, 2000);
          </script>";
}
?>