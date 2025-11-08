<?php
/**
 * FONCTIONS UTILITAIRES
 * Kayaya Ilunga Construction - 2025
 */

// Empêcher l'accès direct
if (!defined('PROCESS_APP')) {
    die('Accès direct interdit');
}

// ========================================
// FONCTIONS DE NETTOYAGE ET VALIDATION
// ========================================

/**
 * Nettoyer les données d'entrée
 */
function sanitize_input($data) {
    if (empty($data)) {
        return '';
    }
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Valider un email
 */
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Valider un fichier uploadé
 */
function validate_file($file) {
    // Vérifier la taille
    if ($file['size'] > MAX_FILE_SIZE) {
        return [
            'valid' => false,
            'error' => 'Le fichier est trop volumineux (max 5 MB)'
        ];
    }
    
    // Vérifier le type
    if (!in_array($file['type'], ALLOWED_FILE_TYPES)) {
        return [
            'valid' => false,
            'error' => 'Type de fichier non autorisé. Formats acceptés: JPG, PNG, GIF, PDF, DOC, DOCX'
        ];
    }
    
    return ['valid' => true];
}

// ========================================
// FONCTIONS DE SÉCURITÉ
// ========================================

/**
 * Vérifier le taux de soumission (protection anti-spam)
 */
function check_rate_limit() {
    if (!defined('MAX_ATTEMPTS_PER_HOUR')) {
        return true; // Pas de limite configurée
    }
    
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $lock_file = __DIR__ . '/rate_limit_' . md5($ip) . '.txt';
    
    // Vérifier si le fichier existe
    if (file_exists($lock_file)) {
        $attempts = json_decode(file_get_contents($lock_file), true);
        
        // Nettoyer les anciennes tentatives (> 1 heure)
        $attempts = array_filter($attempts, function($timestamp) {
            return $timestamp > (time() - 3600);
        });
        
        // Vérifier si la limite est atteinte
        if (count($attempts) >= MAX_ATTEMPTS_PER_HOUR) {
            return false;
        }
        
        // Ajouter la nouvelle tentative
        $attempts[] = time();
    } else {
        // Première tentative
        $attempts = [time()];
    }
    
    // Sauvegarder
    @file_put_contents($lock_file, json_encode($attempts));
    
    return true;
}

// ========================================
// FONCTIONS DE LOGS
// ========================================

/**
 * Enregistrer une soumission
 */
function log_submission($data) {
    if (!ENABLE_LOGS) {
        return;
    }
    
    $log_entry = sprintf(
        "%s - Demande de: %s (%s) - Type: %s\n",
        $data['date'] ?? date('Y-m-d H:i:s'),
        $data['name'] ?? 'Inconnu',
        $data['email'] ?? 'Inconnu',
        $data['projectType'] ?? 'Non spécifié'
    );
    
    @file_put_contents(LOG_FILE, $log_entry, FILE_APPEND);
}

/**
 * Enregistrer un message de log
 */
function log_message($message) {
    if (!ENABLE_LOGS) {
        return;
    }
    
    $log_entry = date('Y-m-d H:i:s') . " - " . $message . "\n";
    @file_put_contents(LOG_FILE, $log_entry, FILE_APPEND);
}

/**
 * Enregistrer une erreur
 */
function log_error($error) {
    if (!ENABLE_LOGS) {
        return;
    }
    
    $log_entry = date('Y-m-d H:i:s') . " - ERREUR: " . $error . "\n";
    @file_put_contents(LOG_FILE, $log_entry, FILE_APPEND);
}

// ========================================
// FONCTIONS DE RÉPONSE
// ========================================

/**
 * Envoyer une réponse JSON
 */
function json_response($success, $message, $data = []) {
    header('Content-Type: application/json');
    echo json_encode(array_merge([
        'success' => $success,
        'message' => $message
    ], $data));
    exit;
}

// ========================================
// FONCTIONS D'EMAIL
// ========================================

/**
 * Obtenir les headers d'email
 */
function get_email_headers($from_email, $from_name, $reply_to) {
    return [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $from_name . ' <' . $from_email . '>',
        'Reply-To: ' . $reply_to,
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 1',
        'Importance: High'
    ];
}

/**
 * Envoyer un email avec pièce jointe
 */
function send_email_with_attachment($to, $subject, $message, $from_email, $from_name, $reply_to, $attachment = null) {
    // Générer une limite pour séparer les parties du message
    $boundary = md5(time());
    
    // Headers de base
    $headers = [
        'MIME-Version: 1.0',
        'From: ' . $from_name . ' <' . $from_email . '>',
        'Reply-To: ' . $reply_to,
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 1',
        'Importance: High',
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"'
    ];
    
    // Corps du message
    $body = "--" . $boundary . "\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message . "\r\n\r\n";
    
    // Si une pièce jointe est fournie
    if ($attachment !== null && isset($attachment['tmp_name']) && file_exists($attachment['tmp_name'])) {
        $file_content = file_get_contents($attachment['tmp_name']);
        $file_content = chunk_split(base64_encode($file_content));
        
        $body .= "--" . $boundary . "\r\n";
        $body .= "Content-Type: " . $attachment['type'] . "; name=\"" . $attachment['name'] . "\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"" . $attachment['name'] . "\"\r\n\r\n";
        $body .= $file_content . "\r\n";
    }
    
    // Fermer la limite
    $body .= "--" . $boundary . "--";
    
    // Envoyer l'email
    return @mail($to, $subject, $body, implode("\r\n", $headers));
}

/**
 * Template email administrateur
 */
function get_admin_email_template($data) {
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $projectType = $data['projectType'] ?? '';
    $message = nl2br($data['message'] ?? '');
    $date = $data['date'] ?? '';
    $attachment = $data['attachment'] ?? null;
    
    // Préparer l'info sur la pièce jointe
    $attachmentInfo = '';
    if ($attachment !== null) {
        $fileSize = round($attachment['size'] / 1024, 2);
        $attachmentInfo = "
            <div class='info-row'>
                <span class='label'>📎 Pièce jointe:</span><br>
                {$attachment['name']} ({$fileSize} KB)
            </div>";
    }
    
    return "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { 
            background: linear-gradient(135deg, " . COLOR_PRIMARY . " 0%, " . COLOR_SECONDARY . " 100%); 
            color: white; 
            padding: 20px; 
            text-align: center; 
            border-radius: 8px 8px 0 0; 
        }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
        .info-row { 
            margin: 15px 0; 
            padding: 10px; 
            background: white; 
            border-radius: 4px; 
            border-left: 4px solid " . COLOR_ACCENT . ";
        }
        .label { font-weight: bold; color: " . COLOR_PRIMARY . "; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🔔 Nouvelle demande de contact</h1>
        </div>
        <div class='content'>
            <p>Vous avez reçu une nouvelle demande de contact via le site web.</p>
            
            <div class='info-row'>
                <span class='label'>👤 Nom complet:</span><br>
                {$name}
            </div>
            
            <div class='info-row'>
                <span class='label'>📧 Email:</span><br>
                <a href='mailto:{$email}'>{$email}</a>
            </div>
            
            <div class='info-row'>
                <span class='label'>📱 Téléphone:</span><br>
                <a href='tel:{$phone}'>{$phone}</a>
            </div>
            
            <div class='info-row'>
                <span class='label'>🏗️ Type de projet:</span><br>
                {$projectType}
            </div>
            
            <div class='info-row'>
                <span class='label'>💬 Message:</span><br>
                {$message}
            </div>
            
            {$attachmentInfo}
            
            <div class='info-row'>
                <span class='label'>📅 Date de la demande:</span><br>
                {$date}
            </div>
        </div>
        <div class='footer'>
            <p>Ce message a été envoyé automatiquement depuis le formulaire de contact de " . SITE_NAME . "</p>
            <p><a href='" . SITE_URL . "' style='color: " . COLOR_SECONDARY . ";'>" . SITE_URL . "</a></p>
        </div>
    </div>
</body>
</html>
";
}

/**
 * Template email utilisateur
 */
function get_user_email_template($data) {
    $name = $data['name'] ?? '';
    $projectType = $data['projectType'] ?? '';
    $message = nl2br($data['message'] ?? '');
    $date = $data['date'] ?? '';
    
    return "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { 
            background: linear-gradient(135deg, " . COLOR_PRIMARY . " 0%, " . COLOR_SECONDARY . " 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 8px 8px 0 0; 
        }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-top: none; }
        .highlight { 
            background: white; 
            padding: 15px; 
            border-left: 4px solid " . COLOR_ACCENT . "; 
            margin: 20px 0; 
            border-radius: 4px; 
        }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background: " . COLOR_ACCENT . ";
            color: white;
            text-decoration: none;
            border-radius: 25px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>✅ Message bien reçu !</h1>
        </div>
        <div class='content'>
            <p>Bonjour <strong>{$name}</strong>,</p>
            
            <p>Nous vous remercions d'avoir contacté <strong>" . SITE_NAME . "</strong>.</p>
            
            <div class='highlight'>
                <p><strong>Votre demande a bien été enregistrée et transmise à notre équipe.</strong></p>
                <p>Un de nos conseillers vous répondra dans les plus brefs délais, généralement sous 24h.</p>
            </div>
            
            <p><strong>Récapitulatif de votre demande :</strong></p>
            <ul>
                <li><strong>Type de projet :</strong> {$projectType}</li>
                <li><strong>Date :</strong> {$date}</li>
            </ul>
            
            <p><strong>Votre message :</strong></p>
            <p style='background: white; padding: 15px; border-radius: 4px; font-style: italic;'>{$message}</p>
            
            <p>En attendant notre réponse, n'hésitez pas à consulter nos réalisations sur notre site web :</p>
            <p style='text-align: center;'>
                <a href='" . SITE_URL . "realisations.html' class='button'>Voir nos réalisations</a>
            </p>
            
            <hr style='margin: 30px 0; border: none; border-top: 1px solid #ddd;'>
            
            <p><strong>Nos coordonnées :</strong></p>
            <p>
                📍 1, Av Kayaya Ilunga, Q/Daipn, C/ N'sele<br>
                📞 " . SUPPORT_PHONE . " / +243 971 996 77<br>
                📧 " . SUPPORT_EMAIL . "
            </p>
            
            <p><strong>Horaires d'ouverture :</strong><br>
            Lundi - Vendredi : 8h - 18h<br>
            Samedi : 9h - 12h</p>
        </div>
        <div class='footer'>
            <p>&copy; 2025 " . SITE_NAME . " - Tous droits réservés</p>
            <p style='font-size: 11px; color: #999;'>Cet email a été envoyé automatiquement, merci de ne pas y répondre directement.</p>
        </div>
    </div>
</body>
</html>
";
}
?>

