<h1 align="center"> trace-prisma </h1>
<a href="https://www.npmjs.com/package/trace-prisma" rel="nofollow"><img src="https://img.shields.io/badge/npm-trace--prisma-orange" alt="NPM Version" data-canonical-src="https://img.shields.io/badge/npm-trace--prisma-orange" style="max-width: 100%;"></a>
<h2 tabindex="-1" dir="auto"> 
    Why?
</h2>

&#x2022; The application is intended to log certain transactions in the mongodb database, each transaction has a name, status and a trace(optional), a trace has a name, status, body(json).</br>
</br>
&#x2022; Each time your code runs and has the "transaction.start" method, a new transaction will be created</br>
</br>
&#x2022; When using one of the methods that will update the transaction, only the most current transaction will be changed.</br>
</br>
&#x2022; The transaction has five methods: </br>
        <strong> - start:</strong> creates a transaction (with pending status)</br>
        <strong> - alert:</strong> sets the status to alert</br>
        <strong> - rejected:</strong> sets the status to rejected</br>
        <strong> - error:</strong> sets the status to error</br>
        <strong> - success:</strong> sets the status to success</br>
        <strong> - trace:</strong> create a trace</br>

<h2 tabindex="-1" dir="auto"> 
    Installation
</h2>

    npm i trace-prisma
    
    
 <h2 tabindex="-1" dir="auto"> 
    Getting Started
</h2>
    <p>To start using the project, let's configure the .env, in it an environment variable called "DATABASE_URL", which must be configured with your connection string from your mongodb.</p>
    <p>Exemple:</p>
    
    mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
   <p>Is necessary to call the function below, it will execute the command "npx prisma generate", in schema.prisma located inside the project</p>
    
    const { generateSchema } = require('trace-prisma/generate_schema')
    
    generateSchema()
    
   <p>Now let's create our transactions and traces, to create a transaction it is not mandatory to have a job_id</p>

    const { Transection } = require('trace-prisma')

    const transaction = new Transection('646faf02b716b92a81bfc181') //Job id

    async function test() {
        await transaction.start('Transaction_name')

        await transaction.trace('Transaction_name', {body: {name: 'Jhon', age: 20}}, 'success', 'traceName')
        
        if (true){
            await transaction.success('Transaction_name')
        }
    }

    test()
