import { create, Client } from "@open-wa/wa-automate";

const start = (client = new Client()) => {
    console.log('CLIENT STARTED');

    client.onStateChanged((state) => {
        console.log('CLIENT STATE', state);
        if(state==="CONFLICT" || state==="UNLAUNCHED") client.forceRefocus();
        if(state==='UNPAIRED') console.log('LOGGED OUT!!!!')
    })

    client.onMessage((message) => {
        client.getAmountOfLoadedMessages()
            .then((msg) => {
                if(msg >= 3000) {
                    console.log('lol');
                    
                }
            })
    })
}
