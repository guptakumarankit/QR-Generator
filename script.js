const  input_box = document.querySelector('#input-box');
// console.log(input_box);

const generate_button = document.querySelector('#QR-Generator');
// console.log(generate_button);

const download_button = document.querySelector("#download");
console.log(download_button);

const shape_box_name = document.querySelector('.shape-box-name');
console.log(shape_box_name);

const shape_content = document.querySelector('.shape-content');
console.log(shape_content);

const imageContainer =  document.querySelector('.image-container');
console.log(imageContainer);

let count = 0;
const chevon_down = document.querySelector('#chevron-down');
// console.log(chevon_down);

const show_shapeContent = function(){
     if((count&1)){
          shape_content.classList.remove('shape-active');
      }
      else{
          shape_content.classList.add('shape-active');
      }
      count++;
      console.log(count)
}

chevon_down.addEventListener('click',show_shapeContent);

document.querySelector('#upTodown-Rectangle').addEventListener('click',function(){
     shape_box_name.innerHTML = 'Upto-Down Rectangle';
})

document.querySelector('#leftToright-Rectangle').addEventListener('click',function(){
     shape_box_name.innerHTML = 'Left-To-Right Rectangle';
})

document.querySelector('#square').addEventListener('click',function(){
     shape_box_name.innerHTML = 'Square';
})

const checkValidURL = function validURL(){
     if(input_box.value === ""){
          alert('Please Enter the URL');
          return false;
     }
     else{
          return true;
     } 
}

function generate(){
     if(checkValidURL()){
          const rotate = document.querySelector('.rotate');
          console.log(rotate);
          rotate.setAttribute('id','rotate-icon');
     
          setTimeout(function(){
               imageContainer.innerHTML = '';
               let input = input_box.value;
               // console.log(input);
               const api = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input}`;
               // console.log(api); 
          
               const image = document.createElement("img");
               if(shape_box_name.innerHTML === 'Upto-Down Rectangle'){
                   image.style.height = '12rem';  
                   image.style.width = '8rem';  
               }
               else if(shape_box_name.innerHTML === 'Left-To-Right Rectangle'){
                    image.style.width = '12rem';  
                    image.style.height = '8rem';
               }
               else if(shape_box_name.innerHTML === 'Square'){
                    image.style.width = '10rem';  
                    image.style.height = '10rem';
               }
     
               image.style.padding = "5px"
               image.setAttribute('id','img');
               image.src = api;
               document.querySelector('.image-container').appendChild(image);
               rotate.removeAttribute('id','rotate-icon');
          },2000);
     }
}

document.addEventListener('keydown',function(e){
      if(e.key === 'Enter'){
          // console.log('Enter hi hai')
          generate();
      }
});


generate_button.addEventListener('click',function(){
     generate();
});
input_box.value = "";


async function download(){
     let image = document.getElementById('img');
     let url = img.src;
     console.log(url);

     const response = await fetch(url);
     console.log(response);
     
     const data = await response.blob();
     console.log(data); 
     
     const anc = document.createElement('a');
     anc.href = URL.createObjectURL(data); // temp url
     console.log(anc.href);
     //agar data ko blob fomat me late hai to temp link bana kar anc ke href me dalete hai
     anc.download = `${input_box.value}.png`;
     anc.click();
}


download_button.addEventListener('click',function(){    
     checkValidURL();
     download();
});