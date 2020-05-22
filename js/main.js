const elements = document.querySelectorAll(".element");
const areas = document.querySelectorAll('.area');
const cardInput = document.querySelector('.card__input');

let inArea = false;
let elemX;
let elemY;

let activeElement;
let tempElement;


//Присвоили функцию стартдраг на нажатие мыши
//document.onmousedown = startDrag;

document.onmousedown = mouseDown;


function mouseDown(e) {
	if (e.target.className == "element" || e.target.className == "element active") {
		console.log("Это карточка. Можно передвигать.")
		e.target.classList.add("active");
		activeElement = document.querySelector(".active");
		
		elemX = (activeElement.getBoundingClientRect().x);
		elemY = (activeElement.getBoundingClientRect().y);

		tempElement = document.createElement('div');
		tempElement.classList.add('element');
		tempElement.style.height = activeElement.offsetHeight + 'px';
		tempElement.style.background = 'rgba(77, 77, 77, 0.1)';

		
		activeElement.after(tempElement);

		

		console.log(elemX, elemY);

		return startDrag(e);
	}
	else console.log("Это не является карточкой");
}



//Функция для обработки движения элемента
function startDrag(e) {


	//Снимает ограничение на перетаскивание


	activeElement.ondragstart = function() {
		return false;
	};


	activeElement.style.position = 'absolute';
	activeElement.style.left = activeElement.getBoundingClientRect().x + 'px';
	activeElement.style.top = activeElement.getBoundingClientRect().y + 'px';
	
	

	elemX = (activeElement.getBoundingClientRect().x + activeElement.offsetWidth - e.pageX);
	elemY = (activeElement.getBoundingClientRect().y + activeElement.offsetHeight - e.pageY);

	moveAt(e);

	

	

	function moveAt(e) {
		
		activeElement.style.left = e.pageX - (activeElement.offsetWidth - elemX) +'px';
		activeElement.style.top = e.pageY - (activeElement.offsetHeight - elemY) +'px';

		// 

		if (activeElement.getBoundingClientRect().x < areas[0].getBoundingClientRect().x + areas[0].getBoundingClientRect().width && 
		activeElement.getBoundingClientRect().y + activeElement.getBoundingClientRect().height > areas[0].getBoundingClientRect().y) {
			areas[0].classList.add('shadow');
			inArea = true;
			
		} else {
			areas[0].classList.remove('shadow');
			inArea = false;
			
		}

		console.log(inArea);
	}
		//Двигаеам элемент
		document.addEventListener ('mousemove', moveAt);

		//Отпускаем элемент 
		activeElement.onmouseup = function (e) {
		drop();
		document.removeEventListener('mousemove', moveAt);
		activeElement.onmouseup = null;
		
		
		
		
	
	};
};


// Функция для проверки условия для сброса элемента

function drop () {
	console.log('Drop: ', inArea)

	if(inArea) {
		console.log("Элемент можно бросить", this.inArea);
		
		activeElement.style.transition = 'all 1s ease';
		document.onmousedown = "";
		setTimeout(() => {
			document.onmousedown = mouseDown;
		}, 1000);

		areas[0].classList.remove('shadow');

		activeElement.style.left = tempElement.getBoundingClientRect().x + 'px';
		activeElement.style.top = tempElement.getBoundingClientRect().y + 'px';

		activeElement.onmousedown = null;

		activeElement.addEventListener('transitionend', function() {
			activeElement.style.transition = '';
			activeElement.style.position = 'relative';
			activeElement.style.top = "";
			activeElement.style.left = "";
			
			tempElement.after(activeElement);

			activeElement.classList.remove("active");
			tempElement.remove();

		
			console.log("Анимация закончилась...");
		});} else {
		console.log("Элемент нельзя бросить", inArea);
		activeElement.classList.remove("active");
		tempElement.remove();
		activeElement.style.transition = '';
		}
	}


//Функция добавления карточки
cardInput.addEventListener('keydown', (e) => {
	if(e.keyCode == 13) {
		console.log('Карточку можно добавить');
		let card = document.createElement('div');
		card.classList.add('element');
		card.innerHTML = cardInput.value;
		areas[0].querySelector('.card__input').before(card);
		cardInput.value = "";
	}
});