<template>
  <div>
    <h1>Real-Time Data</h1>
    <div
      v-for="item in data"
      :key="item.id"
      class="card mb-5"
      style="width: 18rem"
    >
      <div class="card-body">
        <h5 class="card-title">{{ item.title }}</h5>
        <p class="card-text">
          {{ item.description }}
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  created() {
    this.setupEventSource();
  },
  methods: {
    setupEventSource() {
      this.eventSource = new EventSource("http://localhost:3000/articles");

      this.eventSource.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        this.data = newData;
        console.log(newData);
      };

      this.eventSource.onerror = (error) => {
        console.error("EventSource failed:", error);
        this.eventSource.close();
      };
    },
  },
};
</script>
