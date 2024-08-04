## Inspiration
As university students, we often struggled to manage our own finances. A lot of money was spent without even realizing it, and small costs started to add up quickly. Recognizing this challenge, we thought of a solution that could help students like us take control of their spending. Presenting WealthHack — an intelligent tool to track expenses and manage budgets effortlessly.

## What it does
WealthHack allows users to input their daily expenses, set a budget, and track their spending against this budget. The app provides insights into spending habits, helping users stay within their financial limits and make informed decisions. It also offers personalized financial tips and reminders to help users stay on track.

## How we built it
We built WealthHack using a combination of front-end and back-end technologies. The front-end is powered by React, providing a seamless and interactive user interface. The back-end is developed using Flask, which handles data processing and storage. We utilized local storage for quick development during the hackathon, ensuring user data is stored securely on their device.

## Challenges we ran into
Dependencies: We often lost track of the dependencies required for the FE and BE servers. This led to us keeping our Discord pins and ReadMe.md up-to-date with the latest dependencies we use in our projects.
HTTP Requests: While Axios is a powerful tool for GET and POST requests, we ran into request errors with OpenAI API, and our backend SQLite DB. With proper CORS configuration, we were able to get past this.
State Changes: We have multiple components passing and relying on data across our application. There was unexpected loss in data when being passed around with event handlers and hooks. Careful planning and modularization of components helped to simplify this process.

## Accomplishments that we're proud of
We’re proud of creating a functional and user-friendly budget tracker within a short period of time. The financial tips adds an extra layer of usability that enhances the user experience. We're also proud of how the app can serve as a practical tool for students and new migrants in managing their finances.


## What we learned
- Documentation and initial planning is crucial for not losing track in the middle of the project. Once we sat down and designed a user flow for our application, it became easy to divide up tasks.
- Prompt Engineering is crucial to narrow down the result you are looking for. We learnt a lot about crafting an initial prompt for our chatbot.

## What's next for WealthHack
Chrome Extension: Create a browser extension that assists users with online shopping by providing budget-friendly recommendations and financial advice. The extension will alert users if a purchase is within their budget or if it exceeds their financial limits.
.csv Upload Support: Ability to upload existing excel sheets and formatted bank statements for parsing and input into the database. This will allow users to quickly seek financial support, without meticulous data entry.
