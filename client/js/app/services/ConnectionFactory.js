let ConnectionFactory = (function (){


    const stores = ['negociacoes', 'clientes'];
    const version = 4;
    const dbName = 'aluraframe';

    let connection = null;

    let close = null;

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
                        close = connection.close.bind(connection);
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

        static closeConnection(){
            if(connection){
                close();
                connection = null;
            }
        }

    }
})();
