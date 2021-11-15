# LaGuardia Parking Scraper

### Data Studio
Please find link to data visualization below. Data is currently being tracked every 30 minutes.
https://datastudio.google.com/reporting/cb41efed-ecb8-4781-a50e-62f1fcc18002

### Notice
**This program can only be used if the computer is authenticated to a google cloud project - the code is designed to be ran via a cloud function.** 

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
## How it Works
### Steps
1. A job is created via Google Cloud Scheduler to call the cloud function every 30 minutes
2. The cloud function then scrapes lot data from LGA website and imports it into BigQuery
3. The BigQuery dataset is then loaded into Data Studio for data visualization - graphs are updated every 15 minutes

### Google Cloud Function
Source code is added to a cloud function. A service account is then added as a cloud function admin so that Cloud Scheduler can call the cloud function.  

![alt text](https://github.com/RGVas/lga-lot-data/blob/master/images/cloud-function.png)

### Google Cloud Scheduler
A job is created to run the google cloud function every 30 minutes.  

![alt text](https://github.com/RGVas/lga-lot-data/blob/master/images/cloud-scheduler.png)

### Google BigQuery  
A dataset is created within BigQuery to hold terminal lot capacity data. 
![alt text](https://github.com/RGVas/lga-lot-data/blob/master/images/big-query.PNG)

### Google Data Studio  
Data from BigQuery table is then displayed using Data Studio.
![alt text](https://github.com/RGVas/lga-lot-data/blob/master/images/data-studio.PNG)
