$(function(){
  var mail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
      url = /^https?:\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+?\/?$/,
   getCookie = function(name){
    var cookieValue = null;
    if(document.cookie && document.cookie != ''){
      var cookies = document.cookie.split('; ');
      for(var i = 0; i < cookies.length; i++){
        var cookie = jQuery.trim(cookies[i]);
        var index = cookie.indexOf("=");
        if(cookie.substring(0, name.length + 1) == (name + '=')){
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          if(cookieValue.charAt(0) == '"')
            cookieValue = cookieValue.substring(1, cookieValue.length - 1);
          break;
        }
      }
    }

    return cookieValue;
  };

  $("#comment_form").submit(function(){
    var mark = true;
    if(!getCookie("comment_author")){
      var regmap = {
        '1' : mail,
        '2' : url
      };
      
      $("#respond :text").each(function(index, item){
        var value = $.trim(item.value);
        if(!value || value == ""){
          $(this).focus();
          mark = false;
          return false;
        }

        if(regmap[index + ""] && !regmap[index + ""].test(value)){
          $(this).focus();
          mark = false;
          return false;
        }
      });
    }
    
    var content = $.trim($("#comment").val());
    mark = content && content != "";
    return mark;
  });
});