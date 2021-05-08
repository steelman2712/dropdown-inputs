var inputs = document.querySelectorAll('input[type=text]')

//var selectList = document.createElement("select");
//var numberOfDropdowns = 1;

var AllChars = [];
for (var i=32; i<127; i++)
    AllChars.push(String.fromCharCode(i));


var baseSelectList = document.createElement("select");
for (i = 0; i < AllChars.length; i++) {
    var option = document.createElement("option");
    console.log(AllChars[i])
    option.value = AllChars[i];
    option.text = AllChars[i];
    baseSelectList.appendChild(option);
}
console.log(baseSelectList)

function createDropdownHolder(input, input_number) {
    var dropdownHolder = document.createElement("span")
    dropdownHolder.setAttribute("input-dropdown-number-span",input_number)
    input.setAttribute("input-dropdown-number",input_number)
    input.style.display = "none";
    
    var parent = input.parentElement
    parent.appendChild(dropdownHolder)
    createDropdown(dropdownHolder)
    console.log("End of created holder")
}


function createDropdown(dropdownHolder){
    let selectList = baseSelectList.cloneNode(true)
    console.log(selectList)
    var numberOfDropdowns = parseInt(dropdownHolder.childElementCount)
    var holderNumber = dropdownHolder.getAttribute("input-dropdown-number-span")
    console.log(numberOfDropdowns)
    selectList.classList.add("input-dropdown-replacer")
    selectList.classList.add(`input-dropdown-replacer-${holderNumber}`)
    selectList.id += `text-dropdown-${holderNumber}-${numberOfDropdowns+1}`
    selectList.setAttribute("dropdown-number",numberOfDropdowns+1)
    selectList.addEventListener('change',createAdditionalDropdown,false);
    selectList.addEventListener('change',updateInput,false);
    console.log(dropdownHolder)
    console.log(selectList)
    dropdownHolder.appendChild(selectList)
    
}

function createAdditionalDropdown() {
    var dropdownNumber = this.getAttribute("dropdown-number")
    var dropdownHolder = this.parentElement
    numberOfDropdowns = dropdownHolder.childElementCount
    console.log(numberOfDropdowns)
    if (dropdownNumber == numberOfDropdowns) {
        createDropdown(dropdownHolder)
    }
    
}

function updateInput() {
    var dropdownHolder = this.parentElement
    var holderNumber = dropdownHolder.getAttribute("input-dropdown-number-span")
    var dropdowns = document.getElementsByClassName(`input-dropdown-replacer-${holderNumber}`);
    var input_value = ""
    for (i = 0; i < dropdowns.length-1; i++) {
        value = dropdowns[i].value;
        input_value += value
    }
    var input_number = this.parentElement.getAttribute("input-dropdown-number-span")
    var selector = `[input-dropdown-number="${input_number}"]`
    var input = document.querySelectorAll(selector)[0]
    input.value = input_value;
    
}

function replaceInputs() {
    for (i = 0; i < inputs.length; i++) {
        console.log(i)
        createDropdownHolder(inputs[i],i)
    }
}

replaceInputs()




