document.addEventListener("DOMContentLoaded", () => {
	const searchIcon = document.querySelector(".fa-magnifying-glass");
	const cartIcon = document.querySelector(".fa-bag-shopping");
	const productCards = Array.from(document.querySelectorAll(".product-card"));
	const artisanCards = Array.from(document.querySelectorAll(".artisan-card"));
	const addButtons = Array.from(document.querySelectorAll(".add-btn"));
	let cartCount = 0;

	const cartBadge = document.createElement("span");
	cartBadge.textContent = "0";
	cartBadge.style.cssText = `
		position: absolute;
		top: -10px;
		right: -12px;
		min-width: 20px;
		padding: 2px 5px;
		border-radius: 10px;
		background: var(--secondary-color);
		color: #fff;
		font-size: 0.7rem;
		line-height: 16px;
		text-align: center;
	`;

	if (cartIcon) {
		cartIcon.parentElement.style.position = "relative";
		cartIcon.parentElement.appendChild(cartBadge);
	}

	const searchInput = document.createElement("input");
	searchInput.type = "search";
	searchInput.placeholder = "Search this page";
	searchInput.setAttribute("aria-label", "Search this page");
	searchInput.style.cssText = `
		display: none;
		width: min(260px, 45vw);
		padding: 0.55rem 0.75rem;
		border: 1px solid var(--primary-color);
		border-radius: 4px;
		font: inherit;
	`;

	if (searchIcon) {
		searchIcon.parentElement.insertBefore(searchInput, searchIcon);
		searchIcon.setAttribute("role", "button");
		searchIcon.setAttribute("tabindex", "0");
		searchIcon.setAttribute("aria-label", "Open product search");
	}

	const aboutHero = document.querySelector(".about-hero");
	const aboutDetails = document.querySelector(".details-panel");
	const artisanHero = document.querySelector(".artisan-hero");
	const artisanGrid = document.querySelector(".artisan-grid");

	const filterPageContent = () => {
		const query = searchInput.value.trim().toLowerCase();

		productCards.forEach((card) => {
			const productText = card.textContent.toLowerCase();
			card.style.display = productText.includes(query) ? "" : "none";
		});

		artisanCards.forEach((card) => {
			const artisanText = card.textContent.toLowerCase();
			card.style.display = artisanText.includes(query) ? "" : "none";
		});

		if (aboutHero) {
			const heroText = aboutHero.textContent.toLowerCase();
			aboutHero.style.display = heroText.includes(query) ? "" : "none";
		}

		if (aboutDetails) {
			const detailsText = aboutDetails.textContent.toLowerCase();
			aboutDetails.style.display = detailsText.includes(query) ? "" : "none";
		}

		if (artisanHero) {
			const heroText = artisanHero.textContent.toLowerCase();
			artisanHero.style.display = heroText.includes(query) ? "" : "none";
		}

		if (artisanGrid) {
			const gridText = artisanGrid.textContent.toLowerCase();
			artisanGrid.style.display = gridText.includes(query) ? "" : "none";
		}
	};

	const toggleSearch = () => {
		const isOpen = searchInput.style.display === "inline-block";
		searchInput.style.display = isOpen ? "none" : "inline-block";
		searchIcon.setAttribute("aria-label", isOpen ? "Open product search" : "Close product search");

		if (isOpen) {
			searchInput.value = "";
			filterPageContent();
		} else {
			searchInput.focus();
		}
	};

	if (searchIcon) {
		searchIcon.addEventListener("click", toggleSearch);
		searchIcon.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				toggleSearch();
			}
		});
		searchInput.addEventListener("input", filterPageContent);
	}

	addButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const card = button.closest(".product-card");
			const productName = card.querySelector(".product-title").textContent.trim();

			cartCount += 1;
			cartBadge.textContent = cartCount;
			button.innerHTML = "<i class=\"fa-solid fa-check\"></i> Added";
			button.disabled = true;

			const toast = document.createElement("div");
			toast.textContent = `${productName} added to cart`;
			toast.style.cssText = `
				position: fixed;
				right: 20px;
				bottom: 20px;
				z-index: 2000;
				padding: 1rem 1.25rem;
				border-radius: 4px;
				background: var(--primary-color);
				color: #fff;
				box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
			`;
			document.body.appendChild(toast);

			setTimeout(() => {
				toast.remove();
				button.innerHTML = "<i class=\"fa-solid fa-plus\"></i> Add";
				button.disabled = false;
			}, 1500);
		});
	});
});
