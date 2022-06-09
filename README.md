# Event-driven web UI with MongoDB Atlas App Services and Angular

Application demo that shows real-time information of several systems or devices on a web UI (e.g. a battery level).

## Prerequisites

1. A MongoDB Atlas account:
https://account.mongodb.com/account/login

2. A key for API access as described here:
https://www.mongodb.com/docs/atlas/configure-api-access/

3. Access to your MongoDB clusters from your IP address:
https://www.mongodb.com/docs/atlas/security/ip-access-list/

4. A database user:
https://www.mongodb.com/docs/atlas/security-add-mongodb-users/

5. Install the Atlas CLI:
https://www.mongodb.com/docs/atlas/cli/stable/install-atlas-cli/

6. Install the Atlas App Services / Realm CLI:
https://www.mongodb.com/docs/atlas/app-services/cli/

Alternatively, instead of the CLI, also the Atlas UI or API can be used for installation.

## Installation

### MongoDB Atlas Setup

Login to Atlas
```bash
atlas auth login
```

Create a new Atlas cluster (alternatively you can also use an existing one)

```bash
atlas clusters create demo-cluster --provider AWS --region US_EAST_1
```

Within a few minutes your cluster is ready and can be used. You may follow the provisioning status with:
```bash
atlas clusters watch demo-cluster
```

Get the connection string (shown under connectionStrings > standardSrv)
```bash
atlas clusters describe demo-cluster
```

Connect to your cluster
```bash
mongosh "mongodb+srv://<YOUR_CONNECTION_STRING>/myFirstDatabase" --apiVersion 1 --username <YOUR_USERNAME>
```

Add a few sample documents that contain device information
```bash
db.devices.insertOne({"name":"Device 1","battery_level":25});
db.devices.insertOne({"name":"Device 2","battery_level":50});
db.devices.insertOne({"name":"Device 3","battery_level":85});
```

### Atlas App Services Setup

```bash
git clone https://github.com/mjwo321/event-driven-web-ui.git
cd event-driven-web-ui
```

Login to Atlas App Services / Realm
```bash
realm-cli login --api-key YOUR_ATLAS_PUBLIC_KEY --private-api-key YOUR_ATLAS_PRIVATE_KEY
```

Push the app to Atlas App Services (since the github file does not contain an app_id, it will create a new app in your project). Copy and save the app_id (atlas-device-demo-*****).
```bash
cd atlas-device-demo
realm-cli push
```

Create a new user inside the app (API Key authentication), use your specific app_id. Copy and save the key. We need the app_id and key in the Angular app for authentication to Atlas App Services.
```bash
realm-cli users create -a atlas-device-demo-***** --type api-key --name demouser
```











