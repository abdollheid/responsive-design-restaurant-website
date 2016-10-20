(function (global){
    var ajaxUtils={}; //set namespace for out utility
    
    
    
    //return an HTTP request object
    function getRequestObject(){
        if(window.XMLHttpRequest){
            return (new XMLHttpRequest());
        }
        else if(window.ActiveXObject){
         return (new ActiveXObject("Microsoft.XMLHTTP"));//for very old IE (optional)
            
        }
        else {
            gobal.alert("Ajax is not supported");
            return null;
        }
            
    }
    
    //make an Ajax GET request to "requestUrl"
    ajaxUtils.setGetRequest = 
        function (requestUrl, responseHandler , isJsonResponse){
        var request =getRequestObject();
        request.onreadystatechange = function (){
            handleResponse(request ,responseHandler,isJsonResponse);
        };
        request.open("GET" ,requestUrl ,true);
        request.send(null);
        
    };
    
    
    //calls user provided "responseHandler"
    //function if response is ready and not an error
    
    //  responseHandler(request);
    function handleResponse(request , responseHandler,isJsonResponse){
        if((request.readyState===4)&&(request.status===200)){
          if(isJsonResponse===undefined){
              isJsonResponse=false;
          }
            if(isJsonResponse){
                responseHandler(JSON.parse(request.responseText));
            }
            else{
                responseHandler(request.responseText);
            }
            
        }
        
    }
    
    global.$ajaxutils=ajaxUtils;
    
    
    
}


)(window);