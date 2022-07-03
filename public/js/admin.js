function accept(value) {
    sendAjax('http://localhost:3005/admin/accept', {'id': value})
}

function reject(value){
    sendAjax('http://localhost:3005/admin/reject', {'id': value})
}

function sendAjax(url, data) {
    data = JSON.stringify(data)
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(data)

    xhr.addEventListener('load', () => {
        window.location.reload()
    })
}
