const $ = document.querySelector.bind(document);
const menu = $('.menu');

function toggleMenu() {
	menu.classList.toggle('opened')
}

menu.addEventListener('click', toggleMenu);

window.addEventListener('load',  event => {
	// Controles do menu
	const menuNavigation = $('.menu-navigation-items');

	let menuItems = [
		{label: "Lista de Livros", link: "lista-livros.html"},
		{label: "Registro de Livros", link: "registro-livros.html"},
	];

	menuItems.forEach(menu => {
		let menuNavigationItem = document.createElement('li');
		menuNavigationItem.classList.add('menu-navigation-item');

		let menuNavigationItemLink = document.createElement('a');
		menuNavigationItemLink.classList.add('menu-navigation-item-link');
		menuNavigationItemLink.href = menu.link;
		menuNavigationItemLink.innerText = menu.label;

		menuNavigationItem.appendChild(menuNavigationItemLink);
		menuNavigation.appendChild(menuNavigationItem);
	});
});
