function cifrarMensaj(clave, mensaje) {
    

    // Obtener la cantidad de filas y columnas de la clave
    let numRows = clave;
    let numCols = clave;

    // Verificar si hay suficiente espacio en la matriz para el mensaje
    if (numRows * numCols < mensaje.length) {
        return 'La longitud del mensaje es mayor que la cantidad de espacios en la matriz.';
    }

    // Inicializar la matriz
    let matrix = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
        matrix[i] = new Array(numCols).fill('');
    }

    // Llenar la matriz con el mensaje
    let index = 0;
    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows; row++) {
            if (index < mensaje.length) {
                matrix[col][row] = mensaje[index];
                index++;
            }
        }
    }

    console.log(matrix);

    // Construir la cadena cifrada a partir de la matriz
    let mensajeCifrado = '';
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            mensajeCifrado += matrix[col][row];
        }
    }

    return mensajeCifrado;
}

function descifrarMensaj(key, message) {
    let numCols = Math.ceil(message.length / key);
    let numRows = key;
    let numShadedBoxes = (numCols * numRows) - message.length;
    let plainText = Array(numCols).fill('');
    let col = 0;
    let row = 0;

    for (let i = 0; i < message.length; i++) {
        plainText[col] += message[i];
        col++;

        if ((col === numCols) || (col === numCols - 1 && row >= numRows - numShadedBoxes)) {
            col = 0;
            row++;
        }
    }

    return plainText.join('');
}


// console.log(cifrarMensaj(6, 'Alan es un crack de la programacion'));
// console.log(descifrarMensaj(6, 'Asreral a ocauclginnkaro    anecdpm'));

export {

    cifrarMensaj,
    descifrarMensaj
}
