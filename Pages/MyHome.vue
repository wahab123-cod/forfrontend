<template>
  <div>
    <h1>Home Component</h1>
    <div class="card-container">
      <div class="card" v-for="n in 8" :key="n" style="width: 18rem;">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnDleeVQXrAgCqIJ3W-SbQ2Yc8khyjHBjf4g&s" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


.card {
  width: 100%; 
  max-width: 400px;
}


.card-container {
    display: flex;
 
    align-items: center; 
    gap: 15px; 
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;  
    gap: 15px;       
    justify-content: center; 
  }

</style>
