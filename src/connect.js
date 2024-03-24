// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');

(async () => {
    try {
        // eslint-disable-next-line prettier/prettier
        await mongoose.connect('mongodb+srv://puranik:Mantra123$@cluster0.duet2eg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('connected');
    } catch (error) {
        console.log(error.message);
    }
})();