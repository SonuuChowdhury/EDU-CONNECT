export default function obfuscateEmail(email) {
    // Split the email into username and domain
    const [username, domain] = email.split('@');
  
    // Determine how many characters of the username to show
    const visiblePartLength = Math.min(6, username.length); // Show up to 6 characters
    const obfuscatedPart = 'X'.repeat(username.length - visiblePartLength);
  
    // Reconstruct the email
    const obfuscatedEmail = `${username.slice(0, visiblePartLength)}${obfuscatedPart}@${domain}`;
  
    return obfuscatedEmail;
  }
  