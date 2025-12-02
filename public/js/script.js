let authorLinks = document.querySelectorAll('a');
for (link of authorLinks) {
    link.addEventListener('click', getAuthorInfo);
}

async function getAuthorInfo() {
    var myModal = new bootstrap.Modal(document.getElementById('authorModal'));
    myModal.show();

    let url = `/api/author/${this.id}`;
    let response = await fetch(url);
    let data = await response.json();

    let dob = data[0].dob.substring(0,10);
    let dod = data[0].dod.substring(0,10);
    
    let authorInfo = document.querySelector('#authorInfo');
    authorInfo.innerHTML = `<h2> ${data[0].firstName} ${data[0].lastName} </h2>
                            <img src='${data[0].portrait}' alt='Portrait of ${data[0].firstName} ${data[0].lastName}' width='200'><br>
                            <strong>Born:</strong> ${dob} <br>
                            <strong>Died:</strong> ${dod} <br>
                            <strong>Country:</strong> ${data[0].country} <br>
                            <strong>Profession:</strong> ${data[0].profession} <br>
                            <strong>Sex:</strong> ${data[0].sex} <br>
                            <strong>Bio:</strong> ${data[0].biography} <br>
                            `;
}