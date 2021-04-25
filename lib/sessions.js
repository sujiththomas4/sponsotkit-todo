import { Session } from "meteor/session";

Session.setDefault("text","sample");
Session.setDefault("newTodoObj",[{
    title : "",
    description : "",
    created : new Date(),
    dueDate : null,
    category : ""
}]);
Session.setDefault("addTodoModal", false);
Session.setDefault("activeTabIndex", 0);
Session.setDefault("TodoCategories", [
  {
    title: "All tasks",
    iconClass: "dashboard",
    additionalClass: "",
    iconColor: "",
    index: 0,
    count : 0,
    enableForNew : false,
  },
  {
    title: "Work",
    iconClass: "next_week",
    additionalClass: "work_icon",
    iconColor: "#fdbb78",
    index: 1,
    count : 0,
    enableForNew : true,
  },
  {
    title: "Travel",
    iconClass: "flight",
    additionalClass: "travel_icon",
    iconColor: "#6ed18c ",
    index: 2,
    count : 0,
    enableForNew : true,
  },
  {
    title: "Study",
    iconClass: "assignment",
    additionalClass: "study_icon",
    iconColor: "#948dd4",
    index: 3,
    count : 0,
    enableForNew : true,
  },
  {
    title: "Home",
    iconClass: "home",
    additionalClass: "home_icon",
    iconColor: "#df7265",
    index: 4,
    count : 0,
    enableForNew : true,
  },
  {
    title: "Shopping",
    iconClass: "shopping_cart",
    additionalClass: "shopping_icon",
    iconColor: "#5fbdc7",
    index: 5,
    count : 0,
    enableForNew : true,
  },
  {
    title: "Music",
    iconClass: "headset_mic",
    additionalClass: "music_icon",
    iconColor: "#f9a291",
    index: 6,
    count : 0,
    enableForNew : true,
  },
  {
    title: "Due soon!",
    iconClass: "notifications",
    additionalClass: "dueSoon_icon",
    iconColor: "#ea2f52",
    index: 7,
    count : 0,
    enableForNew : false,
  },
]);