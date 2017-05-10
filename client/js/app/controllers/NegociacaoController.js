class NegociacaoController {
    
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
        
    }
            
    adiciona(event){
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criarNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._limpaFormulario();
    }

    importarNegociacoes(){
        let service = new NegociacaoService();

        let promise = service.obterNegociacoesDaSemana()
        promise
            .then( negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociacao da semana obtida com sucesso";
            })
            .catch(erro => this._mensagem.texto = erro);
        
        let promise = service.obterNegociacoesDaSemanaAnterior()
        promise
            .then( negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociacao da semana obtida com sucesso";
            })
            .catch(erro => this._mensagem.texto = erro);
        
        let promise = service.obterNegociacoesDaSemanaRetrasada()
        promise
            .then( negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociacao da semana obtida com sucesso";
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _criarNegociacao(){

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso!';
        this._mensagemView.update(this._mensagem);
    }
}