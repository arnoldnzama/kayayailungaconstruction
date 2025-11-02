<?php
/**
 * TRAITEMENT DU FORMULAIRE DE CONTACT
 * Kayaya Ilunga Construction - 2025
 * 
 * Ce script traite les soumissions du formulaire de contact.
 * Il envoie des emails aux administrateurs et à l'utilisateur.
 */

// Définir la constante d'application
define('PROCESS_APP', true);

// Charger la configuration
require_once __DIR__ . '/config.php';

// Charger les fonctions
require_once __DIR__ . '/functions.php';

// Empêcher l'accès direct (seulement POST)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    json_response(false, 'Accès interdit');
}

// Headers pour les erreurs
if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Configuration pour éviter que les emails soient marqués comme spam
ini_set('sendmail_from', ADMIN_EMAIL_1);

// ========================================
// RÉCUPÉRATION ET VALIDATION DES DONNÉES
// ========================================

$errors = [];

// Récupérer et nettoyer les données
$name = sanitize_input($_POST['name'] ?? '');
$email = sanitize_input($_POST['email'] ?? '');
$phone = sanitize_input($_POST['phone'] ?? '');
$projectType = sanitize_input($_POST['projectType'] ?? '');
$message = sanitize_input($_POST['message'] ?? '');

// Validation des champs obligatoires
if (empty($name)) {
    $errors[] = 'Le nom est requis';
}

if (empty($email) || !validate_email($email)) {
    $errors[] = 'Un email valide est requis';
}

if (empty($phone)) {
    $errors[] = 'Le téléphone est requis';
}

if (empty($projectType)) {
    $errors[] = 'Le type de projet est requis';
}

if (empty($message)) {
    $errors[] = 'Le message est requis';
}

// Si des erreurs existent, retourner une erreur
if (!empty($errors)) {
    json_response(false, 'Erreur de validation', ['errors' => $errors]);
}

// ========================================
// PROTECTION ANTI-SPAM
// ========================================

if (!check_rate_limit()) {
    json_response(false, 'Trop de tentatives. Veuillez réessayer dans une heure.');
}

// ========================================
// TRAITEMENT DU FICHIER JOINT
// ========================================

$attachment = null;
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $fileValidation = validate_file($_FILES['file']);
    
    if ($fileValidation['valid']) {
        $attachment = [
            'name' => $_FILES['file']['name'],
            'tmp_name' => $_FILES['file']['tmp_name'],
            'type' => $_FILES['file']['type'],
            'size' => $_FILES['file']['size']
        ];
    } else {
        $errors[] = $fileValidation['error'];
    }
}

// ========================================
// PRÉPARATION DES DONNÉES
// ========================================

// Traduction du type de projet
$projectTypeLabel = PROJECT_TYPES[$projectType] ?? $projectType;

// Date et heure
$date = date('d/m/Y à H:i');

// ========================================
// CRÉATION DES EMAILS
// ========================================

// Email aux administrateurs
$adminSubject = "Nouvelle demande de contact - " . SITE_NAME;
$adminMessage = get_admin_email_template([
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'projectType' => $projectTypeLabel,
    'message' => $message,
    'date' => $date,
    'attachment' => $attachment
]);

// Email de confirmation à l'utilisateur
$userSubject = "Confirmation de réception - " . SITE_NAME;
$userMessage = get_user_email_template([
    'name' => $name,
    'projectType' => $projectTypeLabel,
    'message' => $message,
    'date' => $date
]);

// ========================================
// ENVOI DES EMAILS
// ========================================

$success_admin_1 = false;
$success_admin_2 = false;
$success_user = false;

try {
    if (USE_SMTP) {
        // Utiliser SMTP (nécessite PHPMailer ou autre bibliothèque)
        // Pour l'instant, utilisons mail()
        log_message("SMTP activé mais non implémenté, utilisation de mail()");
    }
    
    // Envoi aux administrateurs AVEC pièce jointe
    $success_admin_1 = send_email_with_attachment(
        ADMIN_EMAIL_1,
        $adminSubject,
        $adminMessage,
        ADMIN_EMAIL_1,
        $name,
        $email,
        $attachment
    );
    
    $success_admin_2 = send_email_with_attachment(
        ADMIN_EMAIL_2,
        $adminSubject,
        $adminMessage,
        ADMIN_EMAIL_1,
        $name,
        $email,
        $attachment
    );
    
    // Envoi de confirmation à l'utilisateur SANS pièce jointe
    $headers_user = get_email_headers(ADMIN_EMAIL_1, SITE_NAME, ADMIN_EMAIL_1);
    $success_user = @mail($email, $userSubject, $userMessage, implode("\r\n", $headers_user));
    
    // Log si une pièce jointe a été envoyée
    if ($attachment !== null) {
        log_message("Pièce jointe envoyée: " . $attachment['name'] . " (" . round($attachment['size']/1024, 2) . " KB)");
    }
    
} catch (Exception $e) {
    log_error("Erreur d'envoi d'email: " . $e->getMessage());
}

// ========================================
// VÉRIFICATION ET RÉPONSE
// ========================================

if ($success_admin_1 || $success_admin_2 || $success_user) {
    // Enregistrer dans les logs
    log_submission([
        'name' => $name,
        'email' => $email,
        'projectType' => $projectTypeLabel,
        'date' => $date
    ]);
    
    // Réponse de succès
    json_response(true, 'Votre demande a été envoyée avec succès ! Nous vous répondrons dans les plus brefs délais.');
} else {
    // Réponse d'erreur
    log_error("Échec d'envoi d'email pour: {$name} ({$email})");
    json_response(false, 'Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer ou nous contacter directement par téléphone au ' . SUPPORT_PHONE);
}
?>

