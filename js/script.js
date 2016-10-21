//same as document.addEventListener("DOMContentLoaded,function);
$( function (){
    //same as document.querySelector("").addEventListener("")
    $("#navbarToggle").blur(
    function(event){
        var screenWidth = window.innerWidth;
        if(screenWidth<768){
            $("#collapsable-nav").collapse('hide');
        } } );}); //navbar toggle 
( function (global){
  
    var dc = {};
    var homeHtml = "snippet/home-snippet.html";
    var allCategoriestUrl="http://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHtml="snippet/categories-title-snippet.html";
    var categoryHtml = "snippet/categories-snippet.html";
    var menuItemUrl = "http://davids-restaurant.herokuapp.com/menu_items.json?category=";
    var menuItemsTitleHtml = "snippet/menu-item-title.html";
    var menuItemHtml = "snippet/menu-item.html";
    
    
    
    var insertHtml = function (selector , html){
        document.querySelector(selector).innerHTML=html;
        
    };
    
    var showLoading = function (selector){
       var html =  "<div class='text-center'>"
        html+="<img src='screenshots/ajax-loader.gif'></div>" ;
        insertHtml(selector,html);
    };
    
    var insertProperty = function (string,propName , propValue){
      var propertyToReplace = "{{" + propName + "}}"  ;
    string =string.replace(new RegExp(propertyToReplace,"g"),propValue);
        return string;
    };
    
    
    
    document.addEventListener("DOMContentLoaded",
     function (event) {
        showLoading("#main-content");
       $ajaxutils.setGetRequest(homeHtml,
                     function(response){
            insertHtml("#main-content",response);
            
            
        })
      dc.loadMenuCategory = function(){
       showLoading("#main-content");
          $ajaxutils.setGetRequest(allCategoriestUrl,buildAndShowCategoriesHtml,true);
   
      };     
        
        var buildAndShowCategoriesHtml= function (category){
            
            $ajaxutils.setGetRequest(categoriesTitleHtml,
                         function (finalCategoryTitle){
                $ajaxutils.setGetRequest(categoryHtml,
                              function (finalCategory)  {
                    var html= buildThePage(category,finalCategory,finalCategoryTitle);
                    insertHtml("#main-content",html);
                    
                    
                }        
                             ); } );
    
            
        };
        
        
        
    function buildThePage (categoryObject , categoryHome,categoryTitle){
        
        var final = categoryTitle;
        final += "<div id='menu-row' class='row'>";
        for(var i=0 ;i<categoryObject.length;++i){
            var tempH=categoryHome;
            tempH=insertProperty(tempH,"name",(categoryObject[i].name+""));
    tempH=insertProperty(tempH,"short_name",categoryObject[i].short_name);
            
            final+=tempH;
            
            
        }
        final+="</div>";
        return final;
        
    }
        
        dc.loadMenuItems = function (categoryShort){
            showLoading("#main-content");
            $ajaxutils.setGetRequest(menuItemUrl +categoryShort, buildAndShowMenuItemsHtml,true);
        };
        
        function buildAndShowMenuItemsHtml(categoryMenuItems){
            $ajaxutils.setGetRequest(menuItemsTitleHtml,
                      function (menuItemTitle)  {
                $ajaxutils.setGetRequest(menuItemHtml,
                      function(menuItemHtml){
                    var MenuItemViewHtml = buildMenuItemsViewHtml(categoryMenuItems, menuItemTitle,menuItemHtml);
                    insertHtml("#main-content",MenuItemViewHtml);
                    
                    
                });
            }            
                                    
                                    
                                    
                                    
                                    );
        }
        
        
    
    
    
    }                            
                     
                             
                             
                             
                             
                             );
    
    
    
    
    global.$dc=dc;  
    
}




)(window);



