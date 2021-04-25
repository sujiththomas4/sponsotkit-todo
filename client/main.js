import { Template } from "meteor/templating";
import { Notes, sampletext } from "../lib/collections.js";
import '../lib/sessions.js'
import "./main.html";



Template.sidenav.onCreated(function sidenavOnCreated() {
//   alert(Session.get("TodoCategories"))
});

// Template.body.helpers({
//   notes: function () {
//     return Notes.find({});
//   },
//   sample: function () {
//     return sampletext.find({});
//   },
// });
Template.sidenav.helpers({
  tabs: function () {
    return Session.get("TodoCategories");
  },
  isactive: function (index) {
    return index == Session.get("activeTabIndex") ? "active" : "";
  },
});
Template.sidenav.events({
  "click .nav-item": function (event, instance) {
    event.preventDefault();
    Session.set("activeTabIndex", this.index);
  },
});
// Template.body.events({
//   "click #sub": function () {
//     event.preventDefault();
//     alert("clicked");
//     Notes.insert({
//       text: "added new",
//       cretedAt: new Date(),
//     });
//     sampletext.insert({ asw: "sample coll updated" });
//   },
// });
Template.mainpanel.helpers({
  getActiveTodoCategory: function () {
    return Session.get("TodoCategories").filter(item=>{
        return item.index == Session.get("activeTabIndex")
    })
  },
  Notes : function(){
      return Notes.find({})
  },
  addTodoModalToggle : function(){
      return Session.get("addTodoModal")
  }
});

Template.mainpanel.events({
    'click #addTodoIconCon' :  function(){
        Session.set("newTodoObj",[{
            title : "",
            description : "",
            created : new Date(),
            dueDate : null,
            category : ""
        }]);
        Session.set("addTodoModal",true);
    },
    'click .notesActionBtnDeleted':function(){
        Notes.remove({_id : this._id})
    },
    'click .notesActionBtnEdit':function(){
        Session.set("newTodoObj",Notes.find({_id : this._id}).fetch());
        Session.set("addTodoModal",true);
    }
})

Template.addTodoModal.events({
    'click .close':function(){
        Session.set("addTodoModal",false);
    },
    'submit .addNewTodoCls' : function(event){
        event.preventDefault();
        var tempObj = Session.get("newTodoObj")[0];
        tempObj["title"] = event.target.addTodoTitle.value;
        tempObj["description"] = event.target.addTodoDesc.value;
        tempObj["dueDate"] = event.target.addTodoDueDate.value ? new Date(event.target.addTodoDueDate.value) : null;
        tempObj["category"] = event.target.addTodoCategory.value;
        Notes.insert(tempObj);
        Session.set("addTodoModal",false);
    },
    'click .addnewTodocat_a':function(event,instance){
        var newObj = [...Session.get("newTodoObj")];
        newObj[0]["category"] = this.title;
        Session.set("newTodoObj",newObj)
        // $("input[name='addTodoCategory']").val(this.title)
    }
})

Template.addTodoModal.helpers({
    buildCategoryDropdown : function(){
        return Session.get("TodoCategories").filter(item=>{
            return item.enableForNew
        })
    },
    newTodoObj : function(){
        return Session.get("newTodoObj")
    }
})

