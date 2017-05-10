class NegociacaoService{
    obterNegociacoesDaSemana(callback){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/semana');
            
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        callback(null, JSON.parse(xhr.responseText)
                        .map( obj => new Negociacao(new Date(obj._inputData), obj._inputQuantidade, obj._inputValor)));
                    }else{
                        console.log('erro');
                        callback('Não foi possivel obter as negociacoes', null);
                    }
                }
            };
            xhr.send();
        }
}