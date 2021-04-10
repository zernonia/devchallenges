import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Auth from "../views/Auth.vue";
import axios from "axios";
import Cookie from "js-cookie";
import { state } from '../utils/stateUser'

const routes: Array<any> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: '/channel',
    redirect: '/channel/public'
  },
  {
    path: "/channel/:id",
    name: "Channel",
    component: () => import("../views/ChannelMain.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log(to);
  
  const jwt = Cookie.get("jwt");
  if (to.name == "Login") {
    if (jwt) {
      try {
        const { data } = await axios.get("http://localhost:3000/users");
        state.populateUser(data.id, data.email, data.channel, data.photo)
        next({ path: "/channel/welcome" });
      } catch (err) {
        next();
      }
    } else {
      next();
    }
  } else if (to.name == "Channel" || to.name == "ChannelMain") {
    
    if (jwt) {
      try {
        const { data } = await axios.get("http://localhost:3000/users");
        state.populateUser(data._id, data.name, data.channel, data.photo)
        next();
      } catch (err) {
        next({ path: "/" });
      }
    } else {
      next({ path: "/" });
    }
  } else if (to.name == "Auth") {
    next();
  }
});

export default router;
