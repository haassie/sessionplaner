"use strict";define(["jquery","TYPO3/CMS/Sessionplaner/DragDrop","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/Severity"],function(a,s,t,n){var o={settings:{pageId:0,uiBlock:null,stash:null,gridButtonGroup:null,gridNewSessionButton:null,sessionData:{},ajaxActive:!1,dragActive:!1},setPageId:function(e){o.settings.pageId=e},getTemplateElement:function(e){return a(a("#"+e).html().replace(/^\s+|\s+$/g,""))},prepareData:function(e){var s={};return a.each(e,function(e,t){"attendees"!==t.name&&"type"!==t.name&&"level"!==t.name&&"day"!==t.name&&"room"!==t.name&&"slot"!==t.name||(t.value=parseInt(t.value)||0),s[t.name]=t.value}),s},applySessionValuesToForm:function(n,e){return a.each(e,function(e,t){var s=a("#session-form-"+e+":first",n);0<s.length&&s.val(t)}),n},applySessionValuesToCard:function(s,e){return a.each(e,function(e,t){s.find('.property[data-name="'+e+'"]').data("value",t).text(t)}),s},addValuesFromParent:function(e,t){return"stash"===t.attr("id")?(e.slot=0,e.room=0):(e.slot=t.data("slot"),e.room=t.data("room")),e},createSessionCard:function(e){var t=o.getTemplateElement("sessionCardTemplate");return o.applySessionValuesToCard(t,e)},updateSessionCard:function(e){var t=a('.uid[data-value="'+e.uid+'"]',".t3js-page-ce").parents(".t3js-page-ce");o.applySessionValuesToCard(t,e)},getDataFromCard:function(e){var t={};return e.find(".t3-page-ce-body-inner .property").each(function(){var e=a(this);t[e.data("name")]=e.data("value")}),t},createSessionSuccess:function(e){o.settings.sessionData.uid=e.data.uid;var t=o.createSessionCard(o.settings.sessionData);o.settings.sessionData.room&&o.settings.sessionData.slot?a('[data-room="'+o.settings.sessionData.room+'"][data-slot="'+o.settings.sessionData.slot+'"]').prepend(t):o.settings.stash.prepend(t),s.initializeDraggable(t)},updateSessionSuccess:function(){o.updateSessionCard(o.settings.sessionData)},movedSessionSuccess:function(){},deleteSessionSuccess:function(){a('[data-name="uid"]').each(function(){var e=a(this);parseInt(e.data("value"))===o.settings.sessionData.uid&&e.parents(".t3-page-ce").remove()})},beforeSend:function(){var e=!0;return o.settings.ajaxActive?e=!1:(o.settings.ajaxActive=!0,o.settings.uiBlock.removeClass("hidden")),e},afterSend:function(){o.settings.uiBlock.addClass("hidden"),o.settings.ajaxActive=!1},sendAjaxRequest:function(e,t,s){a.ajax(TYPO3.settings.ajaxUrls[e],{method:"post",beforeSend:function(){o.beforeSend()},complete:function(){o.afterSend()},data:{id:o.settings.pageId,tx_sessionplaner:{session:t}}}).done(s)},createSession:function(e){var t=o.prepareData(a("form",e.target).serializeArray());o.settings.sessionData=t,o.sendAjaxRequest("evoweb_sessionplaner_create",o.settings.sessionData,function(e){"error"!==e.status?o.createSessionSuccess(e):o.createNewSessionForm(t)})},updateSession:function(e){var t=o.prepareData(a("form",e.target).serializeArray());t.uid=o.settings.sessionData.uid,o.settings.sessionData=t,o.sendAjaxRequest("evoweb_sessionplaner_update",o.settings.sessionData,function(e){"error"!==e.status?o.updateSessionSuccess(e):o.editSession(t)})},deleteSession:function(e){o.settings.sessionData={uid:a(e).parents(".t3-page-ce").find(".uid").data("value")},o.sendAjaxRequest("evoweb_sessionplaner_delete",o.settings.sessionData,function(e){o.deleteSessionSuccess(e)})},movedSession:function(e,t){var s=o.getDataFromCard(e);o.settings.sessionData=o.addValuesFromParent(s,t),o.sendAjaxRequest("evoweb_sessionplaner_update",o.settings.sessionData,function(e){o.movedSessionSuccess(e)})},createNewSessionForm:function(e){o.settings.sessionData=e||{},t.confirm("Create session",o.applySessionValuesToForm(o.getTemplateElement("sessionFormTemplate"),o.settings.sessionData),n.ok,[{text:"Create session",active:!0,btnClass:"btn-default",name:"ok"},{text:"Cancel",active:!0,btnClass:"btn-default",name:"cancel"}]).on("button.clicked",function(){t.dismiss()}).on("confirm.button.ok",function(e){o.createSession(e)})},createNewSessionFormInGrid:function(){t.confirm("Create session",o.applySessionValuesToForm(o.getTemplateElement("sessionFormTemplate"),o.settings.sessionData),n.ok,[{text:"Create session",active:!0,btnClass:"btn-default",name:"ok"},{text:"Cancel",active:!0,btnClass:"btn-default",name:"cancel"}]).on("button.clicked",function(){t.dismiss()}).on("confirm.button.ok",function(e){o.createSession(e)})},editSession:function(e){o.settings.sessionData=e,t.confirm("Edit session",o.applySessionValuesToForm(o.getTemplateElement("sessionFormTemplate"),o.settings.sessionData),n.ok,[{text:"Update session",active:!0,btnClass:"btn-default",name:"ok"},{text:"Cancel",active:!0,btnClass:"btn-default",name:"cancel"}]).on("button.clicked",function(){t.dismiss()}).on("confirm.button.ok",function(e){o.updateSession(e)})},mouseOver:function(e){var t=a(e);o.settings.sessionData={room:t.data("room"),slot:t.data("slot")},o.settings.dragActive||0!==t.children().length||o.settings.gridNewSessionButton.appendTo(t)},mouseOut:function(e,t){var s=t.toElement||t.relatedTarget;null!==s&&s!==e&&s.parentNode!==e&&s.parentNode.parentNode!==e&&s.parentNode.parentNode.parentNode!==e&&s.parentNode.parentNode.parentNode.parentNode!==e&&o.settings.gridNewSessionButton.appendTo(o.settings.gridButtonGroup)},initializeDragAndDrop:function(){var t=s.onDragStart,n=s.onDrop;s.onDragStart=function(e){o.settings.dragActive=!0,t(e)},s.onDrop=function(e,t,s){o.movedSession(e,t),n(e,t,s),o.settings.dragActive=!1}},initialize:function(){o.settings.uiBlock=a("#t3js-ui-block"),o.settings.stash=a("#stash"),o.settings.gridButtonGroup=a("#gridButtonGroup"),o.settings.gridNewSessionButton=o.settings.gridButtonGroup.find("#actions-document-new-in-grid"),o.initializeEvents()},initializeEvents:function(){a(document).on("click","#actions-document-new",function(){o.createNewSessionForm()}).on("click","#actions-document-new-in-grid",function(){o.createNewSessionFormInGrid()}).on("click",".icon-actions-edit-delete",function(){o.deleteSession(this)}).on("dblclick",".t3js-page-ce",function(){var e=o.getDataFromCard(a(this));console.log("data"),console.log(e),o.editSession(e)}).on("mouseover",".t3js-grid-cell",function(){o.mouseOver(this)}).on("mouseout",".t3js-grid-cell",function(e){o.mouseOut(this,e)}),o.initializeDragAndDrop()}};return o.initialize(),o});