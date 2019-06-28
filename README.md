# VOBI
mongo db

user: vaxo159@gmail.com
pw: mongopw123@

run:

cd server
node app

cd client
npm start

//*******************************************************************
Instructions and current bugs

NavBar is cnahging according to login status
Guest can:
    see all posts and comments on home page,
    search through posts,
        searching works by [author name(exact match except case), 
                            author lastname(exact match except case), 
                            post title(title includes searched text)]
    register

Registered user can:
    all the above mentioned plus
    comment on posts #FIX comments only appear after reloading, need to fix query refetch
    see profile and own posts
        enter profile by clicking on user name in navbar
        add psot
        delete post
        #FIX edit not functioninc currently

main bugs:
    1) after registration before login please refresh page there is a problem when 
    entering to profile page first time right after registration reason not know, on second enter it works 
    2) authentication is based on redux store, after page refrehes data is lost and need to sing in again
    3) updates to posts need to be sinchronized when moving between components

probably there are more bugs at the moment please inform me if you find another bug.