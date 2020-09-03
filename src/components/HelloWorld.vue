<template>
  <h1></h1>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted() {
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
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>
