Are you a university student just getting started with the real world? Have you ever checked your expenses in the past month and realized you've spent way too much money? Have you ever wanted a way to track your expenses, but desired an assistant that understands your spending habits and helps you work towards saving more money?

### WealthHack is the SaaS for you!
#### Finance Management, Made Simple.

WealthHack is the finance manager with a personal AI assistant that will help you:

- Form better spending habits
- Set your budget
- Answer any financial questions you may have
  
Start managing your finances smarter today with WealthHack!


## How we built it
Our tech stack includes React for the frontend, Node and Flask for the backend, and SQLite for efficient data management.

Flask is used to create a RESTful API for managing expenses, using SQLite for efficient data storage. Looking towards the future this is a lightweight scalable solution that’s ideal for managing financial data.

The project also integrates OpenAI’s 3.5-turbo model to provide personalized financial advice and tailored reccomendations based on user inputs and financial goals.

## Challenges we ran into
**Dependencies:** We often lost track of the dependencies required for the FE and BE servers. This led to us keeping our Discord pins and ReadMe.md up-to-date with the latest dependencies we use in our projects.

**HTTP Requests:** While Axios is a powerful tool for GET and POST requests, we ran into request errors with OpenAI API, and our backend SQLite DB. With proper CORS configuration, we were able to get past this.

**State Changes:** We have multiple components passing and relying on data across our application. There was unexpected loss in data when being passed around with event handlers and hooks. Careful planning and modularization of components helped to simplify this process.


## What we learned
- Documentation and initial planning is crucial for not losing track in the middle of the project. Once we sat down and designed a user flow for our application, it became easy to divide up tasks.
- Prompt Engineering is crucial to narrow down the result you are looking for. We learnt a lot about crafting an initial prompt for our chatbot.

## What's next for WealthHack
**Chrome Extension:** Create a browser extension that assists users with online shopping by providing budget-friendly recommendations and financial advice. The extension will alert users if a purchase is within their budget or if it exceeds their financial limits.

**CSV Upload Support:** Ability to upload existing excel sheets and formatted bank statements for parsing and input into the database. This will allow users to quickly seek financial support, without meticulous data entry.
