let elements;
let elementsBox = [];
let areasInfo = [];

let firstArea = document.querySelector('.area');
let areas = document.querySelectorAll('.area__inner');
let cardInput = document.querySelector('.card__input');
let addArea = document.querySelector('.addArea__input');

let inArea = false;
let elemX;
let elemY;

let activeElement;
let tempElement;

let elemsCase;

let areaID = "ID:";

let tempElems;


//Присвоили функцию стартдраг на нажатие мыши
//document.onmousedown = startDrag;

document.onmousedown = mouseDown;


function mouseDown(e) {

	//Тут нужно добавить функцию, которая получит позиции всех элементов

		//getAreasPosition(areas);
	elementsBox = [];
	elements = e.target.parentElement.querySelectorAll(".element");	
	areas = document.querySelectorAll('.area__inner');

	if (e.target.className == "element" || e.target.className == "element active") {
		console.log("Это карточка. Можно передвигать.")
		e.target.className = "active";
		activeElement = document.querySelector(".active");
		
		activeElement.style.left = activeElement.getBoundingClientRect().x + 0.1 + 'px';

		elemX = (activeElement.getBoundingClientRect().x);
		elemY = (activeElement.getBoundingClientRect().y);

		tempElement = document.createElement('div');
		tempElement.classList.add('element');
		tempElement.style.height = activeElement.offsetHeight + 'px';
		tempElement.style.background = 'rgba(77, 77, 77, 0.1)';
	

		elemsCount();
		

		
		console.log(elemX, elemY);

		return startDrag(e);
	}
	else console.log("Это не является карточкой");
}



//Функция для обработки движения элемента
function startDrag(e) {


	activeElement.style.position = 'absolute';
	activeElement.style.left = activeElement.getBoundingClientRect().x + 'px';
	activeElement.style.top = activeElement.getBoundingClientRect().y + 'px';
	
	

	elemX = (activeElement.getBoundingClientRect().x + activeElement.offsetWidth - e.pageX);
	elemY = (activeElement.getBoundingClientRect().y + activeElement.offsetHeight - e.pageY);

	moveAt(e);

	

	//Снимает ограничение на перетаскивание
	activeElement.ondragstart = function() {
		return false;
	};

	function moveAt(e) {
		
		activeElement.style.left = e.pageX - (activeElement.offsetWidth - elemX) +'px';
		activeElement.style.top = e.pageY - (activeElement.offsetHeight - elemY) +'px';

		
		getCollision(activeElement, areas);
		
		// eval(elemsCase); 

		

		console.log(areaID);
		
		
	}
		//Двигаеам элемент
		document.addEventListener ('mousemove', moveAt);

		//Отпускаем элемент 
		activeElement.addEventListener ('mouseup', function (e) {
			drop();
			

			document.removeEventListener('mousemove', moveAt);
			activeElement.onmouseup = null;
			
	});
};

document.addEventListener('mouseup', (e) => {
	
	for (i=0; i < areas.length; i++) {
		areas[i].classList.remove('shadow');
		console.log("mouseUp: document")
	}
	
})

//Обработчик для добавления карточки


document.addEventListener('keydown', (e) => {
	if(e.keyCode == 13 && e.target.className == 'card__input') {
		
		console.log('Карточку можно добавить');
		cardInput = e.target.parentElement.querySelector(".card__input");

		let card = document.createElement('div');
		card.classList.add('element');
		card.innerHTML = cardInput.value;
		cardInput.before(card);
		cardInput.value = "";

		
	}
});

addArea.addEventListener('keydown', function (e) {
	if(e.keyCode == 13) { 
		var newArea = firstArea.cloneNode(true);
		var newInput = (newArea.querySelector(".card__input")).cloneNode();
		console.log(newInput);
		newArea.querySelector(".area__inner").innerHTML = '';

		newArea.querySelector('.area__inner').append(newInput);
		newArea.querySelector('.area__title').innerHTML = addArea.value;
		addArea.value = '';
		addArea.blur();

		addArea.parentElement.before(newArea);
	}
})

document.addEventListener('keydown', function (e)  {
	if (e.keyCode == 84) {
		
	}
})

// Функция для проверки условия для сброса элемента

function drop () {
	console.log('Drop: ', inArea)
	


	if(inArea) {
		console.log("Элемент можно бросить", inArea);
		
		activeElement.style.transition = 'all 0.5s ease';
		document.onmousedown = "";
		setTimeout(() => {
			document.onmousedown = mouseDown;
		}, 500);

		

		activeElement.style.left = tempElement.getBoundingClientRect().x + 'px';
		activeElement.style.top = tempElement.getBoundingClientRect().y + 'px';

		activeElement.onmousedown = null;
		
		activeElement.addEventListener('transitionend', function() {
			activeElement.style.transition = '';
			activeElement.style.position = 'relative';
			activeElement.style.top = "";
			activeElement.style.left = "";
			
			tempElement.after(activeElement);

			activeElement.className ="element";
			tempElement.remove();
			
			
			console.log("Анимация закончилась...");
		});
		} else {
		console.log("Элемент нельзя бросить", inArea);
		activeElement.className = "element";
		tempElement.remove();
		activeElement.style.transition = '';
		}
}


function elemsCount() {
	
	elemsCase = `switch (true) { \n`;

	for (i = 0; i < elements.length; i++) {
		elementsBox.push ({
			elemCase: `case ${Number.parseInt(elements[i].getBoundingClientRect().y)} > 
			Number.parseInt(activeElement.getBoundingClientRect().y): elements[${i}].before(tempElement); break;\n`
		});
	
		elemsCase += elementsBox[i].elemCase;
	}
		elemsCase += `default: cardInput.before(tempElement); break;}`;
};



function getCollision (actElem, areas) {

	eval(elemsCase); 
	console.log(elemsCase);
	for (i = 0; i < areas.length; i++) {
		if (areas[i].getBoundingClientRect().x < actElem.getBoundingClientRect().x && 
			areas[i].getBoundingClientRect().x + areas[i].getBoundingClientRect().width > actElem.getBoundingClientRect().x) {
			areas[i].classList.add('shadow');
			
			
			elements = areas[i].querySelectorAll(".element");
			cardInput = areas[i].querySelector('.card__input');
			

			//getAreasPosition(areas);

			elementsBox = [];

			elemsCount();
			
			inArea = true;
			break;
		}	
		else {
			
			areas[i].classList.remove('shadow');
			inArea = false;	
		}
	}
	


}


