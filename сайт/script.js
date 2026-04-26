document.addEventListener('DOMContentLoaded', () => {

	// --- 1. Гамбургер-меню ---
	const hamburger = document.getElementById('hamburger-icon');
	const navLinks = document.getElementById('nav-links');

	if (hamburger && navLinks) {
		hamburger.addEventListener('click', () => {
			navLinks.classList.toggle('active');
			console.log("Гамбургер меню:", navLinks.classList.contains('active') ? 'открыто' : 'закрыто');
		});
	}

	// --- 3. Навигация по кнопкам ---
	const navigationLinks = document.querySelectorAll('#nav-links a');
	
	navigationLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			// Только для ссылок, которые не начинаются с #
			if (!this.getAttribute('href').startsWith('#')) {
				e.preventDefault();
				const targetUrl = this.href;
				
				// Добавляем анимацию загрузки
				document.body.style.opacity = '0.7';
				document.body.style.transition = 'opacity 0.3s';
				
				setTimeout(() => {
					window.location.href = targetUrl;
				}, 300);
			}
		});
	});

	// --- 4. Плавная прокрутка для якорных ссылок ---
	const allLinks = document.querySelectorAll('a');
	
	allLinks.forEach(link => {
		const targetUrl = link.getAttribute('href');
		
		if (targetUrl && targetUrl.startsWith('#') && targetUrl.length > 1) {
			link.addEventListener('click', function(e) {
				e.preventDefault();
				const targetElement = document.querySelector(targetUrl);
				
				if (targetElement) {
					targetElement.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
			});
		}
	});

	// --- 5. Фильтрация рецептов (питание) ---
	const filterButtons = document.querySelectorAll('.filter-btn');
	const recipeCards = document.querySelectorAll('.recipes .card');
	
	if (filterButtons.length > 0 && recipeCards.length > 0) {
		
		filterButtons.forEach(button => {
			button.addEventListener('click', () => {
				const filter = button.getAttribute('data-filter');
				
				filterButtons.forEach(btn => btn.classList.remove('active'));
				button.classList.add('active');
				
				recipeCards.forEach(card => {
					const cardCategory = card.getAttribute('data-category');
					
					if (filter === 'all' || cardCategory === filter) {
						card.style.display = 'flex';
						setTimeout(() => {
							card.style.opacity = '1';
						}, 50);
					} else {
						card.style.opacity = '0';
						setTimeout(() => {
							card.style.display = 'none';
						}, 300);
					}
				});
				
			});
		});
	}

	// Progress bar при переходах
	function showLoadingBar() {
		const loadingBar = document.createElement('div');
		loadingBar.id = 'loading-bar';
		loadingBar.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			height: 3px;
			background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
			width: 0%;
			z-index: 9999;
			transition: width 0.3s;
		`;
		document.body.appendChild(loadingBar);
		
		setTimeout(() => {
			loadingBar.style.width = '70%';
		}, 10);
		
		setTimeout(() => {
			loadingBar.style.width = '100%';
			setTimeout(() => {
				loadingBar.remove();
			}, 300);
		}, 300);
	}
	
	// Вызывать при клике на ссылки
	document.querySelectorAll('a[href^=""]').forEach(link => {
		link.addEventListener('click', (e) => {
			if (!link.href.includes('#')) {
				showLoadingBar();
			}
		});
	});
	
	// Анимация появления при скролле
	function animateOnScroll() {
		const elements = document.querySelectorAll('.card, .post-preview, .philosophy-item');
		
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1 });
		
		elements.forEach(el => {
			el.classList.remove('visible'); // Сначала скрываем
			observer.observe(el);
		});
	}
	
	// Вызвать после загрузки DOM
	animateOnScroll();
	
	// Восстанавливаем прозрачность после перехода
	setTimeout(() => {
		document.body.style.opacity = '1';
	}, 100);
});