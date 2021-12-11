
async function newPost(event) {
    event.preventDefault();

const title = document.querySelector('#postTitle').value;
const post_body = document.querySelector('#postBody').value;


    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_body,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
}

document.querySelector("#addPostButton").addEventListener("click", newPost);