async function getCustomers() {
    console.log('Creating Customer');
    var test = await fetch(`http://localhost:3000/customers`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphdW9vb2JyeXd6c3B5cXJvcWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5OTI2NzUsImV4cCI6MjAxNzU2ODY3NX0.84gZzUjuWx3j7cDM4sHfGnsGxUD8VaRcYMvIUuKjwWo"
       },
    })
        .then((res) => res)
        .then(async (res) => {
            console.log(res);

            const element = document.getElementById('errorBox');
            if (element) {
                element.remove();
            }

            console.log('Status: ', res.status);
            if (res.status === 200 || res.status === 304) {
                return res.json();
            }
            throw Error(JSON.stringify(await res.json()));
        })
        .then((res) => {
            console.log(res);
            const element = document.getElementById("customerInfo");
            if(element) {
                element.remove();
            }

            var table = document.createElement('table');
            table.setAttribute('id', 'customerInfo');

            var tableRow = document.createElement('tr');

            var tableHeading1 = document.createElement('th');
            tableHeading1.innerHTML = 'First Name';
            tableRow.appendChild(tableHeading1);

            var tableHeading2 = document.createElement('th');
            tableHeading2.innerHTML = 'Last Name';
            tableRow.appendChild(tableHeading2);

            var tableHeading3 = document.createElement('th');
            tableHeading3.innerHTML = 'State';
            tableRow.appendChild(tableHeading3);

            table.appendChild(tableRow);
            document.body.appendChild(table);

            for (i = 0; i < res.length; i++) {
                var customerRow = document.createElement('tr');
                var customerFirstName = document.createElement('td');
                var customerLastName = document.createElement('td');
                var customerState = document.createElement('td');

                customerFirstName.innerHTML = res[i].cust_first_name;
                customerLastName.innerHTML = res[i].cust_last_name;
                customerState.innerHTML = res[i].cust_state;

                customerRow.appendChild(customerFirstName);
                customerRow.appendChild(customerLastName);
                customerRow.appendChild(customerState);

                table.appendChild(customerRow);
            }
        })
        .catch((error) => {
            console.log('Error:', JSON.parse(error.message));
            var errorDiv = document.createElement('div');
            errorDiv.setAttribute('class', 'errorBox');
            errorDiv.setAttribute('id', 'errorBox');

            var h1 = document.createElement('h1');
            h1.innerHTML = 'Error Occurred:';

            const p = document.createElement('p');
            p.innerHTML = `${JSON.parse(error.message).message}`;

            errorDiv.appendChild(h1);
            errorDiv.appendChild(p);
            document.body.appendChild(errorDiv);
        });
}

async function addCustomer() {
    console.log('Creating Customer')
    var test = await fetch(`http://localhost:3000/customer`, {
        method: 'POST',
        body: JSON.stringify({
            "firstName": `${document.getElementById('firstName').value}`,
            "lastName": `${document.getElementById('lastName').value}`,
            "state": `${document.getElementById('state').value}`,
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    getCustomers();
}

window.onload = getCustomers;
