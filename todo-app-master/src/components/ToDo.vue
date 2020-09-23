<template>
  <main>
    <div id="title">
      <div @click="selectTitle(1)">All</div>
      <div @click="selectTitle(2)">Active</div>
      <div @click="selectTitle(3)">Completed<span class="upper-text"> {{ completedToDo.length }}</span></div>
      <span id="slider"></span>
    </div>
    <section id="content">
      <div id="add-item">
        <input :class="{ 'error-shake' : hasError }" @keypress.enter="addToDo(itemAddToDo.title)" type="text" v-model="itemAddToDo.title" :placeholder="itemAddToDo.title ? itemAddToDo.title : 'Add To-Do'">
        <button @click="addToDo(itemAddToDo.title)">Add</button>
      </div>
      <transition :name='sliding' mode="out-in">
        <div class="to-do-items" v-if="selected === 1" key="selected1">
          <transition-group name="list-complete" tag="div">
            <div v-if="listOfToDo.length">
              <div class="to-do-item" v-for="item in listOfToDo" :key="item.id">
                <input :id="item.title" type="checkbox" v-model="item.completed">
                <label :class="{ 'cut-text' : item.completed }" :for="item.title">{{ item.title }}</label>
              </div>
            </div>
            <h4 v-else>Yay! Gratz in completing all task! 🎉 </h4>
          </transition-group>
        </div>
        <div class="to-do-items" v-else-if="selected === 2" key="selected2">
          <transition-group name="list-complete" tag="div">
            <div v-if="activeToDo.length">
              <div class="to-do-item" v-for="item in activeToDo" :key="item.id">
                <input :id="item.title" type="checkbox" v-model="item.completed">
                <label :class="{ 'cut-text' : item.completed }" :for="item.title">{{ item.title }}</label>
              </div>
            </div>
            <h4 v-else>No more Active Task! 😎 </h4>
          </transition-group>
        </div>
        <div class="to-do-items" v-else-if="selected === 3" key="selected3">
          <transition-group name="list-complete" tag="div">
            <div v-if="completedToDo.length">
              <div class="to-do-item" v-for="item in completedToDo" :key="item.id">
                <input :id="item.title" type="checkbox" v-model="item.completed">
                <label :class="{ 'cut-text' : item.completed }" :for="item.title">{{ item.title }}</label>
                <svg @click="removeToDo(item.id)" width='22' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>
            <h4 v-else>Task Completed NaN?! 😱 </h4>
          </transition-group>
          <button @click="removeAllToDo" id="delete-button">Delete All</button>
        </div>
      </transition>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch } from 'vue';

interface ToDoItem {
  id: number;
  title: string;
  completed: boolean;
}

export default defineComponent({
  setup(){
    // setting ref , reactive
    const selected = ref<number>(1)
    const sliding = ref<string>('slide-fade-right')
    const hasError = ref<boolean>(false)
    const sliderPosition = ref<string>('calc((100%/3 - 20%)/2)')
    const itemAddToDo = reactive<ToDoItem>({
      id: 0,
      title: '',
      completed: false
    })
    const listOfToDo = reactive<Array<ToDoItem>>([])

    // compute Filter for array
    const activeToDo = computed( () => listOfToDo.filter( item => !item.completed ) )
    const completedToDo = computed( () => listOfToDo.filter( item => item.completed ) )
    
    // watching for List to change and update LocalStorage
    watch(listOfToDo, (newValue: Array<ToDoItem>) =>{
      localStorage.setItem('to-do-items', JSON.stringify(newValue))
    })

    watch(activeToDo, ()=> console.log(activeToDo.value))
    // methods to mutate ref, reactive
    const selectTitle = function (position: number): void {
      selected.value = position
      sliderPosition.value = `calc((100%/3 - 20%)/2 + ${position - 1}*(100%/3))`
      const slider: HTMLSpanElement = document.getElementById('slider') as HTMLSpanElement
      slider.style.left = sliderPosition.value
    }

    watch(selected, (newValue: number, oldValue: number) => {

      if (newValue > oldValue) {
        sliding.value = 'slide-right'
      } else {
        sliding.value = 'slide-left'
      }

      console.log(sliding.value);
      
    })

    const addToDo = function (title: string): void {
      if (title == '') {
        hasError.value = true
        setTimeout(() => {
          hasError.value = false
        }, 100);
        return
      } else {
        hasError.value = false
      }
      const item: ToDoItem = {
        id: Date.now() + Math.floor(Math.random()*1000), // simply generate a random ID
        title,
        completed : false
      }
      itemAddToDo.title = ''
      listOfToDo.push(item)
    }

    const removeToDo = function (id: number): void {
      const index = listOfToDo.findIndex( item => item.id == id)
      listOfToDo.splice(index, 1)
    }

    const removeAllToDo = function (): void {
      completedToDo.value.forEach( item => {
        removeToDo(item.id)
      })
    }

    // obtain value saved in LocalStorage (if any) , else create a new item
    if (typeof localStorage.getItem('to-do-items') === "string"){
      const parseString: string = localStorage.getItem('to-do-items') as string
      const dataFromLocalStorage: Array<ToDoItem> = JSON.parse(parseString)
      dataFromLocalStorage.forEach( item => listOfToDo.push(item))

    } else {
      addToDo('Welcome!')
      addToDo('Try out "Toggle Dark-Mode"')
      addToDo('Try clicking "Add" button without input')
      addToDo('Enjoy slider animation when navigating between Tabs')
    }

    return {
      selected,
      sliding,
      hasError,
      itemAddToDo,
      listOfToDo,
      activeToDo,
      completedToDo,
      selectTitle,
      addToDo,
      removeToDo,
      removeAllToDo
    }
  }
});
</script>

<style>
main {
  min-width: 300px;
  width: 50vw;
  max-width: 650px;
  place-self: baseline;
  display: flex;
  flex-direction: column;
  height:  calc(100% - 4rem);
  background: var(--backg-alt);
  border-radius: 30px;
  padding: 2rem;
}
#add-item{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}
#add-item input {
  padding: 1rem 2rem;
  border: 1px solid lightgray;
  border-radius: 15px;
  width: 70%;
  font-family: Montserrat;
  font-weight: normal;
}
#add-item button {
  width: 15%;
  padding: 1rem 2rem;
  border-radius: 15px;
  cursor: pointer;
  color: white;
  background-color: blue;
  font-family: Montserrat;
  font-weight: 600;
}
#title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  border-bottom: 1px solid lightgray;
  font-family: Montserrat;
  font-weight: 600;
  position: relative;
}
#title > div {
  width: calc(100% / 3);
  padding: 1.5rem 0rem;
  cursor: pointer;
  position: relative;
}
.upper-text {
  position: absolute;
  top: calc(100% /10);
  right: calc(100% /6);
  border-radius: 50%;
  color: white;
  background-color: blue;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 1.42;
}
#slider {
  position: absolute;
  width: 20%;
  height: 6px;
  bottom: 0;
  left: calc((100%/3 - 20%)/2);
  background-color: blue;
  border-radius: 10px 10px 0 0;
  transition: left 0.5s cubic-bezier(0.13, 0.87, 0.41, 0.99);
}
.selected {
  border-bottom: 3px solid blue;
}
.to-do-items {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}
.to-do-items h4 {
  margin-top: 3rem;
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 42px;
  text-align: center;
  letter-spacing: -0.045em;
  transition: all 0.3s ease-out;
}
.to-do-item {
  margin: 0.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 1rem;
  border-radius: 15px;
  transition: all 0.5s;
}
.to-do-item:hover {
  background-color:var(--highlight);
}
.to-do-item input {
  opacity: 0;
}
.to-do-item label::before {
  content: '';
  width: 24px;
  height: 24px;
  display: inline-block;
  border: 1px solid var(--border);
  position: absolute;
  left: calc(-2rem - 12px);
  top: -2px;
  border-radius: 5px;
  background: white;
}
.to-do-item label::after {
  content: '';
  display: inline-block;
  height: 6px;
  width: 12px;
  border-left: 2px solid blue;
  border-bottom: 2px solid blue;
  transform: rotate(-52deg);
  position: absolute;
  left: calc(-2rem - 6px);
  top: 5px;
}
.to-do-item label {
  margin-left: 2rem;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  position: relative;
  width: 100%;
  overflow-wrap: anywhere;
}
.to-do-item svg {
  align-self: end;
  margin: 0 0 0 2rem;
  padding: 0.5rem;
  cursor: pointer;
  background-color:rgb(101, 137, 255);
  border-radius: 7px;
  color: white;
}
.to-do-item input[type="checkbox"] + label::after {
  content: none;
}
.to-do-item input[type="checkbox"]:checked + label::after {
  content: '';
  border-left: 2px solid white;
  border-bottom: 2px solid white;
}
.to-do-item input[type="checkbox"]:checked + label::before {
  background-color: blue;
}
.to-do-item input[type="checkbox"]:focus + label::before {
  outline: rgb(59, 153, 252) auto 5px;
}
.cut-text {
  text-decoration: line-through;
}
#delete-button {
  margin-top: 2rem;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 12px;
  padding: 1rem 1.5rem;
  color: white;
  background-color: rgb(101, 137, 255);
  width: fit-content;
  border-radius: 15px;
  align-self: flex-end;
  cursor: pointer;
}
 /* shake animation when no input was given */
.error-shake {
  animation: shake 0.1s ease-in-out 4 alternate;
}
 /* fade in/out animation for adding/removing list */
.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.list-complete-leave-active {
  position: absolute;
  width: calc(100% - 2rem);
  padding: 1rem;
}

 /* slide tab left/right */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-out;
}

 /* slide-right */
.slide-right-enter-from {
  transform: translateX(50px);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
 /* slide-left */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-out;
}

.slide-left-enter-from {
  transform: translateX(-50px);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(50px);
  opacity: 0;
}


@keyframes shake {
  0% {
    transform: translateX(-3px);
  }
  100% {
    transform: translateX(3px);
  }
}

@media screen and (max-width: 768px) {
#add-item input {
  width: 50%;
}
#add-item button {
  width: 30%;
}
}


</style>