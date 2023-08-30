<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $email = $_POST["email"];
    $phoneNumber = $_POST["phoneNumber"];
    $engineeringField = $_POST["engineering-field"];

    // Check if the combination of first name, last name, and email already exists in the CSV
    $existingData = file_get_contents("players.csv");
    $existingEntries = explode("\n", $existingData);
    $isDuplicate = false;

    foreach ($existingEntries as $entry) {
        list($existingFirstName, $existingLastName, $existingEmail, $existingPhoneNumber, $existingEngineeringField) = explode(",", $entry);

        if ($existingFirstName === $firstName && $existingLastName === $lastName && $existingEmail === $email && $existingPhoneNumber == $phoneNumber) {
            $isDuplicate = true;
            break;
        }
    }

    if (!$isDuplicate) {
        // Format the data
        $formData = "$firstName,$lastName,$email,$phoneNumber,$engineeringField\n";

        // Append the data to the file
        $file = fopen("players.csv", "a");
        fwrite($file, $formData);
        fclose($file);
    }

    // Redirect back to the original page
    header("Location: index.html");
    exit;
}
?>
