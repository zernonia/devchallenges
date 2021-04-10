<template>
  <div class="container">
    <div class="heading">
      <header>Country Quiz</header>
      <img
        :style="[view != 'result' ? 'opacity : 1' : 'opacity : 0']"
        src="./assets/adventure.svg"
        alt=""
      />
    </div>
    <div class="content ">
      <viewStart v-if="view == 'start'" @start="view = 'question'"></viewStart>
      <viewQuestion
        v-else-if="view == 'question'"
        :allQuestions="allQuestions"
        @finish="showResult"
      ></viewQuestion>
      <viewResult
        @restart="restart"
        :result="result"
        v-else-if="view == 'result'"
      ></viewResult>
    </div>
  </div>
  <footer>
    Zernonia @ <a href="https://www.zernonia.com">zernonia.com</a>
  </footer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import viewStart from "./components/start.vue";
import viewQuestion from "./components/question.vue";
import viewResult from "./components/result.vue";
import { Question, CountryData } from "./util/interface";

export default defineComponent({
  name: "App",
  components: {
    viewStart,
    viewQuestion,
    viewResult
  },
  setup() {
    const view = ref<string>("start");
    const countQuestion = ref<number>(5);
    const allQuestions = ref<Question[]>([]);
    const result = ref<number>(0);

    const randomIndex = () => {
      const random = Math.floor(Math.random() * 250);
      return random;
    };

    const getData = async () => {
      const selectedIndex: number[] = [];
      allQuestions.value = [];
      const { data } = await axios.get(
        "https://restcountries.eu/rest/v2/all?fields=name;capital;flag"
      );

      let i = 0;
      while (i < countQuestion.value) {
        let j = 0;
        const eachQuestion: Question = {
          list: [],
          answer: Math.floor(Math.random() * 4)
        };
        while (j < 4) {
          const index = randomIndex();
          const countryData: CountryData = data[index];
          if (
            selectedIndex.includes(index) ||
            countryData.name == "" ||
            countryData.capital == "" ||
            countryData.flag == ""
          )
            continue;

          selectedIndex.push(index);
          eachQuestion.list.push(countryData);
          j++;
        }
        allQuestions.value.push(eachQuestion);
        i++;
      }
    };

    const showResult = (e: number) => {
      view.value = "result";
      result.value = e;
      console.log(e);
    };

    const restart = () => {
      view.value = "start";
      getData();
    };
    onMounted(getData);
    return {
      view,
      randomIndex,
      countQuestion,
      allQuestions,
      getData,
      showResult,
      result,
      restart
    };
  }
});
</script>

<style>
@import "style.css";
</style>
