function initTt() {
  const showTooltipElements = document.querySelectorAll('[data-tooltip]');
  const tt = document.createElement('div');
  tt.id = 'tooltip';
  document.body.appendChild(tt);
  if (showTooltipElements) {
    showTooltipElements.forEach((element) => {
      element.addEventListener('mouseenter', (e) => {
        tt.textContent = e.target.dataset.tooltip;
        tt.style.left = `${e.pageX}px`;
        tt.style.top = `${e.pageY}px`;
        tt.style.display = 'block';
      });
      element.addEventListener('mouseleave', (e) => {
        tt.style.display = 'none';
      });
    });
  }
}

function setDate() {
  const cardExpirationInput = document.getElementById('card-expiration');
  if (cardExpirationInput) {
    const today = new Date();
    // getMonth() is zero-based, so add 1
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const year = today.getFullYear();
    cardExpirationInput.value = `${year}-${month}-${day}`;
  }
}

function enableAlternativePaymentOptionsNotif() {
  const alternativePaymentParent = document.getElementById(
    'checkout-alternative-payments',
  );
  if (!alternativePaymentParent) return;
  const alternativePaymentOptions = alternativePaymentParent.children;
  Array.from(alternativePaymentOptions)?.forEach((option) => {
    option.addEventListener('click', (event) => {
      createToast(event.target);
    });
  });
}

function createToast(btn) {
  const toastContainer = document.createElement('div');
  const toastElement = document.createElement('div');
  const toastProgress = document.createElement('div');

  toastContainer.id = 'toast-container';
  toastContainer.classList.add('active');

  toastElement.id = 'toast';
  toastElement.textContent = `${btn.textContent} payment option selected!`;
  toastElement.style.bottom = btn.clientY;
  toastElement.style.display = 'block';

  toastProgress.id = 'toast-progress';
  toastProgress.classList.add('active');
  toastProgress.style.display = 'block';

  toastContainer.appendChild(toastElement);
  toastElement.appendChild(toastProgress);
  document.body.appendChild(toastContainer);

  setTimeout(() => {
    toastElement.style.display = 'none';
    toastContainer.classList.remove('active');
  }, 1850);

  setTimeout(() => {
    toastProgress.classList.remove('active');
    toastProgress.style.display = 'none';
  }, 2000);
}

initTt();
setDate();
enableAlternativePaymentOptionsNotif();
