/*Object Literal -> Revealing Modular Pattern*/
const valuesForm = (function() {

    /*This will create a PRIVATE Variable inside the Object, only possible to access in this scope*/
    const func = 0;

    const getValues = {
        title: document.getElementById("title").value,
        body: document.getElementById("body").value
    };

    /*This can be accessed outside of this scope*/
    return {
        getValues: getValues
    };

});

/*Modulo jsonAPI*/
const jsonAPI = (function() {

    const postToApi = (e) => {

        e.preventDefault();

        const { title, body } = valuesForm().getValues;

        fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "post",
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ title: title, body: body })
            })
            .then((result) => result.json())
            .then((data) => console.log(data))
    }

    const getFromAPI = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((result) => result.json())
            .then((data) => {

                let constructString = '<h4 class="py-2 text-primary">Api Users<h4>';

                data.forEach((post) => {
                    const { name, email, username } = post;

                    constructString += `
                       <div id="user${username}" class="py-2">
                            <span class="small font-weight-bold">${name}</span>
                            <span class="small">${email}</small>
                       </div>
                    `;
                });

                document.getElementById("postsList").innerHTML = constructString;

            })
            .catch((error) => console.log(error));
    }

    return { postToApi: postToApi, getFromAPI: getFromAPI };
});

document.getElementById("submitButton").addEventListener("click", jsonAPI().postToApi);

document.getElementById("getJsonApiPosts").addEventListener("click", jsonAPI().getFromAPI);