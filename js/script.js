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
    var allCategoriestUrl="https://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHtml="snippet/categories-title-snippet.html";
    var categoryHtml = "snippet/categories-snippet.html";
    var menuItemUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
    var menuItemsTitleHtml = "snippet/menu-item-title.html";
    var menuItemHtml = "snippet/menu-item.html";
    var currentCatShortName ="";
    
    
    
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
       active("#homeFromTheList","#menuFromTheList");
       $ajaxutils.setGetRequest(allCategoriestUrl,buildAndShowCategoriesHtml,true);
   
      };     
        
        var buildAndShowCategoriesHtml= function (category){
            
            $ajaxutils.setGetRequest(categoriesTitleHtml,
                         function (finalCategoryTitle){
                $ajaxutils.setGetRequest(categoryHtml,
                              function (finalCategory)  {
                    var html= buildThePage(category,finalCategory,finalCategoryTitle);
                    insertHtml("#main-content",html);
                });});};
        
        
        
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
            currentCatShortName=categoryShort;
            active("#homeFromTheList","#menuFromTheList");
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
        
        function buildMenuItemsViewHtml(dataFromSite ,title ,body){
       
            
            
            var final = insertProperty(title , "name",dataFromSite.category.name);
            final = insertProperty(final, "special_instructions",dataFromSite.category.special_instructions);
            final +="<div id='row' class='row'>";
             
            
          
            
            
            
            for (var i =0 ;i < dataFromSite.menu_items.length;++i){
                 var html="";
                if(i%2===0){
                html+="<div style='clear:left;'>";
            }
           html+=body;
  html= insertProperty(html,"short_name",dataFromSite.menu_items[i].short_name);
  html = insertProperty(html,"catShortName",currentCatShortName);
  html=insertProperty(html,"name",dataFromSite.menu_items[i].name);
  html=insertProperty(html,"description",dataFromSite.menu_items[i].description);
  final+=html;
              
                if(i%2===0){
                html+="</div>";
            }

            }
            final+=" </div>";
             return final;
            
        }
        function active(selectorToBeUnactive,selectorToBeActive){
            var c =(document.querySelector(selectorToBeUnactive).className);
           document.querySelector(selectorToBeUnactive).className=insertProperty(c,"active","");
            document.querySelector(selectorToBeActive).className+=" active";
            
        }
        
        
        
    
    
    
    }                            
                     
                             
                             
                             
                             
                             );
    
    
    
    
    global.$dc=dc;  
    
}




)(window);



