const elem = document.querySelector(".element");
const area = document.querySelector('.area');



let inArea = false;



elem.onmousedown = startDrag;




function startDrag(e) {
	// console.log(elem);

	elem.style.position = 'absolute';
	

	moveAt(e);


	function moveAt(e) {
		elem.style.left = e.pageX - elem.offsetWidth/2 +'px' ;
		elem.style.top = e.pageY - elem.offsetHeight/2 +'px';

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

function drop (inArea, callback) {
	if(this.inArea) {
		console.log("Элемент можно бросить");
		elem.style.transition = 'all 1s ease';
		area.classList.remove('shadow');

		elem.style.left = area.querySelector('.area__inner').getBoundingClientRect().x + 10 + 'px';
		elem.style.top = area.querySelector('.area__inner').getBoundingClientRect().y + 10 + 'px';

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

