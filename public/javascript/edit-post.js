async function editPost(event) {
    event.preventDefault();

    const title = document.querySelector('#postTitleEdit').value.trim();
    const body = document.querySelector('#postBodyEdit').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            body
        }),
        headers: { 'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard/')
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#editPost').addEventListener('click', editPost)