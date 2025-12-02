let authorLinks = document.querySelectorAll('a');
for (link of authorLinks) {
    link.addEventListener('click', getAuthorInfo);
}

async function getAuthorInfo() {
    let url = `/api/author/${this.id}`;
    let response = await fetch(url);
    let data = await response.json();
    
    let authorInfo = document.querySelector('#authorInfo');
    authorInfo.innerHTML = `<h2> ${data[0].firstName} ${data[0].lastName} </h2>
                            <img src='${data[0].portrait}' alt='Portrait of ${data[0].firstName} ${data[0].lastName}' width='200'><br>
                            <strong>Bio:</strong> ${data[0].biography} <br>
                            <strong>Born:</strong> ${data[0].dob} <br>
                            <strong>Died:</strong> ${data[0].dod} <br>
                            `;
}