const express = require("express")
var bodyParser = require('body-parser')
const supabaseClient = require('@supabase/supabase-js')
const app = express()
const port = 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://zauooobrywzspyqroqiw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphdW9vb2JyeXd6c3B5cXJvcWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5OTI2NzUsImV4cCI6MjAxNzU2ODY3NX0.84gZzUjuWx3j7cDM4sHfGnsGxUD8VaRcYMvIUuKjwWo'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('public/INST377-Week10-PPT.html', {root: __dirname})
})


app.get('/customers', async (req, res) => {
    console.log('Getting Customer')

    const { data, error } = await supabase
        .from('Customer')
        .select();

    if(error) {
        console.log(error)
    }else if(data){
        res.send(data)
    }

    res.statusCode = 400;
    res.header('Content-type', 'application/json');
    var errorJson = {
        "message": 'Blah2'
    }
    res.send(JSON.stringify(errorJson))
    return;
})

app.post('/customer', async (req, res) => {
    console.log('Adding Customer');

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var state = req.body.state;

    const { data, error } = await supabase
        .from('Customer')
        .insert([
            { 'cust_first_name': firstName, 'cust_last_name': lastName, 'cust_state': state }
        ])
        .select();

    console.log(data);
    res.header('Content-type', 'application/json');
    res.send(data);
});

app.listen(port, () => {
    console.log('APP IS ALIVEEEE')
})