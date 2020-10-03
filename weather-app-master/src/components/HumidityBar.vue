<template>
  <div id="bar-chart">
    <div>
      <div>
        <p>0</p>
        <p>50</p>
        <p>100</p>
      </div>
      <div id="bar">
        <div id="progress"></div>
      </div>
      <p>%</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";

export default defineComponent({
  name: "HumidityBar",
  props: {
    data: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const width = computed(() => props.data);
    const setWidth = () => {
      const bar = document.getElementById("progress") as HTMLDivElement;
      bar.style.width = props.data + "%";
    };
    watch(width, setWidth);
  }
});
</script>

<style lang="scss" scoped>
#bar-chart {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  > div {
    width: 100%;
    width: 200px;
    display: flex;
    flex-direction: column;
  }

  > div > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p {
      font-weight: bold;
      font-size: 12px;
      line-height: 14px;
      text-align: center;
      color: #a09fb1;
    }
  }

  > div > p {
    margin-top: 5px;
    align-self: flex-end;
    font-size: 12px;
    color: #a09fb1;
  }
}

#bar {
  height: 6px;
  width: 100%;
  background: #e7e7eb;
  border-radius: 10px;
  margin-top: 5px;
  position: relative;
}

#progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  height: 6px;
  transition: width 1s ease-in;
  width: 0%;
  background: #ffec65;
}
</style>
