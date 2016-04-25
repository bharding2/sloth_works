### SLOTH_WORKS
* simple sloth storage solutions

#### Functionality
* This is a simple server/database combination to store information about your sloths.
* Supports the usual REST commands GET, POST, PUT, and DELETE.
* All http requests are routed through `/sloths`.
* Single sloths can be accessed using `/sloths/unique_sloth_id`. (eg. `http://localhost:5555/sloths/571a79ffe1dbe769078d332e`.  This is a sloth named Pringles in my local database).

#### Getting Started
* You will need a mongo instance running to store your sloths
* launch the server using a `node index.js` (or a `node server.js` if that is what you like).
* Use http requests to manipulate your sloths!

#### Other tidbits
* Server functionality built using koa!  Thank you based TJ.
