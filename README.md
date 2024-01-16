# An interpreter for a simple pseudolanguage

## Keywords and operators

- `VAR`: declares a variable
- `CONST`: declares a constant
- `PRINT`: prints a value
- `IF`: if statement
- `THEN`: if statement body
- `ELSE`: else statement body
- `ELSE IF`: else if statement body
- `ENDIF`: end of if statement
- `AND`: and operator
- `OR`: or operator
- `NOT`: not operator
- `INPUT`: input operator
- `PRINT`: print operator
- `DO`: do statement
- `WHILE`: while statement
- `ENDWHILE`: end of while statement
- `FOR`: for statement
- `ENDFOR`: end of for statement
- `TO`: to operator
- `STEP`: step operator
- `BREAK`: break operator
- `CONTINUE`: continue operator
- `RETURN`: return operator
- `FUNCTION`: function declaration
- `ENDFUNCTION`: end of function declaration
- `CALL`: call operator
- `TRUE`: true value
- `FALSE`: false value
- `NULL`: null value
- `+`: addition operator
- `-`: subtraction operator
- `*`: multiplication operator
- `/`: division operator
- `%`: modulo operator
- `==`: equal operator
- `!=`: not equal operator
- `>`: greater than operator
- `<`: less than operator


## Example program

```c

// DECLARATIONS
VAR X = 10
VAR Y = 20
CONST PI = 3.14
VAR Z = X + Y - (PI * 2)

// INPUT prompts the user for input
VAR IN = INPUT "Enter a number: "

// PRINT prints a value
PRINT Z

// IF statements
IF Z > 10 THEN
    PRINT "Z is greater than 10"
ELSE IF Z == 10 THEN
    PRINT "Z is equal to 10"
ELSE
    PRINT "Z is less than 10"
ENDIF

IF Z == 30 AND X == 10 THEN
    PRINT "Z is 30 and X is 10"
ELSE
    PRINT "Z is not 30 and X is not 10"
ENDIF

// FOR loops
VAR I = 0
FOR I = 0 TO 10 STEP 1
    PRINT I
ENDFOR

// WHILE loops
VAR I = 0
WHILE I < 10
    PRINT I
    I = I + 1
ENDWHILE

// FUNCTIONS
FUNCTION F(X)
    RETURN X * 2
ENDFUNCTION

VAR X = CALL F(10)
```
