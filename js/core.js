/*Object Literal -> Revealing Modular Pattern*/
const valuesForm = () => {

    /*This will create a PRIVATE Variable inside the Object, only possible to access in this scope*/
    const func = 0;

    const getValues = {
        title: document.querySelector("#title").value,
        body: document.querySelector("#body").value
    };

    /*This can be accessed outside of this scope*/
    return {
        getValues: getValues
    };

};

/*Modulo jsonAPI*/
const jsonAPI = () => {
    const url = "https://jsonplaceholder.typicode.com";
    const postToApi = async () => {
        const {
            title,
            body
        } = valuesForm().getValues;
        const response = await fetch(`${url}/posts`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                title: title,
                body: body
            })
        });
        const data = await response.json();
        document.querySelector("#responseList").innerHTML += `<p>${JSON.stringify(data)}</p>`;
    }

    const getFromAPI = async () => {
        const response = await fetch(`${url}/users`);
        const data = await response.json();

        let constructString = '<h4 class="py-2 text-primary">Api Users<h4>';

        data.forEach((post) => {
            const {
                name,
                email,
                username
            } = post;

            constructString += `
                           <div id="user${username}" class="py-2">
                                <span class="small font-weight-bold">${name}</span>
                                <span class="small">${email}</small>
                           </div>
                        `;
        });
        document.querySelector("#postsList").innerHTML = constructString;
    }

    return {
        postToApi: postToApi,
        getFromAPI: getFromAPI
    };
}

document.querySelector("#submitButton").addEventListener("click", jsonAPI().postToApi);
document.querySelector("#getJsonApiPosts").addEventListener("click", jsonAPI().getFromAPI);