<template>
  <div class="all container-fluid">
    <header class="header--s text-center pt-5">
      <img alt="Vue logo" class="my-2" src="../assets/logo.svg" />
      <p class="my-2">不想上班</p>
      <h1 class="c-font header__title">Success!</h1>
    </header>
    <section class="row room__body">
      <div class="col-sm-6 col-12 mb-4">
        <form class="block block--empty w-75 mx-auto py-3">
            <h3 class="text-center">預約成功！</h3>
            <h6 class="my-4 col-12">姓名&nbsp;&nbsp;{{userData.name}}</h6>
            <h6 class="my-4 col-12">電話&nbsp;&nbsp;{{userData.tel}}</h6>
            <h6 class="my-4 col-12">日期</h6>
            <div class="mt-4 container-fluid">
            <div class="row">
              <p class="col-12 col-sm-5">平日（一～四）</p>
              <p class="col-12 col-sm-5">
                ${{ roomData.normalDayPrice }} x {{ userData.normalDays }}晚
              </p>
              <p class="col-12 col-sm-2">
                ${{ roomData.normalDayPrice * userData.normalDays }}
              </p>
            </div>
            <div class="row">
              <p class="col-12 col-sm-5">假日（五～日）</p>
              <p class="col-12 col-sm-5">
                ${{ roomData.holidayPrice }} x {{ userData.holidays }}晚
              </p>
              <p class="col-12 col-sm-2">
                ${{ roomData.holidayPrice * userData.holidays }}
              </p>
            </div>
            <hr />
            <h3 class="text-right">
              ${{
                roomData.normalDayPrice * userData.normalDays +
                  roomData.holidayPrice * userData.holidays
              }}
            </h3>
          </div>
        </form>
        <div class="block w-75 mx-auto mt-3 p-3">
            <h6 class="row col-12">提醒！</h6>
            <div class="row mb-2">
                <h6 class="col-6">checkIn 時間</h6>
                <h6 class="col-6">最晚 checkout 時間</h6>
            </div>
            <div class="row">
                <h5 class="col-6 c-font">{{
                  roomData.checkInAndOut.checkInEarly +
                    '~' +
                    roomData.checkInAndOut.checkInLate
                }}</h5>
                <h5 class="col-6 c-font">{{ roomData.checkInAndOut.checkOut }}</h5>
            </div>
        </div>
      </div>
      <div class="col-sm-6 col-12 mb-4">
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
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Done',
  data() {
    return {
      index: 0,
      id: '',
    }
  },
  computed: {
    roomData() {
      return this.$store.state.detail[this.index]
    },
    services() {
      return this.collectInfo(this.roomData.amenities)
    },
    userData(){
        return this.$store.state.booked
    }
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
  },
  mounted() {
    this.index = this.$route.params.index
    this.id = this.$route.params.id
    if (!this.$store.state.booked.state) {
      this.$router.push(`/`).catch(() => {})
    }
  },
}
</script>
