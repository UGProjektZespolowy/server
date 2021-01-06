import mongo from 'mongodb';
const uri = "mongodb+srv://ugClient:mhwrYjGCSlthX58o@htmldatabase.pjivs.mongodb.net/scrapper_result?retryWrites=true&w=majority";
const client = new mongo.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const collections = ["scrapperInf_result", "scrapperUG_result", "scrapperMFI_result"];

export const extract = function (collection, criteria) {
    return new Promise((resolve, reject) => {
        console.log("Connecting to databse");
        client.connect((err) => {
            client.db("scrapper_result").collection(collection).find(criteria).toArray((err, docs) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            })
        })
    });
}

export const extract_all = function (criteria) {
    return new Promise((resolve, reject) => {
        client.connect((err) => {
            const results = collections.map(collection => client.db("scrapper_result").collection(collection).find(criteria).toArray());
            Promise.all(results).then(results => {
                resolve(Object.assign({}, ...collections.map((collection, idx) => ({[collection]: results[idx]}))));
            });
        })
    });
}


export default extract;
