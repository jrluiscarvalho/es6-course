var ConnectionFactory = (function (){


    var stores = ['negociacoes', 'clientes'];
    var version = 4;
    var dbName = 'aluraframe';

    var connection = null;

    return class ConnectionFactory{
        
        constructor(){

            throw new Error('Não é possivel criar instâncias de ConnectionFactory');
        }

        static getConnection(){
            return new Promise((resolve, reject) => {
                
                let openRequest = window.indexedDB.open('aluraframe', 4);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = e => {
                    if(!connection) {
                        connection = e.target.result;
                        connection.close = function(){
                            throw new Error('Voce nao pode fechar diretamente uma conexao');
                        }
                    }
                    resolve(connection);
                };

                openRequest.onerror = e => {
                    console.log(e.targe.error);
                    reject(e.target.error.name);
                };

            });
        }

        static _createStores(connection){
            stores.forEach(store =>{
                if(connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, {autoIncrement: true});

            });
        }
    }
})();
