


            //BUDDEGET CONTROLLER_____________________________________________________________
var budgetController = (function(){

     /** function constructor */
var Expense = function( id , description , value){
     this.id = id;
     this.description = description;
     this.value = value;
     this.percentage = -1;
};
     Expense.prototype.calcPercentage = function(totalIncome){
          
          if(totalIncome > 0){
             this.percentage =  Math.round((this.value / totalIncome) * 100);  
          }
          else {
               this.percentage = -1;
          }
     };
Expense.prototype.getPercentage = function(){
     return this.percentage;
};

 /** function constructor */
var Income = function( id , description , value){
     this.id = id;
     this.description = description;
     this.value = value;

};
/*
/**allExpances array 
var allExpanses = []
var allIincome = []
var totalExpenses = 0;

/**all arrays placed into object it's better!!!! 
var data ={
      allExpanses : [],
     allIincome : [],
      totalExpenses =0
       
}
*/

var calculateTotal = function(type){
     var sum = 0;                                                         
     data.allItems[type].forEach(function(cur){
          sum = sum + cur.value;
     });
     //put to the totals
     data.totals[type] = sum;
};
/**Loop example
 *  sum =0;
 * [200 , 400, 100]
 * sum = 0 +200;
 * sum =200 +400;
 * sum =600.....
 * 
 */

var data ={
     allItems:{
          exp: [],
          inc: [],
          
     },
     totals :{
          exp: 0,
          inc: 0 
         },

         budget : 0,
         percentage : -1
};//data
return{
     addItem: function(type, des , val){
          var newItem;
          var ID = 0;
          //[1 2  3  4  5 ], next ID 6

          //Create new ID
          if(data.allItems[type.lenght > 0]){
            ID = data.allItems[type][data.allItems[type].lenght - 1].id +1;   
          }
          else{
               ID= 0;
          }
         
          //Create new item based on 'exp' or 'inc' type
          if(type ==='exp'){
            newItem =  new Expense(ID ,des , val);
          }    else if(type === 'inc'){
               newItem =  new Income(ID ,des , val);
          }
          
          //Push into data structure
          data.allItems[type].push(newItem);

          //return the new element
          return newItem;
     },
     deleteItem: function(type , id){
var index, ids ;


          // id = 6
          //data.allItems[type][id]
          //[1 2 3 6 8 ]
          //index 4
        ids = data.allItems[type].map(function(current){
               return current.id;
          });
          
          index = ids.indexOf(id);

          if( index !== -1){
               data.allItems[type].splice(index, 1);
          }


     },


calculateBudget: function(){

// 1. calculate total income and expanses

calculateTotal('exp');
calculateTotal('inc');

// 2. calculate the budget: income- expances
data.budget = data.totals.inc - data.totals.exp;

// 3. calculate percantage 
if(data.totals.inc > 0){data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100) ;
     }else{
          data.percentage = -1;
     }


},
//calculating percentages 
calculatePercentages :function () {
  data.allItems.exp.forEach(function(cur){
cur.calcPercentage(data.totals.inc);

  });
     


},
getPercentage: function(){
     var allPerc = data.allItems.exp.map(function(cur){ //map returns something ,  and sotres it into varriable 
          return cur.getPercentage();
     });
     return allPerc;
},


getBudget: function(){
     return{
          budget: data.budget,
          totalInc : data.totals.inc,
          totalExp : data.totals.exp,
          percentage: data.percentage
     };
},

     testing: function(){
          console.log(data);
     }
};

})(); //invoke function//****************************************************************** */




//--UI CONTROLLER______________________________________________________________
                var UIcontroller = (function(){

//changing the names
                    var DOMstrings = {
                         inputType: '.add__type',
                         inputDescription : '.add__description',
                         inputValue : '.add__value',
                         inputButton : '.add__btn',
                         incomeContainer : '.income__list',
                         expensesContainer : '.expenses__list',
                         budgetLabel : '.budget__value',
                         incomeLabel : '.budget__income--value',
                         expancesLabel : '.budget__expenses--value',
                         percentageLabel: '.budget__expenses--percentage' ,
                         container : '.container',
                         expencesPercLabel : '.item__percentage',
                         dataLabel :'.budget__title--month'

                    }
                    //private functions
               var   formatNumber = function(num ,type){
                         var numSplit , int , dec , type;
     /*What I'm going to do here
         1. + or - before number
          2. exacly two decimal after point
          3.comma separating thousands               
     abs = absolute remove - in front
          */
     
         num= Math.abs(num);
         num = num.toFixed(2);
     
         /*splting number to decimal part and integer part*/
         numSplit = num.split('.');
     
         // method substring ' substr ' alows only to take part of the string
         int =  numSplit[0];
     if (int.length > 3){
      int = int.substr(0 ,int.length - 3) + ',' + int.substr(int.length - 3 ,3); // 1 argument index where we want to start ,2 angument how many character we want
     }
     
     
     
         dec = numSplit[1];
     
     
     return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
     
                    };
                    
                    var nodeListForEach = function(list , callback){
                         for (var  i = 0; i < list.length; i++){  //loop method  ----note spells  LENGTH  not lenght----
                              callback(list[i], i);  //arguments match with --current-- and --index--
                         }
                    };

               return {
                    getinput :function(){

                         return{
                              type : document.querySelector(DOMstrings.inputType).value, //will be income or expenses
                               description : document.querySelector(DOMstrings.inputDescription).value, // the thing you bought or sell
                               value :parseFloat( document.querySelector(DOMstrings.inputValue).value) //how much Dosh $$$$$
                                        //note: parseFloat chganges string to number 
                              }
                      
                    },
                    addListItem : function(obj , type){
                         var html ,newhtml;
                         //Create HTML string with placeholder text
                         if(type === 'inc'){
                              element = DOMstrings.incomeContainer;
                             html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix">        <div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"> <i class="ion-ios-close-outline"></i>              </button>         </div> </div></div>';
   
                         }else if(type === 'exp'){
                              element= DOMstrings.expensesContainer;
                          html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    
                         }

  
  
  
  
  //Repalace the place holder text with some actual data
newhtml= html.replace('%id%' ,obj.id);
newhtml = newhtml.replace('%description%' , obj.description);
newhtml = newhtml.replace('%value%' , formatNumber (obj.value, type));  // ??

                         //Insert the HTML into DOM
                         document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
                    },

deleteListItem: function(selsctorID){
     var el = document.getElementById(selsctorID);
el.parentNode.removeChild(el);
},





//clear fields after press button////////
                    clearFielnds: function(){
                         var fields , fieldsArr;
                        fields =  document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
                       fieldsArr =  Array.prototype.slice.call(fields);
                       fieldsArr.forEach(function(current , index ,  array){
                            current.value = "";
                       });
                       fieldsArr[0].focus();
                    },
displayBudget: function(obj){
obj.budget > 0 ? type = 'inc' : type ='exp';

document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber (obj.budget , type);
document.querySelector(DOMstrings.incomeLabel).textContent =  formatNumber ( obj.totalInc, 'inc');
document.querySelector(DOMstrings.expancesLabel).textContent = formatNumber ( obj.totalExp , 'exp');

if(obj.percentage > 0 ){
     document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
}else{
     document.querySelector(DOMstrings.percentageLabel).textContent = '---';
}
},


displayPercentages : function(percentages ){

     var fields = document.querySelectorAll(DOMstrings.expencesPercLabel); //  <---this is called Node-list 
     
    
     
     
     //call back function
     nodeListForEach(fields , function(current, index){
     
     if( percentages[index] > 0){
        current.textContent = percentages[index] + '%';  
     }else{
          current.textContent = '---'; 
     }
     
     
     
     });
     
     },
   
//show date

displayMonth : function(){
var now , year , month, months;
     now = new Date();

months =[ 'January' , 'February', 'March', 'April', 'May' ,'July','June' ,'August', 'September', 'November', 'December'];

     year = now.getFullYear(); //method shows year    
     month = now.getMonth(); // method shows month
     document.querySelector(DOMstrings.dataLabel).textContent = ' ' + months[month]+' ' + year ;


},

//change to red squares using CSS
changedType:function(){
var fields =document.querySelectorAll(
    DOMstrings.inputType  + ',' +
     DOMstrings.inputDescription + ','+
     DOMstrings.inputValue)

nodeListForEach(fields ,  function(cur){
cur.classList.toggle('red-focus');
});

document.querySelector(DOMstrings.inputButton).classList.toggle('red');
},


                    getDOMstrings : function(){
                         return DOMstrings;       }

                    
               };
                })();
                    //************************************************************************* */



 //GLOBAL APP CONTROLLER_____________________________________________________________________________________________




      var controller  = (function(budgetCtrl , UICtrl){
 var DOM = UICtrl.getDOMstrings ();


          var setupEventListeners = function (){
               document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
               document.addEventListener('keypress' , function(event){
                  //Enter code is always 13
              if(event.keyCode === 13 || event.which ===13)  {
                         ctrlAddItem();
                 }      
               
               });
               document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

               // change to red square event listener
               document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);

          };


          var  updateBudget = function(){
               //1.Calculate budget
               budgetController.calculateBudget();
               //2. return the budget
                    var budget = budgetCtrl.getBudget();
               //3. Display the budget on the UI
               UICtrl.displayBudget(budget);
          }
         
          var ctrlAddItem = function(){
               var input , newItem;




  //1. get input data
var input = UICtrl.getinput();

//this line checks inputs emptynes 
if(input.description!== "" &&  !isNaN(input.value) && input.value > 0){

     
        // 2 add item to budget conttoler

        var newItem = budgetController.addItem(input.type , input.description, input.value);
        //3 add item to the UI
        UICtrl.addListItem(newItem, input.type);
        // 4. clear fields
        UICtrl.clearFielnds();
        //5 calculate budget  and update
               updateBudget();

        //6 display the budget on the UI
          updatePercentage();

     }



          };

          var updatePercentage = function(){


          //1.calculate percantages
            budgetCtrl.calculatePercentages();
          //2. read percanteges from the budget
          var percentages = budgetCtrl.getPercentage();
          //3. update percantages 
               UICtrl.displayPercentages(percentages);

}
          


//Item delete
          var ctrlDeleteItem = function(event){
               var itemId, splitID, type, ID;
               var itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
               


              if(itemId){
               splitID = itemId.split('-');
               type = splitID[0];
               ID = parseInt(splitID[1]);

               //1 . delete item from data structure
               budgetCtrl.deleteItem(type , ID);

               //2. delete the item from UI
               UICtrl.deleteListItem(itemId);

               //3. Update and show new budget
               updateBudget();

               //4. 
               updatePercentage();
              }
          };
        
return {
init: function(){
     UICtrl.displayMonth();
     UICtrl.displayBudget(
          {budget: 0,
               totalInc : 0,
               totalExp : 0,
               percentage: -1


          }
          );
setupEventListeners();
}

};

     })(budgetController , UIcontroller);

     //************************************************************************************ */
controller.init();