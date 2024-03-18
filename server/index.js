import express from "express";
import path from "path";
import homepageRouter from "./homepageRouter.js";
import assetsRouter from "./assetsRouter.js";
import { Client } from '@elastic/elasticsearch';

const port = process.env.PORT || 3000;
const publicPath = path.join(path.resolve(), "public");
const app = express();

// ElasticSearch 
const client = new Client({ node: 'http://localhost:9200' }); 

// Ahora puedes usar el cliente de Elasticsearch en tu aplicación Vue.js
// Por ejemplo:


// client.search({
//   index: 'goodbot',
//   body: {
//     query: {
//       match_all: {}
//     }
//   }
// }).then(response => {
//   console.log(response.hits.hits);
// }).catch(error => {
//   console.error(error);
// });



app.get("/all", async (req, res) => {
    try {
        const { q } = req.query;
        const query = JSON.parse(q); 

        await client.search({
          index: 'goodbot',  
          body: {
            query: {
              query_string: {
                query: query.query, 
                fields: ["book_title", "author", "year_publish", "publisher"]
              }
            }
          }
        })
        .then(response => {
            console.log(response.hits.hits);
            res.status(200).json({datillos: response.hits.hits})
        }).catch(error => {
            console.error(error);
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/anyo", async (req, res) => {
    try {
        const { q } = req.query;
        const query = JSON.parse(q); 

        // console.log(query.query1, " :::::::::::::::: ", query.query2);

        await client.search({
          index: 'goodbot',  
          body: {
            query: {
                range: {
                    year_publish: {
                        gte: query.query1,
                        lte: query.query2
                    }
              }
            }
          }
        })
        .then(response => {
            console.log(response.hits.hits);
            res.status(200).json({datillos: response.hits.hits})
        }).catch(error => {
            console.error(error);
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/editorial", async (req, res) => {
    try {
        const { q } = req.query;
        const query = JSON.parse(q); 

        await client.search({
          index: 'goodbot',  
          body: {
            query:{match_phrase:{publisher:query.query}}
          }
        })
        .then(response => {
            console.log(response.hits.hits);
            res.status(200).json({datillos: response.hits.hits})
        }).catch(error => {
            console.error(error);
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/autor", async (req, res) => {
    try {
        const { q } = req.query;
        const query = JSON.parse(q); 
        console.log(query.query);
        await client.search({
          index: 'goodbot',  
          body: {
            query: {wildcard:{author:query.query}}
          }
        })
        .then(response => {
            console.log(response.hits.hits);
            res.status(200).json({datillos: response.hits.hits})
        }).catch(error => {
            console.error(error);
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/titulo", async (req, res) => {
    try {
        const { q } = req.query;
        const query = JSON.parse(q); 
        
        await client.search({
          index: 'goodbot',  
          body: {
            query:{match_phrase:{book_title:query.query}}
          }
        })
        .then(response => {
            // console.log(response.hits.hits);
            res.status(200).json({datillos: response.hits.hits})
        }).catch(error => {
            console.error(error);
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get("/api/v1/hello", (_req, res) => {
    res.json({ message: "Hello, world!" });
});

app.use("/", express.static(publicPath));
app.use("/src", assetsRouter);
app.use(homepageRouter);

app.listen(port, () => {
    console.log("Server listening on port", port);
});