const elem = document.querySelector(".element");
const area = document.querySelector('.area');
const cardInput = document.querySelector('.card');

let inArea = false;
let elemX;




//Присвоили функцию стартдраг на нажатие мыши
//document.onmousedown = startDrag;

document.onmousedown = (e) => {
	
	if (e.target.className == "element") {
		console.log("Это карточка. Можно передвигать.")
		return startDrag(e);
	}
	else console.log("Это не является карточкой");
	
}




//Функция для обработки движения элемента
function startDrag(e) {


	//Снимает ограничение на перетаскивание

	e.target.ondragstart = function() {
		return false;
	};


	e.target.style.position = 'absolute';
	e.target.style.left = e.target.getBoundingClientRect().x + 'px';
	e.target.style.top = e.target.getBoundingClientRect().y + 'px';
	
	

	elemX = (e.target.getBoundingClientRect().x + e.target.offsetWidth - e.pageX);
	elemY = (e.target.getBoundingClientRect().y + e.target.offsetHeight - e.pageY);

	moveAt(e);

	

	

	function moveAt(e) {
		
		e.target.style.left = e.pageX - (e.target.offsetWidth - elemX) +'px';
		e.target.style.top = e.pageY - (e.target.offsetHeight - elemY) +'px';

		// 

		if (e.target.getBoundingClientRect().x < area.getBoundingClientRect().x + area.getBoundingClientRect().width && 
		e.target.getBoundingClientRect().y + e.target.getBoundingClientRect().height > area.getBoundingClientRect().y) {
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

	e.target.onmouseup = function () {
		drop(inArea, e);
		
		document.onmousemove = null;
		e.target.onmouseup = null;
	};
};


// Функция для проверки условия для сброса элемента

function drop (inArea, e) {
	if(this.inArea) {
		console.log("Элемент можно бросить");
		e.target.style.transition = 'all 1s ease';
		area.classList.remove('shadow');

		e.target.style.left = area.querySelector('.area__inner').getBoundingClientRect().x + 'px';
		e.target.style.top = area.querySelector('.area__inner').getBoundingClientRect().y + 'px';

		e.target.onmousedown = "";

		e.target.addEventListener('transitionend', function() {
			e.target.style.transition = '';
			console.log("Анимация закончилась...");
			e.target.onmousedown = startDrag;
		});
		

		} else {
	
		console.log("Элемент нельзя бросить");
		e.target.style.transition = '';
	}


}



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