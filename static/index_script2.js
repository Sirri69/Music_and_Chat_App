//entering room id
//Step 1

var nickname = "Anyonmous";
var r_id = null


function ROOM2(){
  Swal.fire({
    title: "ENTER YOUR NICKNAME",
    input: 'text',
    
    confirmButtonText: 'Join Room' 
    }).then(function(value){
      if (value.value == ""){
        value.value = nickname; //TO BE REPAIRED LATER
      }
      nickname = value.value;
      alert(nickname);


    Swal.fire({
    title: "ENTER ROOM ID",
    input: 'text',
    
    confirmButtonText: 'Join Room' 
    }).then(function(value){
      if (value.value == ""){
        value.value = nickname; //TO BE REPAIRED LATER
      }
      nickname = value.value;
      alert(nickname);
    })
    })





}




/*

function ROOM() {
  Swal.fire({
  title: 'ENTER YOUR NICKNAME',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  showCancelButton: true,
  confirmButtonText: 'CONFIRM',
  showLoaderOnConfirm: true,
  /*preConfirm: (login) => {
    return fetch(`//api.github.com/users/${login}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .catch(error => {
        Swal.showValidationMessage(
          `INVALID : ${error}`
        )
      })
  },


  allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
  if (result.isConfirmed) {
    
     

     
//Step 2 of room id


swal({
  text: 'ENTER ROOM ID',
  content: "input",
  button: {
    text: "CONFIRM",
    closeModal: false,
  },
})

.then(name => {
  if (!name) throw null;
 
  return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
})
.then(results => {
  return results.json();
})
.then(json => {
  const movie = json.results[0];
 
  if (!movie) {
    return swal("No movie was found!");
  }
 
  const name = movie.trackName;
  const imageURL = movie.artworkUrl100;
 
  swal({
    title: "Top result:",
    text: name,
    icon: imageURL,
  });
})
.catch(err => {
  if (err) {
    swal("Oh noes!", "The AJAX request failed!", "error");
  } else {
    swal.stopLoading();
    swal.close();
  }
});





  
  }
})
}

*/









/*

// GEneration
//Step 1

function GENERATE() {
 
Swal.fire({
  title: 'ENTER YOUR NICKNAME',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  showCancelButton: true,
  confirmButtonText: 'CONFIRM',
  showLoaderOnConfirm: true,
  preConfirm: (login) => {
    return fetch(`//api.github.com/users/${login}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .catch(error => {
        Swal.showValidationMessage(
          `INVALID: ${error}`
        )
      })
  },
  allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
  if (result.isConfirmed) {
   


//ABHI ip ke liye h badh meh room generator add ker lena
//Step 2


const ipAPI = '//api.ipify.org?format=json'

Swal.queue([{
  title: 'Your public IP',
  confirmButtonText: 'Show my public IP',
  text:
    'Your public IP will be received ' +
    'via AJAX request',
  showLoaderOnConfirm: true,
  preConfirm: () => {
    return fetch(ipAPI)
      .then(response => response.json())
      .then(data => Swal.insertQueueStep(data.ip))
      .catch(() => {
        Swal.insertQueueStep({
          icon: 'error',
          title: 'Unable to get your public IP'
        })
      })
  }
}])



  }
})

}

*/




var nickname1 = "Anyonmous";
var r_id = null


function GENERATE(){
  Swal.fire({
    title: "ENTER YOUR NICKNAME",
    input: 'text',
    
    confirmButtonText: 'Join Room' 
    }).then(function(value){
      if (value.value == ""){
        value.value = nickname1; //TO BE REPAIRED LATER
      }
      nickname1 = value.value;
      alert(nickname1);


    
    })
    



}







