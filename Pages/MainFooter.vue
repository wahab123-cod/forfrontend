<template>
  <footer class="bg-dark text-white py-4">
    <div class="container custom-footer-container">
      <div class="row">
        <div class="col-md-4">
          <h5 class="footer-title">Contact</h5>
          <ul class="list-unstyled">
            <li>Email: <a href="mailto:info@company.com" class="text-white footer-link">info@company.com</a></li>
            <li>Phone: +1 (123) 456-7890</li>
          </ul>
        </div>
        <div class="col-md-4 mb-3">
        
          <ul class="list-unstyled">
            <li class="check" ><router-link to="/" class="text-white footer-link" >Home</router-link></li>
            <li class="check"><router-link to="/aboutus" class="text-white footer-link">About</router-link></li>
            <li class="check"><router-link to="/contactus" class="text-white footer-link">Contact</router-link></li>
          </ul>
        </div>
      </div>


      <!--   <div class="text-center mt-0">
        <a href="https://facebook.com" class="social-icon mx-2" target="_blank">
          <i class="fab fa-facebook-f"></i>
        </a>
      </div> -->
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
};
</script>

<style scoped>
footer {
  background-color: #2c3e50;
  width: 100%;
}

.container {
  max-width: 100%;
  margin-top:20px

}

.footer-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
}


.footer-link {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
}


.social-icon {
  font-size: 1.5rem;
  color: #ecf0f1;
  transition: color 0.3s;
}

.social-icon:hover {
  color: #1abc9c;
}

small {
  font-size: 0.875rem;
  color: #95a5a6;
}


@media (max-width: 768px) {
  .footer-title {
    text-align: center;
  }

  .list-unstyled {
    text-align: center;
  }

  .social-icon {
    font-size: 2rem;
  }

  .custom-footer-container {
    padding-left: 15px;
    padding-right: 15px;
  }
}

li.check {
  display: inline;
  margin-right: 30px;
}
</style>
