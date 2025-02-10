<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="#">Logo </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link active" aria-current="page" to="/aboutus">About Us</router-link>
            </li>
           
            <li class="nav-item">
                <router-link class="nav-link active" aria-current="page" to="/contactus">Contact us</router-link>
            </li>
            <li class="nav-item">
               <router-link to="signup" class="nav-link active"> Sign up </router-link>
            </li>
            <span>
                <li class="nav-item">
               <router-link to="login" class="nav-link active"> Login </router-link>
            </li>    
             </span>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </template>

<style scoped>

</style>
  