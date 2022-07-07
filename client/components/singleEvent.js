//PURPOSE OF PAGE:

// The purpose of this page is to create a component that can be rendered within our User's profile page.

// Functionality:
// 1. Submit a review to be populated in the UsersEvents Table.
// 2. Upon submission of review, the Watson sentimentAnalysis API POST route will be called with the review text (string)
// 3. The API will return a "score" & "label" to be stored in the UsersEvents model as "sentimentScore" & "sentimentLabel"

//Further build out:
// a. Randomizer will pull sentimentScore & sentimentLabel weights to influence which categories are pushed to the User
