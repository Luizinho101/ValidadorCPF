

//PASSOS
// 1 - Recebe o cpf digitado do campo de input
// 2 - Trata a string, eliminando tudo que não é número
// 3 - Valida se tem 11 dígitos mesmo
// 4 - Converte para um vetor de inteiros
// 5 - Verifica o primeiro dígito verificador
// 6 - Virifica se o dígito verificador é válido
// 7 - Valida o segundo díigito verificador


function main(){

    const campoCPF = document.getElementById('inputCPF');
    let minhaCaixa = document.getElementById('resultado');
    
    const valorDigitado = campoCPF.value;
   
    if (valorDigitado === "") {
        alert("Por favor, digite um CPF!");
        return;
    }

    let stringL = limpaCPF(valorDigitado);

    if(stringL.length !== 11){
        minhaCaixa.innerHTML = "CPF deve ter 11 dígitos!";
        minhaCaixa.classList.add('resultado');
        return;
    }

    let arrayChar =converteChar(stringL);
    let convertParaInteiro = convertInteiro(arrayChar);

    if (ehSequenciaRepetida(convertParaInteiro)) {
        minhaCaixa.innerHTML = "CPF Inválido (Sequência repetida)!";
        minhaCaixa.classList.add('resposta');
        return;
    }

    let checaPrimeiroDigito = validaPrimeiroNumero(convertParaInteiro, 10);
    let checaSegundoDigito = validaSegundoNumero(convertParaInteiro, 11);
    let respostaCompleta = respostaTratada(checaPrimeiroDigito, checaSegundoDigito, convertParaInteiro);

    minhaCaixa.innerHTML = respostaCompleta;
    minhaCaixa.classList.add('resposta');
}

function limpaCPF(cpfSujo){
    const stringLimpa = cpfSujo.replace(/[\.\-\+\@\$\%\*_\'\`\=\°\?\^\~\¨\{\}\[\]\&\(\)\']/g, '');
    return stringLimpa;
}

function converteChar(cpfString){
    let arrayChar = cpfString.split('');
    return arrayChar;
}

function convertInteiro(charArray){
    let intArray = charArray.map(char => parseInt(char, 10));
    return intArray;
}

function validaPrimeiroNumero(array, valor1){
    let soma = 0;
    let contador = 0; 
    let restoDIvisao =0;
            
    for (let i = valor1; i >= 2; i--) {
        soma += array[contador] * i;
        contador++; 
    }
    restoDIvisao = (soma * 10) % 11;

    if(restoDIvisao == 10){
        restoDIvisao = 0;
    } 
       
    return restoDIvisao;
}

function validaSegundoNumero(array, valor2){
    let soma = 0;
    let contador = 0; 
    let restoDIvisao =0;
            
    for (let i = valor2; i >= 2; i--) {
              
        soma += array[contador] * i;
        contador++; 
    }

    restoDIvisao = (soma * 10) % 11;

    if(restoDIvisao == 10){
        restoDIvisao = 0;
    }      
    return restoDIvisao;
}

function respostaTratada(digito1 , digito2,array){
    let resposta;
    if(array[9] == digito1 && array[10] == digito2){
        resposta = "CPF Válido !!!";
    }else{
        resposta = "CPF Inválido !!!";
    }
    return resposta;
}

function ehSequenciaRepetida(array) {
    return array.every(elemento => elemento === array[0]);
}
