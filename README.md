# List of Users
Was created one-page browser application, creating and editing user list when assistance provided API. 
- [ADD DEMO LINK HERE]()

## Description
The app has three pages:
1. User list page.
2. User page
3. Page with the user’s creation / editing form.
The user list page displays:
* List of basic user information: full name, first name, last name, date of birth, sex.
Also, the button "Delete"(iconbasket) to remove the user from the list. When you click on the iconface (full name) then user page appears.
* When you click on the button "ADD USER" you move to the user add page.
* Full user information is displayed on the user’s page:
  1. first_name.
  2. last_name.
  3. birth_date.
  4. gender.
  5. job.
  6. biography.
  7. is_active.
  8. Click to go to edit user information(iconpen)
  (on the user creation / editing page).
  9. User delete button.(iconbasket)
* The user’s form is displayed on the Create / Edit page, where:
  1. Firs Name - input with a maximum allowed length of 256 characters.
  2. Last name - input with a maximum allowed length of 256 characters.
  3. Birth Date - datapicker with date format YYYY-MM-DD.
  4. Gender - select with options to choose "male", "female".
  5. Job - input with maximum permissible length 256 characters.
  6. Biography - textarea with maximum permissible length 1024 symbols.
  7. The checkbox indicates if the user is active.

* The form validation before sending. 

## Local development
* VS Code
* ESlint

### Dependencies
- redux
- react-router-dom
- typescript
- react-dom
- date-io
- JS
- HTML
- SASS
- AsyncThunk
- redux-toolkit
- styled-components
- jest
- material ui  
- Node v14.18.2 and higher
- NPM v6.14.12 and higher

### Installing
* Fork and clone this repository
* Run `npm install` in your terminal
* Run `npm start`
