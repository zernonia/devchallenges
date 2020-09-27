<template>
  <div class="question" v-for="(question, index) in allQuestions" :key="index">
    <div v-if="currentQuestion == index">
      <h3 class="question-title">
        {{ question.list[question.answer].capital }} is the capital of
      </h3>
      <ul>
        <div
          @click="selectAnswer(indexList)"
          :class="[
            selectedAnswer == indexList &&
            answered &&
            thisQuestionAnswer != indexList
              ? 'wrong-answer'
              : '',
            thisQuestionAnswer == indexList && answered ? 'correct-answer' : ''
          ]"
          class="question-answer"
          v-for="(choice, indexList) in question.list"
          :key="choice.name"
        >
          <li>
            <span>{{ choice.name }}</span>
          </li>
          <svg
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            :class="[
              selectedAnswer == indexList &&
              answered &&
              thisQuestionAnswer != indexList
                ? 'display-svg'
                : ''
            ]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            :class="[
              thisQuestionAnswer == indexList && answered ? 'display-svg' : ''
            ]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </ul>
    </div>
  </div>
  <button
    @click="$emit('finish', result)"
    class="next"
    :style="[answered ? 'opacity : 1' : 'opacity: 0']"
    v-if="currentQuestion == allQuestions.length - 1"
  >
    Finish
  </button>
  <button
    v-else
    @click="nextQuestion"
    class="next"
    :style="[answered ? 'opacity : 1' : 'opacity: 0']"
  >
    Next
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Question } from "../util/interface";

export default defineComponent({
  name: "question",
  props: {
    allQuestions: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const currentQuestion = ref<number>(0);
    const answered = ref<boolean>(false);
    const answerCorrect = ref<boolean>(false);
    const answerWrong = ref<boolean>(false);
    const thisQuestionAnswer = computed(() => {
      const thisQuestion: Question = props.allQuestions[
        currentQuestion.value
      ] as Question;
      return thisQuestion.answer;
    });
    const selectedAnswer = ref<number>(0);
    const result = ref<number>(0);

    const selectAnswer = function(selectedAnswerIndex: number) {
      if (answered.value) return "";
      selectedAnswer.value = selectedAnswerIndex;
      answered.value = true;
      if (selectedAnswerIndex == thisQuestionAnswer.value) result.value++;
    };

    const nextQuestion = () => {
      currentQuestion.value++;
      answered.value = false;
      answerCorrect.value = false;
      answerWrong.value = false;
    };
    return {
      answered,
      result,
      selectedAnswer,
      selectAnswer,
      thisQuestionAnswer,
      currentQuestion,
      nextQuestion
    };
  }
});
</script>

<style>
.question-title {
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  color: #2f527b;
}
.question-answer {
  font-weight: 500;
  font-size: 24px;
  line-height: 27px;
  color: rgba(96, 102, 208, 0.8);
  border: 2px solid rgba(96, 102, 208, 0.8);
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 15px;
  cursor: pointer;
  list-style: upper-alpha;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.question-answer:hover {
  color: white;
  background: #f9a826;
  border: 2px solid #f9a826;
}
.question-answer li {
  margin-left: 2rem;
}
.question-answer span {
  font-size: 18px;
}
.question-answer svg {
  display: none;
}
.display-svg {
  display: block !important;
}
.wrong-answer {
  color: white;
  background: #ea8282;
  border: 2px solid #ea8282;
}
.correct-answer {
  color: white;
  background: #60bf88;
  border: 2px solid #60bf88;
}
.next {
  color: white;
  background: #f9a826;
  outline: none;
  border: none;
  border-radius: 15px;
  padding: 1rem 2.5rem;
  width: fit-content;
  align-self: flex-end;
  font-weight: bold;
  font-size: 18px;
  line-height: 27px;
  cursor: pointer;
}
</style>
