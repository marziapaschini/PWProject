const app = Vue.createApp({
  data() {
    return {
      name: "",
      surname: "",
      username: "",
      password: "",
      bio: "",
      message: "",
      completedForm: true,
    };
  },
  methods: {
    signUp() {
      this.message = `Welcome, ${this.name}! You have signed up with username: ${this.username}.`;
    },
  },
});
app.mount("#app");
export default { app };
