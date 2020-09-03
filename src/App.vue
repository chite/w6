<template>
  <article class="main">
    <router-view />
    <footer class="footer">
      <div class="float-right footer__container">
        <div class="container-fluid h-100">
          <div class="row h-100">
            <div
              class="col-6 d-flex justify-content-end align-items-center h-100"
            >
              <img src="@/assets/logo.svg" class="footer__img" />
            </div>
            <div
              class="col-6 d-flex align-items-center h-100"
            >
              <ul class="footer__text h-75 d-flex justify-content-around flex-column">
                <li><i class="fas fa-phone-alt"></i>&nbsp;&nbsp;07-536-0000</li>
                <li><i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;香港銅鑼灣興發街1號</li>
                <li><i class="fab fa-instagram"></i>&nbsp;&nbsp;I_dont_wank_to_work</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </article>
</template>
