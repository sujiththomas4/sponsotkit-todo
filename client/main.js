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
    Session.set("activeTabTitle", this.title);
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
      var itemsTemp = {};
      var tempNotes = [];
      var newCount = 0;
      var closedCount = 0;
      if(Session.get("activeTabTitle") != "All tasks"){
          itemsTemp = {category : Session.get("activeTabTitle")}
      }
      tempNotes = Notes.find(itemsTemp).fetch();
      Session.set("noteStatusObj_total", tempNotes.length);
      for(var i= 0; i < tempNotes.length;i++){
        if(tempNotes[i].status == "new"){
            newCount++
        }
        else if(tempNotes[i].status == "closed"){
            closedCount++;
        }
      }
      Session.set("noteStatusObj_new",newCount);
      Session.set("noteStatusObj_closed",closedCount);
      return tempNotes
  },
  addTodoModalToggle : function(){
      return Session.get("addTodoModal")
  },
  checkStatus : function(){
      if(this.status == "closed"){
        return "checked"
      }
      else{
          return false
      }
  },
  getIconForcat : function(){
      const iconObj = Session.get("TodoCategories").filter(item=>{
          return item.title == this.category
      });
      const iconObjClass  = iconObj.length > 0 ? iconObj[0].iconClass : ''
       return iconObjClass;
  },
  getIconForCatColor : function(){
    const iconObj = Session.get("TodoCategories").filter(item=>{
        return item.title == this.category
    });
    const iconObjColor  = iconObj.length > 0 ? iconObj[0].iconColor : ''
     return iconObjColor;      
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
        Session.set("currentTodoID",null)
    },
    'click .notesActionBtnDeleted':function(){
        Notes.remove({_id : this._id})
    },
    'click .notesActionBtnEdit':function(){
        Session.set("currentTodoID",this._id)
        Session.set("newTodoObj",Notes.find({_id : this._id}).fetch());
        Session.set("addTodoModal",true);
    },
    'click .todoTblCheck':function(){

        if(this.status == "new"){
            Notes.update(this._id,{
                ...this,
                "status" : "closed"
            });
        }
        else{
            Notes.update(this._id,{
                ...this,
                "status" : "new"
            });           
        }
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
        if(!Session.get("currentTodoID")){
            tempObj["status"] = "new"
            Notes.insert(tempObj);
        }
        else{
            Notes.update(Session.get("currentTodoID"),tempObj);
        }
        
        
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
Template.ToDoStatus.helpers({
    totalNotes: function(){
        return Session.get("noteStatusObj_total");
    },
    newNotes : function(){
        return Session.get("noteStatusObj_new");
    },
    closedNotes : function(){
        return Session.get("noteStatusObj_closed");
    }    


});
