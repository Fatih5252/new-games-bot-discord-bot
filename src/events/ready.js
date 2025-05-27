const mongoose = require('mongoose')
const mongoURL = process.env.mongoURL

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Ready!');

        if (!mongoURL) return;

        await mongoose.set('strictQuery', false);

        await mongoose.connect(mongoURL || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        if (mongoose.connect) {
            console.log('I have successfully connected to the mongoDB database!')
        } else {
            console.log('I couldnt connect to the mongoDB database!')
        }

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        }
                        
                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};