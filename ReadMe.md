# JS Style guide
## Table of contents



1. Statement
2. Variable
3. Comments
4. [Operators]
5. Conditional structure - if
6. CSS Style guide
7. Commas
8. Semicolon



## 1. Statement
*use one compound statement per line*\
*Always end a statement with a semicolon.*\
*Put the opening bracket at the end of the first line.*\
*Use one space before the opening bracket.*\
*Put the closing bracket on a new line, without leading spaces.*\



### 2. variable
*use camelCase for identifier names*\



### 3. Comments
*Use /** ... */ for multiline comments.*\
*Use // for single line comments.*\



### 4. Operators
*Keep a space before and after any operator.*



#####  bad example
var i=0;



#####  good example
var i = 0;



### 5. Condition structue - if
*Use space after the keyword if.*\
*Use space after the parenthesis*\
*Use open curly braces at the end of first line.*\
*use close curly braces in a new line.*\
*keep the else keyword on the same line as the close curly braces of the previous set of brackets*\
*indent the code as given in the good example*



#####  bad example
if(hour < 17) {  greeting = "Hello";  
}



#####  good example
if (hour < 17) {  
  greeting = "Hello";  
}




### 8. Commas


#####  bad example
var music = [

{  
,id : 101  
,title : 'Issa Album'  
,artist : '21 Savage'  
}  

]

#####  good example
var music = [  

{  
id : 101 ,  
title : 'Issa Album' ,  
artist : '21 Savage' ,  
}  

]

### 8. Semicolon
Semicolons should be used when there is a line break
or end of a statement to avoid breaking the code. If one is
not used, JS might misinterpret your code.

#####  bad example
if (rap === 'checked') {  
inputArray.push('rap')  
console.log(inputArray)  
}

#####  bad example
if (rap === 'checked') {  
inputArray.push('rap') ;  
console.log(inputArray) ;  
}
