export function showToast(message, type = 'success', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;

  let icon = '';
  if (type === 'success') {
    icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;
  } else if (type === 'error') {
    icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  } else {
    icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  }

  const title = type === 'success' ? 'Успешно' : type === 'error' ? 'Ошибка' : 'Уведомление';

  toast.innerHTML = `
    ${icon}
    <div class="toast__content">
      <div class="toast__title">${title}</div>
      <div class="toast__msg">${message}</div>
    </div>
    <button class="toast__close" aria-label="Закрыть">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  `;

  container.appendChild(toast);

  const closeBtn = toast.querySelector('.toast__close');
  
  const removeToast = () => {
    toast.classList.add('hiding');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 300);
  };

  closeBtn.addEventListener('click', removeToast);

  setTimeout(() => {
    if (toast.parentElement) {
      removeToast();
    }
  }, duration);
}
