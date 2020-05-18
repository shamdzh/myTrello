const elem = document.querySelector(".element");
const area = document.querySelector('.area');
const cardInput = document.querySelector('.card');

let inArea = false;
let elemX;

//Присвоили функцию стартдраг на нажатие мыши
elem.onmousedown = startDrag;



//Функция для обработки движения элемента
function startDrag(e) {

	console.log(elem.getBoundingClientRect().x);
	console.log(elem.getBoundingClientRect().y);
	console.log("Event src: " + e.srcElement.src);


	elem.style.position = 'absolute';
	elem.style.left = elem.getBoundingClientRect().x + 'px';
	elem.style.top = elem.getBoundingClientRect().y + 'px';
	
	

	elemX = (elem.getBoundingClientRect().x + elem.offsetWidth - e.pageX);
	elemY = (elem.getBoundingClientRect().y + elem.offsetHeight - e.pageY);

	moveAt(e);

	

	

	function moveAt(e) {
		
		elem.style.left = e.pageX - (elem.offsetWidth - elemX) +'px';
		elem.style.top = e.pageY - (elem.offsetHeight - elemY) +'px';

		console.log("Позиция элемента: " + elem.getBoundingClientRect().x);
		console.log("elemX: " + elemX);

		if (elem.getBoundingClientRect().x < area.getBoundingClientRect().x + area.getBoundingClientRect().width && 
			elem.getBoundingClientRect().y + elem.getBoundingClientRect().height > area.getBoundingClientRect().y) {
			area.classList.add('shadow');
			this.inArea = true;
		} else {
			area.classList.remove('shadow');
			this.inArea = false;
		}
	}
	

	document.onmousemove = function (e) {
		moveAt(e);
	}

	elem.onmouseup = function () {
		drop(inArea, () => {
			console.log("Произошел вызов колбэк");
		});
		
		document.onmousemove = null;
		elem.onmouseup = null;
	};
};


// Функция для проверки условия для сброса элемента

function drop (inArea, callback) {
	if(this.inArea) {
		console.log("Элемент можно бросить");
		elem.style.transition = 'all 1s ease';
		area.classList.remove('shadow');

		elem.style.left = area.querySelector('.area__inner').getBoundingClientRect().x + 10 + 'px';
		elem.style.top = area.querySelector('.area__inner').getBoundingClientRect().y + 'px';

		elem.onmousedown = "";

		elem.addEventListener('transitionend', function() {
			elem.style.transition = '';
			console.log("Анимация закончилась...");
			elem.onmousedown = startDrag;
		});
		

		} else {
	
		console.log("Элемент нельзя бросить");
		elem.style.transition = '';
	}

	
	
	

}

//Снимает ограничение на перетаскивание

elem.ondragstart = function() {
	return false;
};

//Функция добавления карточки
cardInput.addEventListener('keydown', (e) => {
	if(e.keyCode == 13) {
		console.log('Карточку можно добавить');
		let card = document.createElement('div');
		card.classList.add('element');
		card.innerHTML = cardInput.value;
		area.querySelector('.area__inner').prepend(card);
	}
})