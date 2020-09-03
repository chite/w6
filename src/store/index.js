import { createStore } from 'vuex'

export default createStore({
  state: {
    info: null,
    booked: {
      state: false,
      name: '',
      tel: '',
      normalDays: 0,
      holidays: 0,
    },
    detail: Array(6).fill({
      amenities: {
        'Air-Conditioner': false,
        Breakfast: false,
        'Child-Friendly': false,
        'Great-View': false,
        'Mini-Bar': false,
        'Pet-Friendly': false,
        Refrigerator: false,
        'Room-Service': false,
        'Smoke-Free': false,
        Sofa: false,
        Television: false,
        'Wi-Fi': false,
      },
      description: '',
      descriptionShort: {
        Bed: [''],
        Footage: '',
        GuestMax: '',
        GuestMin: '',
        'Private-Bath': '',
      },
      name: '',
      normalDayPrice: '',
      holidayPrice: '',
      imageUrl: ['', '', ''],
      checkInAndOut: {
        checkInEarly: "",
        checkInLate: "",
        checkOut: ""
      }
    })
  },
  mutations: {
    setInfo(state, payload) {
      state.info = payload.info
    },
    setDetail(state, payload) {
      state.detail[payload.index] = payload.detail
    },
    handleBooked(state, payload) {
      state.booked = payload.data
    }
  }
})
