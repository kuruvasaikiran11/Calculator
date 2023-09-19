let result = document.querySelector("#result");
let inputOperationElement = document.querySelector("#operation");

document.addEventListener("DOMContentLoaded", function(){
    // inputOperationElement.disabled = "false"
    inputOperationElement.placeholder = "";
    result.innerHTML = "";
    let btnElements = document.querySelectorAll(".btn");
    // let exp = ""
    btnElements.forEach((btn) => {
        btn.addEventListener("click", () => {
            
            if(btn.id === "equal"){
                calculateResult();
            }else if(btn.id === "clear"){
                inputOperationElement.value = ""; 
                result.innerHTML = "";
            }else if(btn.id === "delete"){
                let str = inputOperationElement.value;
                inputOperationElement.value = str.substr(0, str.length - 1); 
            }else{
                //exp += btn.innerHTML;
                // console.log(exp);
                inputOperationElement.value += `${btn.innerHTML} `;
            }
        });
    });
});