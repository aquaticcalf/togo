import app from "../firebaseconfig.js"
import { getAuth, signOut, deleteUser } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js"
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"
const auth = getAuth(app)
const database = getDatabase(app)
var userId = null
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("Logged in")
        userId = user.uid
        console.log(userId)
        // onValue(ref(database, '/book/' + userId), (snapshot) => {
        //     const userData = snapshot.val() || {}
        //     const book = userData.book || {}
        // }, {
        //     onlyOnce: true
        // });
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        var guide_userId = urlParams.get('guide')
        onValue(ref(database, '/users/' + guide_userId), (snapshot) => {
            const userData = snapshot.val() || {}
            const noname = userData.username || 'Anonymous'
            const city = userData.city || 'Anonymous'
            document.getElementById("guide-name").innerText = noname;
            document.getElementById("city").innerText = city;

        }, {
            onlyOnce: true
        });
    } else {
        window.location.href = `../login`;
    }
});

const book = document.getElementById("book")
book.addEventListener('click', () => {

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    var guide_userId = urlParams.get('guide')

    const guideObj = {
        bookedWith : userId,
        startDate : startDate,
        endDate : endDate
    };   

    const userObj = {
        bookedWith : guide_userId,
        startDate : startDate,
        endDate : endDate
    };

    console.log(guideObj)
    const guideReference = ref(database, 'book/' + guide_userId);
    console.log(reference);
    const newGuideReference = push(guideReference);
    set(newGuideReference, guideObj)
    .then(() => {
        console.log("Successfull");
    })
    .catch((error) => {
        console.error(error);
    });

    console.log(userObj)
    const userReference = ref(database, 'book/' + guide_userId);
    console.log(reference);
    const newUserReference = push(userReference);
    set(newUserReference, userObj)
    .then(() => {
        console.log("Successfull");
    })
    .catch((error) => {
        console.error(error);
    });
});
