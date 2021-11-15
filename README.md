# LaGuardia Parking Scraper

## How it Works
### Google Cloud Function
Source code is added to a cloud function. A service account is then added as a cloud function admin so that Cloud Scheduler can call the cloud function.  

![alt text](https://github.com/RGVas/lga-lot-data/blob/master/images/cloud-function.png)

### Google Cloud Scheduler
A job is created to run the google cloud function every 30 minutes.  

![alt text](https://github.com/RGVas/lga-lot-data/blob/master/images/cloud-scheduler.png)

### Google BigQuery  
A dataset is created within BigQuery to hold terminal lot capacity data. 

### Google Data Studio  
Data from BigQuery table is then displayed using Data Studio.

## Installation & Running
Clone the repository
```
https://github.com/RGVas/lga-lot-data.git
```
Install library dependences
```
npm install
```
Run index.js
```
node index.js
```
