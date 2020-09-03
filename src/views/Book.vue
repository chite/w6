<template>
  <div class="all container-fluid">
    <header class="row header">
      <div class="col-6 h-100">
        <img class="header__pt h-100" :src="roomData.imageUrl[0]" alt="pt0" />
      </div>
      <div class="col-6 h-100">
        <div class="w-100 h-50">
          <img class="header__pt" :src="roomData.imageUrl[1]" alt="pt1" />
        </div>
        <div class="w-100 h-50">
          <img class="header__pt" :src="roomData.imageUrl[2]" alt="pt2" />
        </div>
      </div>
    </header>
    <h1 class="room__title">{{ roomData.name }}</h1>

    <section class="row room__body">
      <div class="col-sm-6 col-12">
        <form class="block w-75 mx-auto p-3">
          <label class="mt-3">日期</label>
          <div class="container-fluid row block__room">
            <input
              class="col-5"
              id="check_in"
              type="date"
              placeholder="入住"
              :min="
                new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                  .toISOString()
                  .slice(0, 10)
              "
              v-model="startDate"
              required
            />
            <input
              class="col-2"
              id="arrow"
              type="text"
              placeholder="→"
              readonly
            />
            <input
              class="col-5"
              id="leave"
              type="date"
              :min="getNewMin"
              placeholder="退房"
              v-model="endDate"
              required
            />
          </div>

          <div class="mt-4 container-fluid" v-if="getPrice">
            <div class="row">
              <p class="col-12 col-sm-5">平日（一～四）</p>
              <p class="col-12 col-sm-5">
                ${{ roomData.normalDayPrice }} x {{ getPrice.normalDays }}晚
              </p>
              <p class="col-12 col-sm-2">
                ${{ roomData.normalDayPrice * getPrice.normalDays }}
              </p>
            </div>
            <div class="row">
              <p class="col-12 col-sm-5">假日（五～日）</p>
              <p class="col-12 col-sm-5">
                ${{ roomData.holidayPrice }} x {{ getPrice.holidays }}晚
              </p>
              <p class="col-12 col-sm-2">
                ${{ roomData.holidayPrice * getPrice.holidays }}
              </p>
            </div>
            <hr />
            <h3 class="text-right">
              ${{
                roomData.normalDayPrice * getPrice.normalDays +
                  roomData.holidayPrice * getPrice.holidays
              }}
            </h3>
          </div>

          <label class="mt-3">姓名</label>
          <div class="container-fluid row block__container">
            <input class="form-control" type="text" v-model="name" required />
          </div>

          <label class="mt-3">電話</label>
          <div class="container-fluid row block__container">
            <input class="form-control" type="text" v-model="tel" required />
          </div>
          <button
            class="btn btn-lg btn-block mt-4 block__btn"
            @click="checkSubmit"
          >
            確定預定日期
          </button>
        </form>

        <aside
          :class="
            `alert alert-danger w-75 mx-auto my-3 alert__message ${
              state.state == 'error' ? 'alert__message--show' : 'd-none'
            } `
          "
        >
          {{ state.message }}
        </aside>
      </div>
      <div class="col-sm-6 col-12">
        <h3>預約房間：</h3>
        <h3 class="mb-4">{{ roomData.name }}</h3>
        <p>{{ roomData.description }}</p>
        <h5>房間限制人數：{{ roomData.descriptionShort.GuestMax }} 人</h5>
        <h5>房間大小：{{ roomData.descriptionShort.Footage }} 平方公尺</h5>
        <h5>
          {{ roomData.descriptionShort.Bed.length }} 張床，{{
            roomData.descriptionShort['Private-Bath']
          }}
          間獨立衛浴
        </h5>
        <div class="my-4 p-4 flag">
          <span class="flag__text">{{ services }}</span>
        </div>
        <div class="mt-5 container-fluid addition">
          <div class="row">
            <div class="col-6">
              <h6>checkIn 時間</h6>
              <h5 class="c-font">
                {{
                  roomData.checkInAndOut.checkInEarly +
                    '~' +
                    roomData.checkInAndOut.checkInLate
                }}
              </h5>
            </div>
            <div class="col-6">
              <h6>最晚 checkout 時間</h6>
              <h5 class="c-font">{{ roomData.checkInAndOut.checkOut }}</h5>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <h6>平日（一～四）</h6>
              <h5 class="c-font">${{ roomData.normalDayPrice }}</h5>
            </div>
            <div class="col-6">
              <h6>假日（五～日）</h6>
              <h5 class="c-font">${{ roomData.holidayPrice }}</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Book',
  data() {
    return {
      index: 0,
      id: '',
      startDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      endDate: '',
      name: '',
      tel: '',
      state: { state: 'none', message: '' }, // 'error'、'success'
    }
  },
  computed: {
    roomData() {
      return this.$store.state.detail[this.index]
    },
    services() {
      return this.collectInfo(this.roomData.amenities)
    },
    getNewMin() {
      let newDate = new Date(this.startDate)
      newDate.setDate(newDate.getDate() + 1)
      return newDate.toISOString().slice(0, 10)
    },
    getPrice() {
      if (!this.startDate || !this.endDate) return false
      const end = new Date(this.endDate)
      let current = new Date(this.startDate)
      let normalDays = 0,
        holidays = 0
      while (current < end) {
        console.log(current.getDay())
        if (current.getDay() == 0 || current.getDay() >= 5) {
          holidays++
        } else {
          normalDays++
        }
        current.setDate(current.getDate() + 1)
      }

      return {
        holidays,
        normalDays,
      }
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
      return data.join(', ')
    },
    getData() {
      fetch(
        'https://challenge.thef2e.com/api/thef2e2019/stage6/room/' + this.id,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization:
              'Bearer ' +
              '59c4DCnp6qxwxV2z8epgFbvNJ3VOYeIy4mPDrQMEK2DFcaqYCzW7B1I6J7iJ',
          },
        }
      )
        .then((val) => val.json())
        .then((val) => {
          this.$store.commit({
            type: 'setDetail',
            detail: val.room[0],
            index: this.index,
          })
        })
    },
    checkSubmit(e) {
      if (!e.target.parentElement.checkValidity()) return
      e.preventDefault()
      this.sendData()
    },
    sendData() {
      let payload = {}
      let days = []
      let end = new Date(this.endDate)
      let current = new Date(this.startDate)
      while (current < end) {
        days.push(current.toISOString().slice(0, 10))
        current.setDate(current.getDate() + 1)
      }
      payload.name = this.name
      payload.tel = this.tel
      payload.date = days

      fetch(
        'https://challenge.thef2e.com/api/thef2e2019/stage6/room/' + this.id,
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' +
              '59c4DCnp6qxwxV2z8epgFbvNJ3VOYeIy4mPDrQMEK2DFcaqYCzW7B1I6J7iJ',
          }),
        }
      )
        .then((val) => val.json())
        .then((val) => {
          if (val.success) {
            this.$store.commit({
              type: 'handleBooked',
              data: {
                state: true,
                name: this.name,
                tel: this.tel,
                normalDays: this.getPrice.normalDays,
                holidays: this.getPrice.holidays,
              },
            })
            console.log(this.$store.state.booked)
            this.$router.push(`/done/${this.index}/${this.id}`).catch(() => {})
          }
          this.state.state = 'error'
          this.state.message = val.message
          setTimeout(() => {
            this.state.state = 'none'
            this.state.message = ''
          }, 7000)
        })
        .catch((err) => console.log(err))
    },
  },
  mounted() {
    this.index = this.$route.params.index
    this.id = this.$route.params.id
    if (!this.$store.state.info) {
      this.getData()
    }
  },
}
</script>
