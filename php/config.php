<?php
/**
 * CONFIGURATION CENTRALE - KAYAYA ILUNGA CONSTRUCTI
 * 
 * Ce fichier contient toute la configuration du système d'email.
 * Modifiez les paramètres selon vos besoins.
 * 
 * @version 1.0
 * @date 2025-10-17
 */

// Empêcher l'accès direct
if (!defined('PROCESS_APP')) {
    die('Accès direct interdit');
}

// ========================================
// CONFIGURATION DES EMAILS
// ========================================

// Emails des administrateurs (recevront les notifications)
define('ADMIN_EMAIL_1', 'contact@kayayailungacontsruction.com');
define('ADMIN_EMAIL_2', 'mail.processcongo@gmail.com');

// Informations du site
define('SITE_NAME', 'Kayaya Ilunga Construction');
define('SITE_URL', 'https://arnoldnzama.github.io/KAYAYA-CONSTRUCTION/');
define('SUPPORT_EMAIL', 'contact@kayayailungacontsruction.com');
define('SUPPORT_PHONE', '+243 858 673 529 / +49 1512 5025867');

// ========================================
// CONFIGURATION SMTP
// ========================================

// Activer SMTP (true) ou utiliser mail() de PHP (false)
define('USE_SMTP', false); // Changez à true pour utiliser SMTP

// Paramètres SMTP (utilisés uniquement si USE_SMTP = true)
define('SMTP_HOST', 'smtp.gmail.com');        // Serveur SMTP
define('SMTP_PORT', 587);                      // Port (587 pour TLS, 465 pour SSL)
define('SMTP_SECURE', 'tls');                  // 'tls', 'ssl' ou ''
define('SMTP_AUTH', true);                     // Activer l'authentification
define('SMTP_USERNAME', 'contact@kayayailungacontsruction.com'); // Utilisateur SMTP
define('SMTP_PASSWORD', '');                    // Mot de passe SMTP (À REMPLIR)

// ========================================
// CONFIGURATION DU FORMULAIRE
// ========================================

// Taille maximale des fichiers joints (en octets)
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5 MB

// Types de fichiers autorisés
define('ALLOWED_FILE_TYPES', [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);

// ========================================
// CONFIGURATION DES LOGS
// ========================================

// Activer les logs
define('ENABLE_LOGS', true);

// Fichier de logs
define('LOG_FILE', __DIR__ . '/contact_logs.txt');

// ========================================
// CONFIGURATION DE SÉCURITÉ
// ========================================

// Limite de tentatives (protection anti-spam)
define('MAX_ATTEMPTS_PER_HOUR', 5); // 5 soumissions max par heure par IP

// Activer le mode debug (affiche les erreurs détaillées)
define('DEBUG_MODE', false); // Changez à true pour déboguer

// ========================================
// TRADUCTIONS DES TYPES DE PROJETS
// ========================================

define('PROJECT_TYPES', [
    'residential' => 'Construction résidentielle',
    'commercial' => 'Construction commerciale',
    'renovation' => 'Rénovation',
    'public' => 'Travaux publics',
    'other' => 'Autre'
]);

// ========================================
// CONFIGURATION DES COULEURS (Pour les emails)
// ========================================

define('COLOR_PRIMARY', '#c69b49');
define('COLOR_SECONDARY', '#006397');
define('COLOR_ACCENT', '#ff9702');

// ========================================
// CONFIGURATION WORDPRESS (À titre informatif)
// ========================================

// Ces informations sont pour référence seulement
// Le système d'email fonctionne indépendamment de WordPress

define('WP_DB_NAME', 'processr_wp693');
define('WP_DB_USER', 'processr_wp693');
define('WP_DB_PASSWORD', '!4Se8Y-8p3');
define('WP_DB_HOST', 'localhost');

// ========================================
// GUIDES DE CONFIGURATION RAPIDE
// ========================================

/*
 * CONFIGURATION SMTP - EXEMPLES COURANTS
 * 
 * GMAIL:
 * ------
 * SMTP_HOST: smtp.gmail.com
 * SMTP_PORT: 587
 * SMTP_USERNAME: votre-email@gmail.com
 * SMTP_PASSWORD: mot-de-passe-application (pas votre mot de passe Gmail)
 * SMTP_SECURE: tls
 * 
 * SENDGRID:
 * ---------
 * SMTP_HOST: smtp.sendgrid.net
 * SMTP_PORT: 587
 * SMTP_USERNAME: apikey
 * SMTP_PASSWORD: votre-cle-api-sendgrid
 * SMTP_SECURE: tls
 * 
 * CPANEL / OVH:
 * -------------
 * SMTP_HOST: mail.kayayailungacontsruction.com (ou smtp.kayayailungacontsruction.com)
 * SMTP_PORT: 587
 * SMTP_USERNAME: contact@kayayailungacontsruction.com
 * SMTP_PASSWORD: votre-mot-de-passe-email
 * SMTP_SECURE: tls
 * 
 * Pour plus de configurations, voir: ../config-smtp-providers.txt
 */

// ========================================
// FIN DE LA CONFIGURATION
// ========================================
?>

