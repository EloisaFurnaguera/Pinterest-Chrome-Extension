
const popUp = document.createElement("div");
popUp.setAttribute("id", "popup");
document.body.appendChild(popUp);

chrome.runtime.sendMessage({cmd: "read_file"}, function(html){
    document.querySelector("#popup").innerHTML = html;
    afterHtmlLoad();
})

function afterHtmlLoad() {
    const UIMypinterest = $("#popup_mypinterest");
    const UIMypinterestInnerWrap = $("#popup_mypinterest_inner_wrap");
    const UIMypinterestOuterWrap = $("#popup_mypinterest_outer_wrap");
    const UIMypinterestCardDiv = $("#card-div")
   
    UIMypinterest.mouseover(function(){ 
        UIMypinterestInnerWrap.css("transform", "scale(1)"); 
    });
    UIMypinterestOuterWrap.mouseleave(function(){  
        // UIMypinterestInnerWrap.css("transform", "scale(0.1)");       
    });
    UIMypinterestOuterWrap.mouseup(function(e){   
        let offsetVal = UIMypinterestOuterWrap.offset();
        localStorage.setItem("offsetKey", JSON.stringify(offsetVal));
    });
    function initialize(){
        UIMypinterestOuterWrap.draggable({ containment: "window" }); 
        UIMypinterestCardDiv.draggable({ containment: "window" });  
    
        if (localStorage.getItem("offsetKey") !== null) {
            let  storedOffset=JSON.parse(localStorage.getItem("offsetKey"));
            UIMypinterestOuterWrap.css(storedOffset);          
        }else {
            UIMypinterestOuterWrap.css({top:0 , left:0});    
        }        
    }   
    initialize()
}
