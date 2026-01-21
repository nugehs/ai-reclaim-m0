// AI-Reclaim Documentation - Password Protection
(function() {
  const PASSWORD = 'AtoZR2026';  // Change this password as needed
  const STORAGE_KEY = 'ai_reclaim_auth';
  const TERMS_ACCEPTED_KEY = 'ai_reclaim_terms';

  // Add logout button if authenticated
  function addLogoutButton() {
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logout-btn';
    logoutBtn.innerHTML = '🔓 Logout';
    logoutBtn.title = 'Clear session and logout';

    const logoutStyles = document.createElement('style');
    logoutStyles.textContent = `
      #logout-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 0.5rem 1rem;
        background: #2D5A5A;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transition: background 0.2s, transform 0.2s;
      }
      #logout-btn:hover {
        background: #1E4040;
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(logoutStyles);
    document.body.appendChild(logoutBtn);

    logoutBtn.addEventListener('click', function() {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(TERMS_ACCEPTED_KEY);
      window.location.reload();
    });
  }

  // Check if already authenticated
  if (sessionStorage.getItem(STORAGE_KEY) === 'true' &&
      sessionStorage.getItem(TERMS_ACCEPTED_KEY) === 'true') {
    addLogoutButton();
    return; // Already authenticated
  }

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'auth-overlay';
  overlay.innerHTML = `
    <div class="auth-container">
      <div class="auth-logo">
        <span class="auth-icon">🔒</span>
      </div>
      <h1>AI-Reclaim™</h1>
      <p class="auth-subtitle">Confidential Documentation</p>

      <div class="auth-form">
        <div class="form-group">
          <label for="auth-password">Access Code</label>
          <input type="password" id="auth-password" placeholder="Enter access code" autocomplete="off">
          <div id="auth-error" class="auth-error"></div>
        </div>

        <div class="terms-section">
          <label class="terms-label">
            <input type="checkbox" id="terms-checkbox">
            <span>I acknowledge this documentation is <strong>confidential</strong> and provided under NDA. I agree not to share, copy, or distribute without written permission from A to Z IT Recycling Ltd.</span>
          </label>
        </div>

        <button id="auth-submit" type="button">Access Documentation</button>
      </div>

      <p class="auth-footer">© 2026 A to Z IT Recycling Ltd. All rights reserved.</p>
    </div>
  `;

  // Add styles
  const styles = document.createElement('style');
  styles.textContent = `
    #auth-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #1E4040 0%, #2D5A5A 50%, #3D7A7A 100%);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .auth-container {
      background: white;
      padding: 3rem;
      border-radius: 16px;
      box-shadow: 0 25px 50px rgba(0,0,0,0.3);
      max-width: 420px;
      width: 90%;
      text-align: center;
    }

    .auth-logo {
      margin-bottom: 1rem;
    }

    .auth-icon {
      font-size: 3rem;
    }

    .auth-container h1 {
      color: #2D5A5A;
      margin: 0 0 0.5rem 0;
      font-size: 1.75rem;
      font-weight: 700;
    }

    .auth-subtitle {
      color: #666;
      margin: 0 0 2rem 0;
      font-size: 0.9rem;
    }

    .auth-form {
      text-align: left;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      color: #333;
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 0.85rem;
    }

    #auth-password {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    #auth-password:focus {
      outline: none;
      border-color: #2D5A5A;
    }

    .auth-error {
      color: #e53935;
      font-size: 0.8rem;
      margin-top: 0.5rem;
      min-height: 1.2rem;
    }

    .terms-section {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }

    .terms-label {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
      font-size: 0.8rem;
      color: #555;
      line-height: 1.5;
    }

    .terms-label input[type="checkbox"] {
      margin-top: 0.25rem;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    #auth-submit {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #2D5A5A 0%, #1E4040 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    #auth-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(45, 90, 90, 0.4);
    }

    #auth-submit:active {
      transform: translateY(0);
    }

    .auth-footer {
      color: #999;
      font-size: 0.75rem;
      margin: 2rem 0 0 0;
    }
  `;

  document.head.appendChild(styles);
  document.body.appendChild(overlay);

  // Handle authentication
  const passwordInput = document.getElementById('auth-password');
  const termsCheckbox = document.getElementById('terms-checkbox');
  const submitBtn = document.getElementById('auth-submit');
  const errorDiv = document.getElementById('auth-error');

  function attemptAuth() {
    const enteredPassword = passwordInput.value;
    const termsAccepted = termsCheckbox.checked;

    if (!termsAccepted) {
      errorDiv.textContent = 'Please accept the confidentiality terms';
      return;
    }

    if (enteredPassword === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      sessionStorage.setItem(TERMS_ACCEPTED_KEY, 'true');
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s';
      setTimeout(() => overlay.remove(), 300);
    } else {
      errorDiv.textContent = 'Invalid access code';
      passwordInput.value = '';
      passwordInput.focus();
    }
  }

  submitBtn.addEventListener('click', attemptAuth);
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') attemptAuth();
  });

  passwordInput.focus();
})();
