<template>
  <main class="all">
    <section class="home">
      <div class="home__bg">
        <div class="d-flex">
          <img alt="bg" class="home__bgImg" :src="pt ? pt : ''" />
          <h5 class="home__bgText text-center">不 想 － 上 班</h5>
        </div>
        <div class="d-flex flex-column align-items-center">
          <h6 class="text-center c-font mt-5">Slide</h6>
          <h6 class="home__arrow">>></h6>
        </div>
      </div>
      <div class="home__rowline d-flex justify-content-center">
        <img
          alt="Vue logo"
          class="home__icon d-none d-sm-block"
          src="../assets/logo.svg"
        />
        <div class="d-none d-sm-block">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <h1 class="home__title ">I don't want to work</h1>
      </div>
    </section>
    <h2 class="c-font text-center my-5 title">ROOMS</h2>
    <section class="container-fluid card__container p-5" v-if="finished == 2">
      <div class="row">
        <div
          class="col-sm-4 col-12 my-4 d-flex"
          v-for="(el, index) in renderDetail"
          :key="el.name"
        >
          <h5 class="card__title d-none d-sm-block text-right">
            {{ el.name }}
          </h5>
          <div class="card">
            <router-link :to="`/book/${index}/${el.id}`">
              <img
                :src="renderInfo[index].imageUrl"
                class="card-img-top card__img"
                alt="room picture"
              />
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-12 col-sm-4 my-2 d-flex flex-column text-center"
                  >
                    <p>人數</p>
                    <h5>
                      {{
                        el.descriptionShort.GuestMin !==
                        el.descriptionShort.GuestMax
                          ? el.descriptionShort.GuestMin +
                            '~' +
                            el.descriptionShort.GuestMax
                          : el.descriptionShort.GuestMin
                      }}
                    </h5>
                  </div>
                  <div
                    class="col-12 col-sm-4 my-2 d-flex flex-column text-center"
                  >
                    <p>床</p>
                    <h5>{{ el.descriptionShort.Bed.join(' ') }}</h5>
                  </div>
                  <div
                    class="col-12 col-sm-4 my-2 d-flex flex-column text-center"
                  >
                    <p>大小</p>
                    <h5>{{ el.descriptionShort.Footage}}m<sup>2</sup></h5>
                  </div>
                </div>
                <hr />
                <p>
                  {{ this.collectInfo(el.amenities) }}
                </p>
                <hr />
                <div class="row align-items-center py-2 px-2">
                  <div class="col-3">
                    <h6>假日</h6>
                  </div>
                  <div class="col-9 text-center">
                    <h5 class="c-font">${{ el.holidayPrice }}</h5>
                  </div>
                </div>
                <div class="row align-items-center card__price--spec">
                  <div class="col-3">
                    <h6>平日</h6>
                  </div>
                  <div class="col-9 text-center">
                    <h3 class="c-font">${{ el.normalDayPrice }}</h3>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>

export default {
  name: 'Home',
  data: function() {
    return {
      pt: '',
      finished: 0,
    }
  },
  computed: {
    renderInfo() {
      return this.$store.state.info
    },
    renderDetail() {
      return this.$store.state.detail
    },
  },
  methods: {
    collectInfo(obj) {
      let data = []
      Object.keys(obj).forEach((element) => {
        switch (element) {
          case 'Air-Conditioner':
            if (obj[element]) data.push('空調')
            break
          case 'Breakfast':
            if (obj[element]) data.push('早餐')
            break
          case 'Child-Friendly':
            if (obj[element]) data.push('適合兒童')
            break
          case 'Great-View':
            if (obj[element]) data.push('漂亮的視野')
            break
          case 'Mini-Bar':
            if (obj[element]) data.push('小吧檯')
            break
          case 'Pet-Friendly':
            if (obj[element]) data.push('可帶寵物')
            break
          case 'Refrigerator':
            if (obj[element]) data.push('冰箱')
            break
          case 'Room-Service':
            if (obj[element]) data.push('客房服務')
            break
          case 'Smoke-Free':
            if (obj[element]) data.push('禁止吸菸')
            break
          case 'Sofa':
            if (obj[element]) data.push('沙發')
            break
          case 'Television':
            if (obj[element]) data.push('電視')
            break
          case 'Wi-Fi':
            if (obj[element]) data.push('wifi')
            break
          default:
            break
        }
      })
      return data.join(' , ')
    },
    getDetail(id, index) {
      return new Promise((resolve) => {
        fetch('https://challenge.thef2e.com/api/thef2e2019/stage6/room/' + id, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization:
              'Bearer ' +
              '59c4DCnp6qxwxV2z8epgFbvNJ3VOYeIy4mPDrQMEK2DFcaqYCzW7B1I6J7iJ',
          },
        })
          .then((val) => val.json())
          .then((val) => {
            this.$store.commit({
              type: 'setDetail',
              detail: val.room[0],
              index: index,
            })
            resolve()
          })
      })
    },
  },
  mounted() {
    const self = this
    fetch('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization:
          'Bearer ' +
          '59c4DCnp6qxwxV2z8epgFbvNJ3VOYeIy4mPDrQMEK2DFcaqYCzW7B1I6J7iJ',
      },
    })
      .then((e) => e.json())
      .then(async function(data) {
        self.pt = data.items[0].imageUrl
        self.finished = 1
        self.$store.commit({ type: 'setInfo', info: data.items })

        for (let i = 0; i < 6; i++) {
          await self.getDetail(data.items[i].id, i)
        }
        self.finished = 2
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>
