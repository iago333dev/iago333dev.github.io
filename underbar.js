const contentDOM = document.querySelector('#browser');
const conhecDOM = document.querySelector('#conhec');
const expDOM = document.querySelector('#exp');





function ul(index) {

	if(index === 0){	
		contentDOM.classList.add("ShowBrowser");
		contentDOM.classList.remove("ShowBrowserFinish");
	}

	if(index === 1){	
		conhecDOM.classList.add("ShowBrowser");
		conhecDOM.classList.remove("ShowBrowserFinish");
	}

	if(index === 2){	
		expDOM.classList.add("ShowBrowser");
		expDOM.classList.remove("ShowBrowserFinish");
	}

	if(index !== 0){
		contentDOM.classList.add("ShowBrowserFinish");
		
	}

	if(index !== 1){
		conhecDOM.classList.add("ShowBrowserFinish");
	}

	if(index !== 2){
		expDOM.classList.add("ShowBrowserFinish");
	}



	
	var underlines = document.querySelectorAll(".underline");

	for (var i = 0; i < underlines.length; i++) {
		underlines[i].style.transform = 'translate3d(' + index * 100 + '%,0,0)';
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	ul(0);

  });





