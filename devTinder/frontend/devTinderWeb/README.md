# DevTinder

- Create a Vite + React application
- Remove unecessary code and create a Namaste world app
- Install Tailwind CSS
- Add Navbar component to App.jsx
- Create a Navbar.jsx seperate component file
- Install react router dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a Footer
- Create a Login page
- Install axios
- CORS - install cors in backend => add middleware to with configuration: orgin, credentials: true
- Whenever you're making API call so pass axios => {withCredentials: true}
- install react-redux + @reduxjs/toolkit
- configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- Navbar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout feature
- Get the feed and add the feed in the store
- Build the user card on feed
- Edit profile picture
- Show Toast message on save of profile
- New page - see all my connections
- New page - see all my connections Requests
- Feature - Accept/Reject Connection Request


body
    Navbar
    Route=/ => feed
    Route=/login => login
    Route=/connections => connections
    Route=/profile => profiles