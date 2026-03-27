class MultiStepModalForm {
	constructor(modalRoot) {
		this.modalRoot = modalRoot;
		this.modalId = modalRoot.getAttribute('data-modal-id') || modalRoot.id || '';
		this.dialog = modalRoot.querySelector('.wonderland-modal__dialog');
		this.form = modalRoot.querySelector('.wonderland-modal__form');
		this.steps = Array.from(modalRoot.querySelectorAll('[data-step]'));
		this.indicators = Array.from(modalRoot.querySelectorAll('[data-step-indicator]'));
		this.errorNode = modalRoot.querySelector('[data-modal-errors]');
		this.changedAriaNodes = [];
		this.currentStep = 1;
		this.lastTrigger = null;
		this.abortClose = null;

		this.boundDocumentClick = this.handleDocumentClick.bind(this);
		this.boundDialogClick = this.handleDialogClick.bind(this);
		this.boundKeyDown = this.handleKeyDown.bind(this);
		this.boundFormSubmit = this.handleFormSubmit.bind(this);
		this.boundActionClick = this.handleActionClick.bind(this);

		document.addEventListener('click', this.boundDocumentClick);
		this.modalRoot.addEventListener('click', this.boundDialogClick);
		this.dialog.addEventListener('keydown', this.boundKeyDown);
		this.form.addEventListener('submit', this.boundFormSubmit);
		this.form.addEventListener('click', this.boundActionClick);
	}

	handleDocumentClick(event) {
		const insideModal = event.target.closest('[data-modal-root]');
		if (insideModal) {
			const isExternalOpenTrigger =
				event.target.closest('.js-open-modal') ||
				event.target.closest('.wonderland-header__quote-btn .wp-block-button__link');
			if (!isExternalOpenTrigger) {
				return;
			}
		}

		const trigger = event.target.closest('.js-open-modal');
		const quoteLink = event.target.closest('.wonderland-header__quote-btn .wp-block-button__link');

		let el = trigger;
		let targetId = null;

		if (trigger) {
			targetId = trigger.getAttribute('data-modal-target');
			if (!targetId) {
				const href = trigger.getAttribute('href') || '';
				if (href.indexOf('#') === 0 && href.length > 1) {
					targetId = href.replace(/^#/, '');
				}
			}
		} else if (quoteLink) {
			el = quoteLink;
			targetId = quoteLink.getAttribute('data-modal-target') || 'multi-step-form-modal';
		}

		if (!el || !targetId) {
			return;
		}

		if (targetId !== this.modalId) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		this.open(el);
	}

	handleDialogClick(event) {
		if (event.target.matches('[data-modal-close]') || event.target.closest('[data-modal-close]')) {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			this.close();
		}
	}

	handleActionClick(event) {
		const actionBtn = event.target.closest('[data-action]');
		if (!actionBtn) {
			return;
		}

		const action = actionBtn.getAttribute('data-action');
		if (action === 'next') {
			event.preventDefault();
			this.goNext();
		}
		if (action === 'back') {
			event.preventDefault();
			this.goBack();
		}
	}

	handleFormSubmit(event) {
		event.preventDefault();
		if (!this.validateStep(this.currentStep)) {
			return;
		}
		this.showStep(4);
	}

	handleKeyDown(event) {
		if (!this.modalRoot.classList.contains('is-open')) {
			return;
		}
		if (event.key === 'Escape') {
			event.preventDefault();
			this.close();
			return;
		}

		if (event.key !== 'Tab') {
			return;
		}

		const focusable = this.getFocusable();
		if (!focusable.length) {
			return;
		}

		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
			return;
		}
		if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	getFocusable() {
		const selector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
		return Array.from(this.dialog.querySelectorAll(selector)).filter(function (node) {
			return !node.hasAttribute('hidden');
		});
	}

	open(trigger) {
		if (this.abortClose) {
			this.abortClose();
			this.abortClose = null;
		}
		this.lastTrigger = trigger || null;
		this.resetFormState();
		this.modalRoot.setAttribute('aria-hidden', 'false');
		document.body.classList.add('wonderland-modal-open');
		this.toggleOutsideAria(true);
		const root = this.modalRoot;
		window.requestAnimationFrame(function () {
			window.requestAnimationFrame(function () {
				root.classList.add('is-open');
				this.dialog.focus();
			}.bind(this));
		}.bind(this));
	}

	close() {
		if (!this.modalRoot.classList.contains('is-open')) {
			this.finishClose();
			return;
		}
		const root = this.modalRoot;
		let finished = false;
		const cleanup = function () {
			root.removeEventListener('transitionend', onEnd);
			window.clearTimeout(timeoutId);
		};
		const finish = function () {
			if (finished) {
				return;
			}
			finished = true;
			cleanup();
			this.abortClose = null;
			this.finishClose();
		}.bind(this);
		const onEnd = function (event) {
			if (event.target !== root || event.propertyName !== 'opacity') {
				return;
			}
			finish();
		};
		this.abortClose = function () {
			if (finished) {
				return;
			}
			finished = true;
			cleanup();
		};
		root.addEventListener('transitionend', onEnd);
		const timeoutId = window.setTimeout(finish, 400);
		root.classList.remove('is-open');
	}

	finishClose() {
		this.modalRoot.setAttribute('aria-hidden', 'true');
		document.body.classList.remove('wonderland-modal-open');
		this.toggleOutsideAria(false);
		if (this.lastTrigger && typeof this.lastTrigger.focus === 'function') {
			this.lastTrigger.focus();
		}
	}

	toggleOutsideAria(isOpen) {
		const parent = this.modalRoot.parentElement;
		if (!parent) {
			return;
		}

		if (isOpen) {
			this.changedAriaNodes = [];
			Array.from(parent.children).forEach(
				function (node) {
					if (node === this.modalRoot) {
						return;
					}
					if (!node.hasAttribute('aria-hidden')) {
						node.setAttribute('aria-hidden', 'true');
						this.changedAriaNodes.push(node);
					}
				}.bind(this)
			);
			return;
		}

		this.changedAriaNodes.forEach(function (node) {
			node.removeAttribute('aria-hidden');
		});
		this.changedAriaNodes = [];
	}

	resetFormState() {
		this.form.reset();
		this.showStep(1);
		this.clearError();
		this.form.querySelectorAll('.wonderland-modal__input').forEach(function (input) {
			input.removeAttribute('aria-invalid');
		});
	}

	goNext() {
		if (!this.validateStep(this.currentStep)) {
			return;
		}
		if (this.currentStep < 3) {
			this.showStep(this.currentStep + 1);
		}
	}

	goBack() {
		if (this.currentStep > 1) {
			this.showStep(this.currentStep - 1);
		}
	}

	showStep(stepNumber) {
		this.currentStep = stepNumber;
		this.steps.forEach(function (step) {
			const isActive = Number(step.getAttribute('data-step')) === stepNumber;
			step.hidden = !isActive;
			step.classList.toggle('is-active', isActive);
		});
		this.indicators.forEach(function (dot) {
			const dotStep = Number(dot.getAttribute('data-step-indicator'));
			dot.classList.toggle('is-active', dotStep === stepNumber);
			dot.classList.toggle('is-complete', dotStep < stepNumber || stepNumber === 4);
		});
		this.clearError();
		const firstField = this.modalRoot.querySelector('[data-step="' + stepNumber + '"] .wonderland-modal__input');
		if (firstField) {
			firstField.focus();
		}
	}

	validateStep(stepNumber) {
		if (stepNumber === 1) {
			const nameInput = this.form.querySelector('input[name="name"]');
			const value = (nameInput.value || '').trim();
			const lettersOnlyName = /^[a-zA-Z\u00C0-\u024F\s'-]+$/;
			if (value.length < 2) {
				nameInput.setAttribute('aria-invalid', 'true');
				this.showError('Please enter your first and last name.');
				nameInput.focus();
				return false;
			}
			if (!lettersOnlyName.test(value) || !/[a-zA-Z\u00C0-\u024F]/.test(value)) {
				nameInput.setAttribute('aria-invalid', 'true');
				this.showError('Name must contain letters only (spaces, hyphens, and apostrophes are allowed).');
				nameInput.focus();
				return false;
			}
			nameInput.removeAttribute('aria-invalid');
			return true;
		}

		if (stepNumber === 2) {
			const emailInput = this.form.querySelector('input[name="email"]');
			const email = (emailInput.value || '').trim();
			const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			if (!emailRegex.test(email)) {
				emailInput.setAttribute('aria-invalid', 'true');
				this.showError('Please enter a valid email address.');
				emailInput.focus();
				return false;
			}
			emailInput.removeAttribute('aria-invalid');
			return true;
		}

		if (stepNumber === 3) {
			const phoneInput = this.form.querySelector('input[name="phone"]');
			const digits = (phoneInput.value || '').replace(/\D/g, '');
			let n = digits;
			if (n.length === 11 && n.charAt(0) === '1') {
				n = n.slice(1);
			}
			if (!this.isValidUsPhoneDigits(n)) {
				phoneInput.setAttribute('aria-invalid', 'true');
				this.showError('Please enter a valid US phone number (10 digits, area code cannot start with 0 or 1).');
				phoneInput.focus();
				return false;
			}
			phoneInput.removeAttribute('aria-invalid');
			return true;
		}

		return true;
	}

	isValidUsPhoneDigits(d) {
		if (d.length !== 10) {
			return false;
		}
		if (d.charAt(0) === '0' || d.charAt(0) === '1') {
			return false;
		}
		if (d.charAt(3) === '0' || d.charAt(3) === '1') {
			return false;
		}
		return true;
	}

	showError(message) {
		this.errorNode.textContent = message;
	}

	clearError() {
		this.errorNode.textContent = '';
	}
}

window.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('[data-modal-root]').forEach(function (modalRoot) {
		new MultiStepModalForm(modalRoot);
	});
});
