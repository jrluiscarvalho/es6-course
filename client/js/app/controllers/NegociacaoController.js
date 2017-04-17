class NegociacaoController {
    
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }
            
    adiciona(event){
        event.preventDefault();

        let helper = new DateHelper();
        let helper2 = new DateHelper();
        
        let negociacao = new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );

        let diaMesAno = negociacao.data.getDate()
            + '/' + (negociacao.data.getMonth() + 1)
            + '/' + negociacao.data.getFullYear();

        console.log(this._inputData.value);
    }
}