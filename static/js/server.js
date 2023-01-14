// server.js

var cacheBustingParam = Date.now();

function generate() {
  const prompt_ = document.getElementById('prompt').value;
  const negative = document.getElementById('negative').value;
  const numSteps = document.getElementById('steps-slider').value;
  const guidance = document.getElementById('guidance-slider').value;

  var formData = new FormData();
  
  formData.append('prompt', prompt_);
  formData.append('negative', negative);
  formData.append('numSteps', numSteps);
  formData.append('guidance', guidance);
  
  var mode = 'txt2img';
    var img = generateModelImage();
	if (img!=0){
		mode = 'img2img';
		formData.append('image', img);
		
		var mask = generateMaskImage();
		if (mask!=0) {
			mode = 'inpainting';
			formData.append('mask', mask);
		}
		
		const noise = document.getElementById('noise-slider').value;
		formData.append('noise', noise);
	}

    var xhr = new XMLHttpRequest();
    xhr.open("POST", mode, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        var url = JSON.parse(xhr.response).image + '?v=' + cacheBustingParam;
        updateRenderImage(url);
      } else {
        console.error('Error:', xhr);
      }
    };
    xhr.send(formData);
}

function changeModel() {
  var model_id = document.getElementById('model_id').value;

  var formData = new FormData();
  
  formData.append('model_id', model_id);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'change_model', true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        model_id = JSON.parse(xhr.response).model_id;
        document.getElementById('model_id').value = model_id;
      } else {
        console.error('Error:', xhr);
      }
    };
    xhr.send(formData);
}
