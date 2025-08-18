
### **Table of Contents**

- [About The Project](#about-the-project)
- [Core Features (Tech Assessment 1)](#core-features-tech-assessment-1)
- [Advanced Features (Tech Assessment 2)](#advanced-features-tech-assessment-2)
- [Bonus Features (Optional)](#bonus-features-optional)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [API & Database Setup](#api-and-database-setup)
- [Usage](#usage)
- [Demo](#demo)
- [Contact & Info](#contact--info)

---

### **About The Project**

This project is a weather application created to fulfill the requirements of the AI/ML Engineer Intern technical assessment.Its primary function is to fetch real-time weather information from external APIs based on user-provided locations and allow users to manage this data.

---

### **Core Features (Tech Assessment 1)**

This section details the features implemented as per the first technical assessment.

-   **Current Weather by Location**: Users can input a location (such as Zip Code, GPS Coordinates, City, etc.) to retrieve the current weather conditions.
-   **5-Day Forecast**: The application provides a weather forecast for the next five days. To do this, leave start and end dates blank in the form. 
-   **Geolocation**: The app can automatically detect and display the weather for the user's current location.
-   **Visual Interface**: Weather information is presented clearly, utilizing icons and images for an enhanced user experience.

---

### **Advanced Features (Tech Assessment 2)**

This section outlines the advanced functionalities developed for the second technical assessment, focusing on data persistence and CRUD operations.

-   **Database Integration (CRUD)**: A PostgreSQL database (Supabase) is used for data persistence with the following capabilitiesd:
    -   **Create**: Allows users to save temperature data for a specific location and a specified date range into the database. You must enter a date range to save the data to the database.
    -   **Read**: Enables users to view any previously requested weather information stored in the database.
    -   **Update**: Provides functionality for users to update previously stored weather information.
    -   **Delete**: Allows users to remove records from the database.
-   **Input Validation**: Implements checks to validate that locations exist and that user-provided date ranges are logical.

---

### **Tech Stack**

The following technologies, frameworks, libraries, and APIs were used to build this application.

-   **Frontend**: React, JavaScript, HTML/CSS
-   **Backend**: Node.js, Express, 
-   **Database**: PostgreSQL (Supabase)
-   **APIs**: weatherapi.com

---

### **Getting Started**

Follow these steps to get the project up and running on your local machine.

### **Prerequisites**
- [Node.js](https://nodejs.org/) v20.x or higher (tested on v20.5.1)
- npm (comes bundled with Node.js)

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/xeg28/WeatherApp.git
   cd WeatherApp
2. Frontend dependencies:
   ```bash
   cd Frontend
   npm install
3. Backend dependencies: 
   ```bash
   cd Backend
   npm install

### **API and Database Setup**

1. WeatherAPI:
    - Go to [WeatherAPI.com](https://www.weatherapi.com/)
    - Sign up and get the API Key
    - In the Frontend folder, use the .env.example file as a guide to setup your .env file

2. Database:
    - Go to [supabase.com](https://supabase.com/)
    - Sign up to get your supabase url and supabase key
    - In the Frontend folder, use the .env.example file as a guide to setup your .env file
  
3. Database Schema:

    In Supabase, create a new table called **`weather_data`** with the following columns:

    | Column Name  | Type      | Notes                                    |
    |--------------|-----------|------------------------------------------|
    | id           | int8      | Primary key (auto-increment)             |
    | created_at   | timestamptz | Defaults to `now()` (record timestamp)  |
    | location     | jsonb     | Stores location details (city, region, etc.) |
    | temperature  | jsonb     | Stores daily temperature data            |
    | start_date   | date      | Start of the selected date range         |
    | end_date     | date      | End of the selected date range           |

    **Steps:**
    1. Go to the **Table Editor** in your Supabase project.  
    2. Click **New Table** → name it `weather_data`.  
    3. Add each column from the table above.  
    4. Save the table.  

4. Table Policy

    By default, Supabase tables are locked down. To let your app read and write to the `weather_data` table, you need to create a policy that allows public access.

    **Steps:**
    1. In Supabase, go to your **`weather_data`** table.  
    2. Click the **"RLS policies"** tab.  
    3. Click **"New Policy"**.  
    4. Give it a name, for example: **Allow full public access**.  
    5. Under **Action**, choose **All** (this covers SELECT, INSERT, UPDATE, DELETE).  
    6. Under **Target Role**, choose **anon** (this is the role your frontend/backend uses when connecting).  
    7. In both the **Using Expression** and **With Check Expression** fields, enter `true`.  
        - This means: “allow the action for all rows without restriction.”  
    8. Save the policy.  

    ✅ Now your frontend/backend can fully access the `weather_data` table.

--- 
### **Usage**
From the WeatherApp folder, do the following on the terminal:
1. To run the backend: 
   ```bash
   cd Backend
   node server.js
2. To run the frontend:
   ```bash
   cd Frontend
   npm start

---
### **Demo**

[Video Demo](https://youtu.be/DCvkE5owyBg)

