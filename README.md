# Event-driven web UI with MongoDB Atlas App Services and Angular

Application demo that shows real-time information of several systems or devices on a web UI (e.g. a battery level).

## Prerequisites

1. A MongoDB Atlas account
https://account.mongodb.com/account/login

2. A key for API access as described here 
https://www.mongodb.com/docs/atlas/configure-api-access/

3. Access to your MongoDB clusters from your IP address
https://www.mongodb.com/docs/atlas/security/ip-access-list/

4. A database user
https://www.mongodb.com/docs/atlas/security-add-mongodb-users/

## Installation

Create a new Atlas cluster (alternatively you can also use an existing one)

```bash
atlas clusters create demo-cluster --provider AWS --region US_EAST_1
```

Within a few minutes your cluster is ready and can be used. You may follow the provisioning status with:
```bash
atlas clusters watch demo-cluster
```

Get the connection string
```bash
atlas clusters describe demo-cluster
```
The connection string is shown under connectionStrings > standardSrv.




